import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Card from '../Card';
import ContentContainer from '../../containers/ContentContainer';
import HeaderContainer from '../../containers/HeaderContainer';
import NoMatch from '../NoMatch';
import './App.css';

// eslint-disable-next-line
const LoadingSpinner = () => <Card />;

const Home = () => (
  <div>
    <p><Link to="/shadow">Space</Link></p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <p>Space</p>
    <div className="theme-switcher">
    </div>
  </div>
);

const Shadow = () => (
  <p>Shadow!</p>
);

const App = () => (
  <div className="App">
    <HeaderContainer />
    <ContentContainer className="content">
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/shadow" component={ Shadow } />
        <Route component={ NoMatch } />
      </Switch>
    </ContentContainer>
  </div>
);

export default App;
