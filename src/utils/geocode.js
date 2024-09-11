const request = require('request')

const geocode = (address, callback) => {
    const url =
    "https://api.mapbox.com/search/geocode/v6/forward?q=" +
    address +
      ".json&access_token=pk.eyJ1IjoiY2VzYXIyNiIsImEiOiJjbTBjOHp5ankwMHBtMnJzOTV1ZTh3c3hhIn0.QZOhuAMrrtStsYQNzz2PCQ";
    request({ url, json: true }, (error, {body}) => {
      //console.log(response);
      if (error) {
        callback("Unable to connect to location services!", undefined);
      } else if (body.features.length === 0) {
        callback("Unable to find location.Try another search", undefined);
      } else {
        callback(undefined, {
          longitude: body.features[0].properties.coordinates.longitude,
          latitude: body.features[0].properties.coordinates.latitude,
          location: body.features[0].properties.name,
        });
      }
    });
  };



  module.exports = geocode