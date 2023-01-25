import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

function App() {

  const [category, setCategory] = useState("general");

  // const [weather, setWeather] = useState("")
  // const getWeather = async () => {
  //   axios.get("http://api.weatherapi.com/v1/forecast.json?key=09a0526c06174347a4f125728222912&q=jamshedpur&days=1&aqi=no&alerts=no").then((r) => setWeather(r.location));
  // };

  // console.log(weather)


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
          <Route path="./contact" element={<Contact/>}/>
        </Routes>
      </Router>
    </>
  );
}







export default App;
