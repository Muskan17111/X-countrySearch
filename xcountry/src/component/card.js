import React, { useState, useEffect } from "react";
import axios from "axios";
import "./card.css";

function Card() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, countries]);

  if (error) {
    return <div>Error loading countries</div>;
  }

  const RenderCard = ({ country }) => {
    return (
      <div className="countryCard">
        <img
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
        />
        <h3>{country.name.common}</h3>
      </div>
    );
  };

  return (
    <div className="container">
      <nav className="navbar">
       
        <input
          type="text"
          placeholder="Search for countries..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchbar"
        />
        
      </nav>
      
        <div className="countryclass">
          {filteredCountries.map((country, index) => (
            <RenderCard key={index} country={country} />
          ))}
        </div>
    
    </div>
  );
}

export default Card;
