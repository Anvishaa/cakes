import React from 'react'
import logo from '../images/logo.png'
import '../styles/header.css'
const Header = () => {
  return (
    <div class="header-container">
      <img src={logo} alt="Logo" class="logo" />
      <div class="head">D' Cake House</div>
    </div>
  );
};

export default Header