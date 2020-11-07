document.getElementById('searchBtn').addEventListener('click', (e) => {
  e.preventDefault();
  var cityName = getCityName();
  if (cityName) {
    getWeatherReport(cityName);
  } else {
    alert('Required City Name');
  }
});
function getCityName() {
  return document.getElementById('city-name').value;
}
function getWeatherReport(cityName) {
  var URL = 'http://api.openweathermap.org/data/2.5/weather';
  var API_KEY = '2fd1c2a4efb9dde205254a8b6e6c4aa6';
  var queryString = URL + '?q=' + cityName + '&appid=' + API_KEY;
  console.log(queryString);

  var xhttp = new XMLHttpRequest();
  // Handle Response
  xhttp.onload = function () {
    if (this.status == 200) {
      var objData = {
        temp: null,
        desc: '',
        city: '',
        cityCode: null,
        country: '',
        coord: {
          lat: null,
          lon: null,
        },
        countryFlag: '',
        iconImg: '',
      };
      var resultData = JSON.parse(this.responseText);
      console.log(resultData);
      // API return Temprature in Kelvin
      objData.temp = Math.round(10 * (resultData.main.temp - 273.15)) / 10;
      objData.desc = resultData.weather[0].description;
      objData.cityCode = resultData.id;
      objData.coord.lat = resultData.coord.lat;
      objData.coord.lon = resultData.coord.lon;
      objData.country = resultData.sys.country.toLowerCase();
      objData.countryFlag =
        'http://openweathermap.org/images/flags/' + objData.country + '.png';
      objData.iconImg =
        'http://openweathermap.org/img/wn/' +
        resultData.weather[0].icon +
        '@2x.png';
      objData.city = resultData.name;
      dynamicElement(objData);
      // console.log(objData);
    } else if (this.status == 404) {
      alert("City does't Exist");
    }
  };
  // On Error
  xhttp.onerror = function () {
    alert('Request Error....');
  };
  // On Progress
  xhttp.onprogress = function () {
    if (this.readyState == 3) {
      alert('In Progress');
    }
  };
  // Open Request
  xhttp.open('GET', queryString, true);
  // Send the Request
  xhttp.send();
}
function dynamicElement(objData) {
  var dynamicDiv = document.createElement('div');
  dynamicDiv.className = 'city-wrapper';
  var icon = document.createElement('img');
  icon.src = objData.iconImg;
  icon.className = 'icon-image';
  var countryImg = document.createElement('img');
  countryImg.src = objData.countryFlag;
  countryImg.className = 'country-flag';
  var headingDiv = document.createElement('h2');
  headingDiv.className = 'city-name';
  headingDiv.innerText = objData.city;
  var currentWeather = document.createElement('p');
  currentWeather.className = 'current-weather';
  currentWeather.innerText =
    objData.desc.charAt(0).toUpperCase() + objData.desc.slice(1);
  var currentTemp = document.createElement('p');
  currentTemp.className = 'current-temp';
  currentTemp.innerText = objData.temp + ' C';
  var cityCode = document.createElement('p');
  cityCode.className = 'city-code';
  cityCode.innerText = objData.cityCode;
  var country = document.createElement('p');
  country.className = 'country';
  country.innerText = objData.country.toUpperCase();
  var coord = document.createElement('p');
  coord.innerText = '[ ' + objData.coord.lat + ',' + objData.coord.lon + ' ]';
  dynamicDiv.appendChild(coord);
  dynamicDiv.appendChild(country);
  dynamicDiv.appendChild(cityCode);
  dynamicDiv.appendChild(currentTemp);
  dynamicDiv.appendChild(currentWeather);
  dynamicDiv.appendChild(headingDiv);
  dynamicDiv.appendChild(icon);
  dynamicDiv.appendChild(countryImg);
  document
    .getElementById('dynamic-content')
    .insertAdjacentElement('afterbegin', dynamicDiv);
}
