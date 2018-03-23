import React, { PureComponent } from 'react';
import {
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import debounce from 'lodash/debounce';
import classNames from 'classnames';
import LogoHeader from '../Logo';
import Card from '../Card';
import NoMatch from '../NoMatch';
import './App.css';

// eslint-disable-next-line
const LoadingSpinner = () => (
  <div className="content loading">
    <Card />
  </div>
);

const Home = () => (
  <div>
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
    <p>Space</p>
    <div className="theme-switcher">
    </div>
  </div>
);

const Shadow = () => (
  <p>Shadow!</p>
);

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
    // this.onScroll = debounce(this.onScroll.bind(this));
    this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount() {
    this.contentContainer.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
    this.contentContainer.removeEventListener('scroll', this.onScroll);
  }
  onScroll() {
    const { collapsed } = this.state;
    if ( collapsed && this.contentContainer.scrollTop <= 65 ) {
      this.setState({ collapsed: false });
    } else if ( ! collapsed && this.contentContainer.scrollTop > 65 ) {
      this.setState({ collapsed: true });
    }
  }
  render() {
    const { collapsed } = this.state;
    return (
      <div className="App">
        <header className={ classNames({ collapsed }) }>
          <Link to="/">
            <LogoHeader />
          </Link>
        </header>
        <div className="content" ref={ node => { this.contentContainer = node } }>
          <Switch>
            <Route path="/" component={ Home } />
            <Route path="/shadow" component={ Shadow } />
            <Route component={ NoMatch } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
