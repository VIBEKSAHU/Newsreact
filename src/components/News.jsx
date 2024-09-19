
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

export default function News(props) {
  
  const apiKey = process.env.REACT_APP_SECRET_CODE;
 
  
  const [news, setNews] = useState([])
  const getNews = async () => {
    axios.get(` https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`).then((r) => setNews(r.data.articles));
  };


  useEffect(() => {
    getNews()
  }, )
 

  return (
    <>

      <div className="content">
        {
          news.map((e) => {
            return <>
              <div className="main">
                <img src={e.urlToImage} alt="" />
                <h6 className='a'>{e.title}</h6>

                <div className="a">
                  <p className='desc' >{e.description}</p></div>
                <button className="btn"><a href={e.url}>view more</a></button>

              </div>
            </>
          })
        }
      </div>



    </>
  )
}
