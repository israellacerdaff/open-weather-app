const fetchWeather = async (city) => {
  try {
    const fetchRequest = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=973db35b274b2d5eaa4ba88d11c72dee&units=metric`
    );
    const data = await fetchRequest.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
export default fetchWeather;
