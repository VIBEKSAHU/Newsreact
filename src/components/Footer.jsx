import React from 'react'
import { FaFacebook,FaYoutube,FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <>

      <footer className='last'>
        <div className="contact">
          <h1>contact us</h1></div>
        <div className="address">
          <p >Royal aparments-floor no 08,near new toll plaza</p>
          <p className='add'>Jamshedpur-831001  Telephone :+91-587423699 Jharkhand</p>
        </div>
        <div className="social">
          <a href="https://www.instagram.com/vibeksahu_/"><FaInstagram color='dark-pink'/></a>
          <a href="https://www.instagram.com/vibeksahu_/"><FaFacebook color='blue'/></a>
          <a href="https://www.youtube.com/watch?v=ElZfdU54Cp8"><FaYoutube color='red'/></a>
        </div>

      </footer>

    </>
  )
}
