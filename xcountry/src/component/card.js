import React, { useState, useEffect } from "react";
import axios from "axios";
import "./card.css";
import { Box, Grid, TextField } from "@mui/material";

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
        console.error("Fetch Error:", error);
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
      <Grid sx={{margin:"20px"}}>
      <Box
        sx={{
          display:"flex",
          flexDirection:"column",
          alignItems: "center",
          alignContent:"center",
          border: 1,
          borderRadius:"8px",
          margin: "10px",
          padding: "10px",
          width: 150,
          height: 150,
        }}
      >
        <img
          style={{ maxHeight: 100, maxWidth: 100, padding: "8px" }}
          src={country.flags.png}
          alt={country.flags.alt || country.name.common}
        />
          <h3>
                  {country.name.common}
          </h3>

      </Box>
      </Grid>
    );
  };

  return (
    <Box className="container">
     <nav className="navbar">
      <TextField
        placeholder="Search for a countries..."
        onChange={(e) => setSearchTerm(e.target.value)}
         sx={{ margin: "10px",}}
         className="searchbar"
      />
      </nav>
      <Grid container justifyContent="center" className="card-wrapper">
        {filteredCountries.map((country, index) => (
          <RenderCard key={index} country={country} />
        ))}
      </Grid>
    </Box>
  );
}

export default Card;
