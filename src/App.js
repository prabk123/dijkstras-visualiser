import React from 'react';
import { Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import './App.css';
import MainPage from './MainPage';


const App = props => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </div>
  )
}

export default App;
