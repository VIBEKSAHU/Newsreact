

import React from "react";

export default function Navbar(props) {



  return (
    <>
    <div>contact</div>
      <nav className="mainbar">
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
                onClick={() => {
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
