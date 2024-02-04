const apiKey = 'd15b869830b389d5df5cfb4fbda2ed9f';
type WeatherData = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
    name: string;
  };
  sys: {
    country: string;
  };
};

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
const loader = document.querySelector('#loader') as HTMLDivElement;

const suggestionContainer = document.querySelector(
  '#suggestions',
) as HTMLDivElement;
const suggestionButtons = document.querySelectorAll(
  '#suggestions button',
) as HTMLButtonElement;

const getDataWeather = async (city: string): Promise<WeatherData> => {
  const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  try {
    const res: Response = await fetch(apiWeather);
    if (!res.ok) {
      throw new Error(`Erro na requisição: ${res.statusText}`);
    }
    const data: WeatherData = await res.json();
    console.log(data);
    return data;
  } catch (erroe) {
    console.log(erroe);
    throw erroe;
  }
};

btn.addEventListener('click', (e: MouseEvent) => {
  e.preventDefault();
  const city = cityInput.value as string;
  getDataWeather(city);
});
