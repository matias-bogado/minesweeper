// @flow
import React, { Component } from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Header from './components/Header/Header';
import HomePage from "./pages/HomePage/HomePage";
import ViewGamePage from "./pages/ViewGamePage/ViewGamePage";
import {URL_HOME_PAGE, URL_VIEW_GAME_PAGE} from "./constants/urls";
import './styles/global.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <React.Fragment>
            <Header/>
            <Switch>
              <Route exact path={URL_HOME_PAGE} component={HomePage}/>
              <Route exact path={URL_VIEW_GAME_PAGE} component={ViewGamePage}/>
            </Switch>
          </React.Fragment>
        </header>
      </div>
    );
  }
}

export default App;
