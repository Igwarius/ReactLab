import React from "react";
import "./styles/index.css";
import ReactDom from "react-dom";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import Products from "./components/products/Products";
import Main from "./components/main-page/MainPage";
import urls from "./constants/urls";
import About from "./components/about/About";
import HeaderContainer from "./components/header/HeaderContainer";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./components/error-boundary/ErrorrBoundary";
import { store } from "./redux/reduxStore";

const AppContainer = (): JSX.Element => (
  <ErrorBoundary>
    <Provider store={store}>
      <Router>
        <HeaderContainer />

        <Switch>
          <Route exact path={urls.MAIN} component={Main} />
          <Route path={urls.PRODUCTS} component={Products} />
          <Route exact path={urls.ABOUT} component={About} />
          <Route render={() => <Redirect to={urls.MAIN} />} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  </ErrorBoundary>
);

ReactDom.render(<AppContainer />, document.getElementById("app"));
