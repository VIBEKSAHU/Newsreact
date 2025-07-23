const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  console.log("Function triggered");
  try {
    const apiKey = process.env.REACT_APP_SECRET_CODE;
    console.log("API Key:", apiKey);

    const { country = 'us', category = 'general' } = event.queryStringParameters;
    console.log("Query params:", { country, category });

    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    console.log("Fetching URL:", url);

    const response = await fetch(url);
    const data = await response.json();
    console.log("Data fetched:", data);

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
