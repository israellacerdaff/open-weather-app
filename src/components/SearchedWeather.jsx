import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/searchedWeather/container.css';
import '../style/searchedWeather/infoBox.css';
import '../style/searchedWeather/tempoInfo.css';
import '../style/searchedWeather/descriptionCard.css';
import '../style/searchedWeather/localeInfo.css';

export default class SearchedWeather extends Component {
  render () {
    const { weatherData } = this.props;
    return (
      <div className="container">
        <div className="info__box" data-aos="fade-up">
          <div className="locale">
            <h1>
              {weatherData.name}, <span>{weatherData.sys.country}</span>
            </h1>
          </div>
          <div className="desc">
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div className="temp__Info">
            <h2>{`${weatherData.main.temp.toFixed(0)}°c`}</h2>
            <p data-aos="zoom-out">{`Sensação: ${weatherData.main.feels_like.toFixed(0)}°c`}</p>
          </div>
        </div>
      </div>
    );
  }
}

SearchedWeather.propTypes = {
  weatherData: PropTypes.object.isRequired
};
