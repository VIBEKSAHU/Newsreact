import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const getNews = async () => {
    try {
      const response = await axios.get(`/api/fetchNews`);
      if (response.data.news) {
        setNews(response.data.news);
      } else {
        console.error("API returned error:", response.data);
        setError(response.data.error || "Failed to fetch news.");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError(error.message || "Error fetching news.");
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className="content">
      {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}
      {news && news.length > 0 ? (
        news.map((e, index) => (
          <div className="main" key={index}>
            <img src={e.image} alt={e.title} />
            <h6 className='a'>{e.title}</h6>
            <div className="a">
              <p className='desc'>{e.description}</p>
            </div>
            <button className="btn">
              <a href={e.url} target="_blank" rel="noopener noreferrer">View more</a>
            </button>
          </div>
        ))
      ) : !error && <p style={{ textAlign: 'center' }}>Loading news...</p>}
    </div>
  );
}
