const apiKey = process.env.API_KEY as string;

type WeatherData = {
  cod: number;
  name: string;
  main: {
    temp: string;
    humidity: number;
  };
  weather: [
    {
      description: string;
      icon: string;
      name: string;
    },
  ];
  sys: {
    country: string;
  };
  wind: {
    speed: number;
  };
};

const apiUnsplash = 'https://source.unsplash.com/1600x900/?';

const apiCountryURL = 'https://flagsapi.com/';

const cityInput = document.querySelector('.input-city') as HTMLInputElement;
const btn = document.querySelector('.btnSearch') as HTMLButtonElement;

const cityElement = document.querySelector('#city') as HTMLSpanElement;
const tempElement = document.querySelector(
  '#temperature span',
) as HTMLParagraphElement;
const descElement = document.querySelector(
  '#description',
) as HTMLParagraphElement;
const weatherIconElement = document.querySelector(
  '#weather-icon',
) as HTMLParagraphElement;
const countryElement = document.querySelector('#country') as HTMLSpanElement;
const umidityElement = document.querySelector(
  '#umidity span',
) as HTMLSpanElement;
const windElement = document.querySelector('#wind span') as HTMLSpanElement;

const weatherContainer = document.querySelector(
  '#weather-data',
) as HTMLDivElement;

const errorMessageContainer = document.querySelector(
  '#error-message',
) as HTMLDivElement;

const suggestionContainer = document.querySelector(
  '#suggestions',
) as HTMLDivElement;

const suggestionButtons = document.querySelectorAll(
  '#suggestions button',
) as NodeListOf<Element>;

// Limpa input
const clearInput = (): void => {
  cityInput.value = ' ';
};

// Tratamento de erro
const showErrorMessage = (): void => {
  errorMessageContainer.classList.remove('hide');
};

const getDataWeather = async (city: string): Promise<WeatherData> => {
  const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  try {
    const res: Response = await fetch(apiWeather);
    if (!res.ok) {
      showErrorMessage();
      throw new Error(`Erro na requisição: ${res.statusText}`);
    }
    const data: WeatherData = await res.json();

    clearInput();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const hideInformation = (): void => {
  errorMessageContainer.classList.add('hide');
  weatherContainer.classList.add('hide');

  suggestionContainer.classList.add('hide');
};

const showData = async (city: string) => {
  hideInformation();
  try {
    const data = await getDataWeather(city);
    if (data.cod === 404) {
      showErrorMessage();
      return;
    }

    cityElement.innerText = data.name;
    tempElement.innerHTML = data.main.temp;
    descElement.innerHTML = data.weather[0].description;
    weatherIconElement.setAttribute(
      'src',
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
    );
    countryElement.setAttribute(
      'src',
      apiCountryURL + data.sys.country + '/flat/64.png',
    );
    umidityElement.innerHTML = `${data.main.humidity}%`;
    windElement.innerHTML = `${data.wind.speed}km/h`;

    // Change bg image
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherContainer.classList.remove('hide');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

btn.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault();
  const city = cityInput.value as string;
  showData(city);
});

cityInput.addEventListener('keyup', (e: KeyboardEvent) => {
  if (e.code === 'Enter') {
    const city = (e.target as HTMLInputElement).value;

    showData(city);
  }
});
// Sugestões
suggestionButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const city = btn.getAttribute('id') as string;

    showData(city);
  });
});
