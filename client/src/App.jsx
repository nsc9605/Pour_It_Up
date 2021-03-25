import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Nav/Navigation";
import Header from "./components/Header/Header";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import './index.css';

function App() {
    return (
      <Router >
          <Navigation />
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/contact" component={Contact} />
      </Router>
    );
  }

export default App;
