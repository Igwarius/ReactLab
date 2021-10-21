import { Component } from "react";
import "./styles/index.css";
import ReactDom from "react-dom";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Products from "./products/products";
import Main from "./main-page/mainPage";
import urls from "./constants/urls";
import About from "./about/about";
import Header from "./header/components/header";
import Footer from "./footer/components/footer";
import ErrorBoundary from "./error-boundary/errorrBoundary";
import Search from "./search/searc";

class AppContainer extends Component {
  ["constructor"]: typeof AppContainer;

  render() {
    return (
      <ErrorBoundary>
        <Router>
          <Header />
          <Search />
          <Switch>
            <Route exact path={urls.MAIN} component={Main} />
            <Route exact path={urls.PRODUCTS} component={Products} />
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
