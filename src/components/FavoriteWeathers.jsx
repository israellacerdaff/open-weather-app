import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/favoriteWeathers/favoriteBox.css';
import '../style/favoriteWeathers/container.css';

export default class FavoriteWeathers extends Component {
  removeFav (fav) {
    this.props.removeFav(fav);
  }

  render () {
    const { favoriteLocal } = this.props;
    return (
      <div className="container__fav">
        {favoriteLocal.map((favorite) => (
          <div
            onClick={() => {
              this.removeFav(favorite);
            }}
            key={favorite.id}
            className="info__box"
            id="favorite__box"
            data-aos="fade-up"
          >
            <div className="locale">
              <h1>
                {favorite.name},<span> {favorite.sys.country}</span>
              </h1>
            </div>
            <span className="savedTime">{favorite.savedTime}</span>
            <div className="temp__Info">
              <h2>{`${favorite.main.temp.toFixed(0)}°c`}</h2>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

FavoriteWeathers.propTypes = {
  favoriteLocal: PropTypes.arrayOf(Object).isRequired,
  removeFav: PropTypes.func.isRequired
};
