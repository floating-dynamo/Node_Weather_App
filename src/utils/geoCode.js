const request = require("request");

const geoCode = (address, callback) => {
  const positionStackURL =
    "http://api.positionstack.com/v1/forward?access_key=52dd04e48ca2403988ab18ced528e162&query=" +
    address;

  request({ url: positionStackURL, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the Web Service", undefined);
    } else if (response.body.error) {
      callback("Invalid API Request!", undefined);
    } else if (response.body.data.length === 0) {
      callback("Cannot find the place!", undefined);
    } else {
      const data = response.body.data[0];
      callback(undefined, {
        latitude: data.latitude,
        longitude: data.longitude,
        name: data.name,
        country: data.country,
      });
    }
  });
};

module.exports = geoCode;
