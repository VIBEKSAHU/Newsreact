const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const apiKey = process.env.REACT_APP_SECRET_CODE;
    // const { country = 'IN', category = 'general' } = event.queryStringParameters;
    // const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    const url = `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}`

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'error') {
      console.error("NewsAPI error:", data);
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
