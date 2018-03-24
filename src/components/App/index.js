import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ContentContainer from '../../containers/ContentContainer';
import HeaderContainer from '../../containers/HeaderContainer';
import {
  BlueColorSchemeButtonContainer,
  PinkColorSchemeButtonContainer,
} from '../../containers/ColorSchemeButtonContainer';
import NoMatch from '../NoMatch';
import ShadowListContainer from '../../containers/ShadowListContainer';
import ShadowContainer from '../../containers/ShadowContainer';
import './App.css';
import FilterContainer from '../../containers/FilterContainer';

const App = () => (
  <div className="App">
    <HeaderContainer />
    <Route exact path="/" component={ FilterContainer } />
    <ContentContainer className="content">
      <Switch>
        <Route exact path="/" component={ ShadowListContainer } />
        <Route path="/:shadow" component={ ShadowContainer } />
        <Route component={ NoMatch } />
      </Switch>
    </ContentContainer>
    <div className="color-scheme-buttons">
      <BlueColorSchemeButtonContainer />
      <PinkColorSchemeButtonContainer />
    </div>
  </div>
);

export default App;
