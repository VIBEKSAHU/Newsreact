const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = process.env.REACT_APP_SECRET_CODE;
  console.log(apiKey);
  const { country = 'us', category = 'general' } = event.queryStringParameters;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
