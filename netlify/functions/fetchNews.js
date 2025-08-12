// 
// In netlify/functions/fetchNews.js - use your ORIGINAL working code:
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const apiKey = process.env.REACT_APP_SECRET_CODE;
        const { category = 'general' } = event.queryStringParameters;
        const url = `https://api.currentsapi.services/v1/latest-news?category=${category}&apiKey=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'error') {
            console.error("CurrentsAPI error:", data);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: data.message || "Error fetching news." }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error("Error in fetchNews function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
