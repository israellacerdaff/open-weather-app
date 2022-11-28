import React, { Component } from 'react';
import '../style/header.css';
import companyLogo from '../assets/img/2bdigital_logo.svg';

export default class Header extends Component {
  render () {
    return (
      <div className='header'>
        <a data-aos="zoom-in" className='companyLogo' href="https://www.agencia2bdigital.com.br/" target="_blank" rel="noreferrer noopener"><img src={companyLogo} alt="Github Logo" /></a>
        <div className='title-header'>
          <h1>Weather</h1>
          <h2>App</h2>
        </div>
        <span>by <a href='https://www.linkedin.com/in/israel-f-lacerda-b68489186/' target={'https://www.linkedin.com/in/israel-f-lacerda-b68489186/'}>Israel Lacerda</a> </span>
      </div>
    );
  }
}
