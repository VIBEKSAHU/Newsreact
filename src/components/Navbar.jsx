

import React from "react";
import { Link } from "react-router-dom";
export default function Navbar(props) {
  



  return (
    <>
      <nav className="mainbar">
        <div className="first">
         <Link to={"/Contact"}>contact</Link>
         <Link to={"/About"}>AboutUs</Link>
       </div>
        <div className="logo">
          <h2>
            <span>S</span>aandar
            <span>N</span>ews
          </h2>
        </div>
        <div className="menu">
          <ul>
            <li>
              <button
                className="bt"
                onClick={() =>{
                  props.setCategory("general");
                }}
              >
                General
              </button>
            </li>
            <li>
              <button
                className="bt"
                onClick={() => {
                  props.setCategory("sports");
                }}
              >
                sports
              </button>
            </li>
            <li>
              <button
                className="bt"
                onClick={() => {
                  props.setCategory("entertainment");
                }}
              >
                entertainment
              </button>
            </li>
            <li>
              <button
                className="bt"
                onClick={() => {
                  props.setCategory("technology");
                }}
              >
                technology
              </button>
            </li>
            <li>
              <button
                className="bt"
                onClick={() => {
                  props.setCategory("business");
                }}
              >
                business
              </button>
            </li>
            <li>
              <button
                className="bt"
                onClick={() => {
                  props.setCategory("health");
                }}
              >
                health
              </button>
            </li>
            <li>
              <button
                className="bt"
                onClick={() => {
                  props.setCategory("science");
                }}
              >
                science
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
