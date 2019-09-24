import React from "react";
import Results from "./components/Results";
import Job from "./components/Job";
import Loading from "./components/Loading";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="container">
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={Results} />
            <Route path="/search" component={Job} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
}
