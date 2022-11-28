import React from 'react';
import Aos from 'aos';
import FavoriteWeathers from './components/FavoriteWeathers';
import SearchedWeather from './components/SearchedWeather';
import fetchWeather from './data/api';
import 'aos/dist/aos.css';
import './style/app/searchCity.css';
import './style/app/weatherCity.css';
import './style/app/button.css';
import './style/app/buttonSearch.css';
import './style/app/buttonFavorite.css';

export default class App extends React.Component {
  constructor () {
    super();
    this.state = {
      localName: '',
      weatherData: null,
      favoriteLocal: [],
      submited: false
    };
    this.removeFav = this.removeFav.bind(this);
  }

  componentDidMount () {
    Aos.init({ duration: 700 });
  }

  // Pesquisa a cidade
  handleChange = ({ target }) => {
    const { name, value } = target;
    const caps = (str) => {
      return str.charAt(0).toUpperCase() + str.substr(1);
    };
    // Atualiza o localname com valor do user
    this.setState({ [name]: caps(value) });
  };

  getDate = () => {
    const { weatherData } = this.state;

    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const savedTime = `Salvo às ${hours}:${minutes}, ${day}/${month}/${year}`;

    const savedTimes = [];
    savedTimes.push(savedTime);

    weatherData.savedTime = savedTimes[savedTimes.length - 1];
  };

  // Adicionar favorito
  addFavorite = () => {
    const { weatherData } = this.state;

    this.getDate();

    this.setState((prevstate) => ({
      favoriteLocal: [...prevstate.favoriteLocal, weatherData]
    }));
  };

  // Remover favoritos
  removeFav (fav) {
    const { favoriteLocal } = this.state;
    this.setState({
      favoriteLocal: favoriteLocal.filter((el) => el !== fav)
    });
  }

  fetchToData = async () => {
    const { localName } = this.state;
    const fetchInfo = await fetchWeather(localName);
    this.validateFetch(fetchInfo);
    this.bgTemp(fetchInfo);
  };

  validateFetch = (fetchInfo) => {
    const inputText = document.querySelector('.search');
    const bg = document.querySelector('body');

    if (fetchInfo.cod === 200) {
      this.setState({ submited: true, weatherData: fetchInfo });
      bg.classList.remove('bg__error');
    } else if (fetchInfo.cod !== 200) {
      inputText.placeholder = 'Ops! Digite a Cidade :)';
      inputText.value = '';
      bg.classList.remove('warm', 'cold');
      bg.classList.add('bg__error');
    }
  };

  bgTemp = (weatherInfo) => {
    const bg = document.querySelector('body');
    if (weatherInfo.main.temp >= 24) {
      bg.classList.add('warm');
      bg.classList.remove('cold');
    }
    if (weatherInfo.main.temp < 24) {
      bg.classList.add('cold');
      bg.classList.remove('warm');
    }
  };

  sugestRandomNameCity = () => {
    const names = [
      'Japan',
      'Baghdad',
      'Berlin',
      'Luxembourg',
      'Moscow',
      'Vienna',
      'Afghanistan',
      'Canada',
      'North Korea',
      'Brazil',
      'Pernambuco'
    ];
    const name = names[Math.ceil(Math.random() * (names.length - 1))];

    return name;
  };

  render () {
    const { weatherData, favoriteLocal, submited } = this.state;
    return (
      <div className="App">
        {submited
          ? (
          <div className="weather__app">
            <section className="search__city">
              <input
                className="search"
                onChange={this.handleChange}
                name="localName"
                type="text"
                placeholder="Quer pesquisar outro local?"
              />
              <button
                className="button button__search"
                onClick={this.fetchToData}
                type="submit"
              >
                Buscar
              </button>
            </section>
            <section className="city__weather">
              <SearchedWeather weatherData={weatherData} />
              <button
              id='favorite'
                className="button button__favorite"
                onClick={this.addFavorite}
                onDoubleClick={this.t}
                type="button"
              >
                <a href="#favorite__box">
                Favoritar</a>
              </button>
              <FavoriteWeathers
                removeFav={this.removeFav}
                favoriteLocal={favoriteLocal}
              />
            </section>
          </div>
            )
          : (
          <section className="search__city">
            <input
              className="search"
              onChange={this.handleChange}
              name="localName"
              type="text"
              placeholder={this.sugestRandomNameCity()}
              data-aos="fade-right"
            />
            <button
              className="button button__search"
              onClick={this.fetchToData}
              type="submit"
            >
              Buscar
            </button>
          </section>
            )}
      </div>
    );
  }
}
