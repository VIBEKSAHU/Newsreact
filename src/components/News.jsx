// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// export default function News({category}) {
//   const [news, setNews] = useState([]);
//   const [error, setError] = useState(null);

//   const getNews = async () => {
//     try {
//       const response = await axios.get(`/api/fetchNews?category=${category}`);
//       if (response.data.news) {
//         setNews(response.data.news);
//       } else {
//         console.error("API returned error:", response.data);
//         setError(response.data.error || "Failed to fetch news.");
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       setError(error.message || "Error fetching news.");
//     }
//   };

//   useEffect(() => {
//     setNews([]); // Clear previous news
//     getNews();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category]);

//   return (
//     <div className="content">
//       {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}
//       {news && news.length > 0 ? (
//         news.map((e, index) => (
//           <div className="main" key={index}>
//             {/* <img src={e.image} alt={e.title} /> */}
//             {e.image ? (
//               <img src={e.image} alt={e.title} />
//             ) : (
//               <img src="/placeholder.jpg" alt="No preview available" />
//             )}

//             <h6 className='a'>{e.title}</h6>
//             <div className="a">
//               <p className='desc'>{e.description}</p>
//             </div>
//             <button className="btn">
//               <a href={e.url} target="_blank" rel="noopener noreferrer">View more</a>
//             </button>
//           </div>
//         ))
//       ) : !error && <p style={{ textAlign: 'center' }}>Loading news...</p>}
//     </div>
//   );
// }





import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function News({ category }) {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch news from the API based on the selected category
   * Handles loading states and error management
   */
  const getNews = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      
      // Make API request to Netlify function
      const response = await axios.get(`/.netlify/functions/fetchNews?category=${category}`);
      
      // Check if API returned news data
      if (response.data && response.data.news) {
        setNews(response.data.news);
      } else {
        console.error("API returned error:", response.data);
        setError(response.data.error || "Failed to fetch news. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      
      // Handle different types of errors
      if (error.code === 'NETWORK_ERROR') {
        setError("Network error. Please check your connection and try again.");
      } else if (error.response?.status === 504) {
        setError("Request timeout. Please try again in a moment.");
      } else if (error.response?.status === 429) {
        setError("Too many requests. Please wait a moment before trying again.");
      } else {
        setError(error.message || "Error fetching news. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle image loading errors by switching to placeholder
   * @param {Event} event - The error event from the img element
   */
  const handleImageError = (event) => {
    event.target.style.display = 'none';
    // Show fallback div if it exists
    const fallbackDiv = event.target.nextElementSibling;
    if (fallbackDiv && fallbackDiv.classList.contains('placeholder-fallback')) {
      fallbackDiv.style.display = 'flex';
    }
  };

  /**
   * Effect to fetch news when category changes
   * Clears previous news and fetches new data
   */
  useEffect(() => {
    if (category) {
      setNews([]); // Clear previous news
      getNews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Loading state with spinner
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading {category} news...</p>
      </div>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="error-container">
        <h3 className="error-title">Unable to Load News</h3>
        <p>{error}</p>
        <button 
          className="retry-btn"
          onClick={() => getNews()}
          aria-label="Retry loading news"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No news available state
  if (!news || news.length === 0) {
    return (
      <div className="error-container">
        <h3 className="error-title">No News Available</h3>
        <p>No articles found for the {category} category.</p>
        <button 
          className="retry-btn"
          onClick={() => getNews()}
          aria-label="Refresh news"
        >
          Refresh
        </button>
      </div>
    );
  }

  // Main news grid content
  return (
    <div className="content">
      {news.map((article, index) => (
        <article className="main" key={index}>
          {/* Image Section with Fallback */}
          <div className="image-container">
            {article.image ? (
              <>
                <img 
                  src={article.image} 
                  alt={article.title || 'News article image'}
                  onError={handleImageError}
                  loading="lazy" // Lazy load for performance
                />
                <div className="placeholder-fallback" style={{ display: 'none' }}>
                  <div className="placeholder-icon">📰</div>
                  <span>No Image Available</span>
                </div>
              </>
            ) : (
              <div className="placeholder-fallback" style={{ display: 'flex' }}>
                <div className="placeholder-icon">📰</div>
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {/* Article Title */}
          <h6 className="a" title={article.title}>
            {article.title || "No Title Available"}
          </h6>
          
          {/* Article Description */}
          <div className="a">
            <p className="desc" title={article.description}>
              {article.description || "No description available for this article."}
            </p>
          </div>
          
          {/* Read More Button */}
          <button className="btn" type="button">
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(event) => {
                // Prevent broken links
                if (!article.url) {
                  event.preventDefault();
                  alert('No link available for this article');
                }
              }}
              aria-label={`Read more about ${article.title}`}
            >
              View more →
            </a>
          </button>

          {/* Optional: Article metadata (can be commented out if not needed) */}
          {/*
          <div className="article-meta">
            {article.author && <span className="author">By {article.author}</span>}
            {article.published && (
              <span className="publish-date">
                {new Date(article.published).toLocaleDateString()}
              </span>
            )}
            {article.category && <span className="category">{article.category}</span>}
          </div>
          */}
        </article>
      ))}
      
      {/* Load more trigger for infinite scroll (commented out - can be implemented later) */}
      {/*
      <div 
        id="load-more-trigger" 
        style={{ height: '10px', visibility: 'hidden' }}
        aria-hidden="true"
      ></div>
      */}
    </div>
  );
}