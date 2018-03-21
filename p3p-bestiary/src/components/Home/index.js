import React, { Component } from 'react';
// import logo from './logo.svg';
import Logo from '../Logo';
import Card from '../Card';
import Background from '../Background';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Background />
        <div class="content">
          <Logo />
          {/* <header className="Home-header">
            <img src={logo} className="Home-logo" alt="logo" />
            <h1 className="Home-title">Welcome to React</h1>
          </header> */}
          <p className="Home-intro">
            To get started, edit <code>src/Home.js</code> and save to reload.
          </p>
          <Card />
        </div>
      </div>
    );
  }
}

export default Home;
