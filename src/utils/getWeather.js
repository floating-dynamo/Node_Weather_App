const request = require("request");

const getWeather = (latitude, longitude, callback) => {
  // Getting the Weather of the location

  const weatherStackURL = `http://api.weatherstack.com/current?access_key=37d00dddbc02e64fff2b31531362fa40&query=${latitude},${longitude}`;

  request({ url: weatherStackURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the Web Service", undefined);
    } else if (response.body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const data = response.body;
      const currentData = data.current;

      callback(undefined, currentData);
    }
  });
};

module.exports = getWeather;
