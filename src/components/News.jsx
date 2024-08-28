
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

export default function News(props) {
  

  const [news, setNews] = useState([])
  const getNews = async () => {
    axios.get(` https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=e380c8192e2546e6a6ad7d6a9b0c3bac`).then((r) => setNews(r.data.articles));
  };
  // https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=e380c8192e2546e6a6ad7d6a9b0c3bac

  useEffect(() => {
    getNews()
  }, [props.category])


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
