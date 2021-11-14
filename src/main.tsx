import React, { Component } from "react";
import "./styles/index.css";
import ReactDom from "react-dom";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Products from "./components/products/Products";
import Main from "./components/main-page/MainPage";
import urls from "./constants/urls";
import About from "./components/about/About";
import HeaderContainer from "./components/header/HeaderContainer";
import Footer from "./components/footer/Footer";
import ErrorBoundary from "./components/error-boundary/ErrorrBoundary";
import { IS_AUTORISED_KEY } from "./constants/globalConstants";
import LogInContext from "./components/loginContext";

interface IMainState {
  isLogged: boolean;
}

class AppContainer extends Component<unknown, IMainState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      isLogged: false,
    };
  }

  componentDidMount(): void {
    if (localStorage.getItem(IS_AUTORISED_KEY)) {
      this.setState({ isLogged: true });
    }
  }

  signIn = () => {
    localStorage.setItem(IS_AUTORISED_KEY, "true");
    this.setState({ isLogged: true });
  };

  signOut = () => {
    localStorage.removeItem(IS_AUTORISED_KEY);
    this.setState({ isLogged: false });
  };

  render() {
    return (
      <LogInContext.Provider value={{ isLogged: this.state.isLogged, signIn: this.signIn, signOut: this.signOut }}>
        <ErrorBoundary>
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
        </ErrorBoundary>
      </LogInContext.Provider>
    );
  }
}

// eslint-disable-next-line react/no-children-prop
ReactDom.render(<AppContainer />, document.getElementById("app"));
