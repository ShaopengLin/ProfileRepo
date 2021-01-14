import React from "react";

import Interface from "./pp/Interface";

import Login from "./pp/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>

        <Route path="/" exact component={Login} />

        <Route path="/Interface" exact component={Interface} />

      </div>
    </Router>
  );
}

export default App;
