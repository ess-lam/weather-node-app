const express = require('express');
const router = express.Router();
const apiKey = `${process.env.API_KEY}`;

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/test', function (req, res, next) {
  console.log(req.body)
  res.send("test route")
})

router.post('/', async (req, res) => {

  const city = req.body.city;
  const url1 = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

  const weather = await getWeatherByCityName(url1);
  console.log("the weather data => ",weather)
  let forecast
  if(weather) {
    const city = weather.name, country = weather.sys.country;
    const desc = weather.weather[0].description;
    const time = new Date().toLocaleTimeString({},{timezone: weather.timezone});
    forecast = `for ${city}, ${country} ${time} : ${desc}`
    
  }
  
  res.render('index', {
    weather, forecast
  });
});

function getWeatherByCityName (url) {
  const coord = fetch(url)
    .then(response => response.json())
    .then(jsonObject => {
      if(jsonObject.length == 0) throw new Error("City reference not found")
      // console.log(jsonObject)
      const lat = jsonObject[0].lat
      const lon = jsonObject[0].lon

      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      let weather = getWeatherByCoo(url2);
      return weather;
    })
    .catch(err => console.error("fetch error :",err.message));

    return coord;
}

function getWeatherByCoo(url) {
  const weather = fetch(url)
    .then(response => response.json())
    .then(jsonObject => {
      // console.log(jsonObject)
      return jsonObject;
    })
    .catch(err => console.error("fetch weather error : ",err.message));
  return weather;
}

module.exports = router;