import React, { Suspense } from "react";
import "./styles/index.css";
import ReactDom from "react-dom";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import urls from "./constants/urls";

import HeaderContainer from "./components/header/HeaderContainer";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./components/error-boundary/ErrorrBoundary";
import { store } from "./redux/reduxStore";

const Main = React.lazy(() => import("./components/main-page/MainPage"));
const Products = React.lazy(() => import("./components/products/Products"));
const About = React.lazy(() => import("./components/about/About"));
const ProfileContainer = React.lazy(() => import("./components/profile/ProfileContainer"));
const CartContainer = React.lazy(() => import("./components/cart/CartContainer"));

const AppContainer = (): JSX.Element => (
  <ErrorBoundary>
    <Suspense fallback={<div>Loading... </div>}>
      <Provider store={store}>
        <Router>
          <HeaderContainer />

          <Switch>
            <Route exact path={urls.MAIN} component={Main} />
            <Route path={urls.PRODUCTS} component={Products} />
            <Route exact path={urls.ABOUT} component={About} />
            <Route exact path={urls.PROFILE} component={ProfileContainer} />
            <Route exact path={urls.CART} component={CartContainer} />

            <Route render={() => <Redirect to={urls.MAIN} />} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </Suspense>
  </ErrorBoundary>
);

ReactDom.render(<AppContainer />, document.getElementById("app"));
