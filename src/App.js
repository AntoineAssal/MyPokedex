import React from "react"
import { Switch, Route } from "react-router-dom";
import Pokedex from "./components/Pokedex"
import Pokemon from "./components/Pokemon"

function App() {
  return (
    // Routing Switch case to show user home (pokedex) page if on root or a specific pokemon's page denoted by ID variable
    <Switch>
      <Route exact path="/" render={(props) => <Pokedex {...props} />} />
      <Route exact path="/:pokemonID" render ={(props) => <Pokemon {...props} /> } />
    </Switch>
  );
}

export default App;
