// const fetch = require('node-fetch');

// exports.handler = async function(event, context) {
//   try {
//     const apiKey = process.env.REACT_APP_SECRET_CODE;
//     // const { country = 'IN', category = 'general' } = event.queryStringParameters;
//    const { category = 'general' } = event.queryStringParameters;
//     const url = `https://api.currentsapi.services/v1/latest-news?category=${category}&apiKey=${apiKey}`

//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.status === 'error') {
//       console.error("NewsAPI error:", data);
//       return {
//         statusCode: 500,
//         body: JSON.stringify({ error: data.message || "Error fetching news." }),
//       };
//     }

//     return {
//       statusCode: 200,
//       body: JSON.stringify(data),
//     };
//   } catch (error) {
//     console.error("Error in fetchNews function:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: error.message }),
//     };
//   }
// };


const fetch = require('node-fetch');

// Cache to store API responses and reduce external API calls
let cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Retry mechanism for failed requests
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
    for (let i = 0; i <= maxRetries; i++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
            
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    'User-Agent': 'NewsReact-App/1.0',
                    'Accept': 'application/json',
                    ...options.headers
                }
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
        } catch (error) {
            console.warn(`Attempt ${i + 1} failed:`, error.message);
            
            if (i === maxRetries) {
                throw error;
            }
            
            // Exponential backoff: wait 1s, 2s, 4s between retries
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
    }
}

// Function to get cached data or fetch new data
async function getCachedOrFetch(cacheKey, fetchFunction) {
    const now = Date.now();
    const cachedData = cache.get(cacheKey);
    
    // Return cached data if it's still valid
    if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
        console.log('Returning cached data for:', cacheKey);
        return cachedData.data;
    }
    
    // Fetch new data
    try {
        const data = await fetchFunction();
        cache.set(cacheKey, {
            data: data,
            timestamp: now
        });
        
        // Clean up old cache entries (keep max 20 entries)
        if (cache.size > 20) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }
        
        return data;
    } catch (error) {
        // If we have stale cached data, return it as fallback
        if (cachedData) {
            console.warn('Using stale cached data due to fetch error:', error.message);
            return cachedData.data;
        }
        throw error;
    }
}

exports.handler = async function(event, context) {
    // Set CORS headers for all responses
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
    };
    
    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'CORS preflight successful' })
        };
    }
    
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ 
                error: 'Method not allowed',
                message: 'Only GET requests are supported'
            })
        };
    }
    
    try {
        const apiKey = process.env.REACT_APP_SECRET_CODE;
        
        if (!apiKey) {
            throw new Error('API key not configured');
        }
        
        const { category = 'general' } = event.queryStringParameters || {};
        
        // Validate category
        const validCategories = ['general', 'sports', 'entertainment', 'technology', 'business', 'health', 'science'];
        const sanitizedCategory = validCategories.includes(category) ? category : 'general';
        
        // Create cache key
        const cacheKey = `news-${sanitizedCategory}`;
        
        // Fetch news with caching and retry logic
        const data = await getCachedOrFetch(cacheKey, async () => {
            const url = `https://api.currentsapi.services/v1/latest-news?category=${sanitizedCategory}&apiKey=${apiKey}&language=en&limit=20`;
            
            console.log('Fetching fresh data from:', url.replace(apiKey, '***'));
            
            const response = await fetchWithRetry(url);
            const data = await response.json();
            
            // Handle API errors
            if (data.status === 'error') {
                throw new Error(`CurrentsAPI error: ${data.message || 'Unknown error'}`);
            }
            
            // Validate response structure
            if (!data.news || !Array.isArray(data.news)) {
                throw new Error('Invalid response structure from CurrentsAPI');
            }
            
            // Process and clean the news data
            const processedNews = data.news
                .filter(article => article && article.title && article.url) // Filter out invalid articles
                .slice(0, 16) // Limit to 16 articles to reduce response size
                .map(article => ({
                    title: article.title?.trim() || 'Untitled',
                    description: article.description?.trim() || 'No description available',
                    url: article.url,
                    image: article.image === 'None' || !article.image ? null : article.image,
                    published: article.published || new Date().toISOString(),
                    author: article.author || 'Unknown',
                    category: sanitizedCategory
                }));
            
            return {
                news: processedNews,
                total: processedNews.length,
                category: sanitizedCategory,
                cached: false,
                timestamp: new Date().toISOString()
            };
        });
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                ...data,
                cached: data.cached !== false // Mark as cached if it came from cache
            })
        };
        
    } catch (error) {
        console.error('Error in fetchNews function:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        
        // Determine appropriate error status code
        let statusCode = 500;
        let errorMessage = 'Internal server error';
        
        if (error.message.includes('API key')) {
            statusCode = 500; // Don't expose configuration errors to client
            errorMessage = 'Service configuration error';
        } else if (error.message.includes('timeout') || error.message.includes('ECONNRESET')) {
            statusCode = 504;
            errorMessage = 'Service temporarily unavailable';
        } else if (error.message.includes('CurrentsAPI error')) {
            statusCode = 502;
            errorMessage = 'News service error';
        }
        
        return {
            statusCode,
            headers,
            body: JSON.stringify({
                success: false,
                error: errorMessage,
                message: 'Unable to fetch news at this time. Please try again later.',
                timestamp: new Date().toISOString(),
                // In development, include more details
                ...(process.env.NODE_ENV === 'development' && {
                    details: error.message
                })
            })
        };
    }
};
