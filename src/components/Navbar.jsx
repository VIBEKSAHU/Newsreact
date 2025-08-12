

// import React from "react";
// import { Link } from "react-router-dom";
// export default function Navbar(props) {
  



//   return (
//     <>
//       <nav className="mainbar">
//         <div className="first">
//          <Link to={"/Contact"}>contact</Link>
//          <Link to={"/About"}>AboutUs</Link>
//        </div>
//         <div className="logo">
//           <h2>
//             <span>S</span>aandar
//             <span>N</span>ews
//           </h2>
//         </div>
//         <div className="menu">
//           <ul>
//             <li>
//               <button
//                 className="bt"
//                 onClick={() =>{
//                   props.setCategory("general");
//                 }}
//               >
//                 General
//               </button>
//             </li>
//             <li>
//               <button
//                 className="bt"
//                 onClick={() => {
//                   props.setCategory("sports");
//                 }}
//               >
//                 sports
//               </button>
//             </li>
//             <li>
//               <button
//                 className="bt"
//                 onClick={() => {
//                   props.setCategory("entertainment");
//                 }}
//               >
//                 entertainment
//               </button>
//             </li>
//             <li>
//               <button
//                 className="bt"
//                 onClick={() => {
//                   props.setCategory("technology");
//                 }}
//               >
//                 technology
//               </button>
//             </li>
//             <li>
//               <button
//                 className="bt"
//                 onClick={() => {
//                   props.setCategory("business");
//                 }}
//               >
//                 business
//               </button>
//             </li>
//             <li>
//               <button
//                 className="bt"
//                 onClick={() => {
//                   props.setCategory("health");
//                 }}
//               >
//                 health
//               </button>
//             </li>
//             <li>
//               <button
//                 className="bt"
//                 onClick={() => {
//                   props.setCategory("science");
//                 }}
//               >
//                 science
//               </button>
//             </li>
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ setCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("general");

  const categories = [
    "general",
    "sports",
    "entertainment",
    "technology",
    "business",
    "health",
    "science"
  ];

  const handleCategoryClick = (category) => {
    setCategory(category);
    setActiveCategory(category);
    setIsOpen(false); // close menu on mobile
  };

  return (
    <nav className="mainbar">
      {/* Left Links */}
      {/* <div className="first">
        <Link to="/Contact">Contact</Link>
        <Link to="/About">About Us</Link>
      </div> */}

      {/* Logo */}
      <div className="logo">
        <h2>
          <span>S</span>aandar
          <span>N</span>ews
        </h2>
      </div>

      {/* Hamburger Button */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Menu */}
      <ul className={`menu ${isOpen ? "active" : ""}`}>
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`bt ${activeCategory === cat ? "active-cat" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
