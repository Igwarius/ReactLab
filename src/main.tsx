import React, { Component } from "react";
import "./styles/index.css";
import ReactDom from "react-dom";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Products from "./components/products/Products";
import Main from "./components/main-page/MainPage";
import urls from "./constants/urls";
import About from "./components/about/About";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./components/error-boundary/ErrorrBoundary";

class AppContainer extends Component {
  ["constructor"]: typeof AppContainer;

  render() {
    return (
      <ErrorBoundary>
        <Router>
          <Header />

          <Switch>
            <Route exact path={urls.MAIN} component={Main} />
            <Route path={urls.PRODUCTS} component={Products} />
            <Route exact path={urls.ABOUT} component={About} />
            <Route render={() => <Redirect to={urls.MAIN} />} />
          </Switch>
          <Footer />
        </Router>
      </ErrorBoundary>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
