import "./App.css";
// import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState} from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {


  const [category, setCategory] = useState("general");


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <>
              <Navbar setCategory={setCategory} />
              <News category={category} />  
              <Footer />
            </>}
          />
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Router>
    </>
  );
}







export default App;
