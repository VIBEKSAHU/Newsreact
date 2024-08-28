import "./App.css";
// import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect} from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import About from "./components/About";

function App() {

  const [category, setCategory] = useState("general");

//   const [weather, setWeather] = useState()
//   const getWeather = async () => {
//     axios.get("http://api.weatherapi.com/v1/forecast.json?key=09a0526c06174347a4f125728222912&q=jamshedpur&days=1&aqi=no&alerts=no").then((r) => setWeather(r.data.location));
//   };

//   console.log(weather)
// useEffect(() => {
//   getWeather()
// }, [])


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
