const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("../utils/geoCode");
const getWeather = require("../utils/getWeather");

const app = express();
// Custom views folder
const viewsPath = path.join(__dirname, "../templates/views");
// Public Dir path
const publicPath = path.join(__dirname, "../public");
// Partials Dir path
const partialsPath = path.join(__dirname, "../templates/partials");

// Setting up handlebars engine, views location and register partials
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setting up the static folder
app.use(express.static(publicPath));

// app.com
app.get("/", (req, res) => {
  res.render("index", {
    title: " ☁️ Weather",
    name: "Sridhar Maskeri 🚀",
  });
});

// app.com/about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "👨 About Me",
    name: "Sridhar Maskeri 🚀",
  });
});

// app.com/help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "⛑️ Help",
    name: "Sridhar Maskeri 🚀",
  });
});

// app.com/help/*
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorMsg: "Article not found!",
    name: "Sridhar Maskeri 🚀",
  });
});

// app.com/weather
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.json({
      error: "You must provide an address!",
    });
  }

  const address = req.query.address;

  geoCode(address, (err, { name, country, latitude, longitude } = {}) => {
    if (err) {
      res.json(err);
    }

    getWeather(
      latitude,
      longitude,
      (err, { weather_descriptions, temperature, feelslike = {} }) => {
        if (err) {
          res.json(err);
        }

        if (weather_descriptions.length > 0) {
          const weather = {
            forecast: `It is currently ${weather_descriptions[0]}, the temperature is ${temperature} degrees out. It feels like ${feelslike} degrees.`,
            country: country,
            address: address,
            latitude: latitude,
            longitude: longitude,
          };
          res.json(weather);
        } else {
          res.json(err);
        }
      }
    );
  });
});

// This should be last
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    errorMsg: "Page not found!",
    name: "Sridhar Maskeri 🚀",
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Server started at port " + port);
});
