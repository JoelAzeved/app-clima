/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function() {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = "d15b869830b389d5df5cfb4fbda2ed9f";
const apiUnsplash = 'https://source.unsplash.com/1600x900/?';
const apiCountryURL = 'https://flagsapi.com/';
const cityInput = document.querySelector('.input-city');
const btn = document.querySelector('.btnSearch');
const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const countryElement = document.querySelector('#country');
const umidityElement = document.querySelector('#umidity span');
const windElement = document.querySelector('#wind span');
const weatherContainer = document.querySelector('#weather-data');
const errorMessageContainer = document.querySelector('#error-message');
const suggestionContainer = document.querySelector('#suggestions');
const suggestionButtons = document.querySelectorAll('#suggestions button');
// Limpa input
const clearInput = () => {
    cityInput.value = ' ';
};
// Tratamento de erro
const showErrorMessage = () => {
    errorMessageContainer.classList.remove('hide');
};
const getDataWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    try {
        const res = yield fetch(apiWeather);
        if (!res.ok) {
            showErrorMessage();
            throw new Error(`Erro na requisição: ${res.statusText}`);
        }
        const data = yield res.json();
        clearInput();
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
const hideInformation = () => {
    errorMessageContainer.classList.add('hide');
    weatherContainer.classList.add('hide');
    suggestionContainer.classList.add('hide');
};
const showData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    hideInformation();
    try {
        const data = yield getDataWeather(city);
        if (data.cod === 404) {
            showErrorMessage();
            return;
        }
        cityElement.innerText = data.name;
        tempElement.innerHTML = data.main.temp;
        descElement.innerHTML = data.weather[0].description;
        weatherIconElement.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
        countryElement.setAttribute('src', apiCountryURL + data.sys.country + '/flat/64.png');
        umidityElement.innerHTML = `${data.main.humidity}%`;
        windElement.innerHTML = `${data.wind.speed}km/h`;
        // Change bg image
        document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;
        weatherContainer.classList.remove('hide');
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
btn.addEventListener('click', () => {
    const city = cityInput.value;
    getDataWeather(city);
});
cityInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        const city = e.target.value;
        showData(city);
    }
});
// Sugestões
suggestionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const city = btn.getAttribute('id');
        showData(city);
    });
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map