import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component } from "react";
import ReactDom from "react-dom";
import { createBrowserHistory } from "history";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Products from "./products/products";
import Main from "./mainPage/mainPage";
import urls from "./statics/urls";
import About from "./about/about";
import Header from "./components/header";
import Footer from "./components/footer";

interface AppProps {
  nothing: boolean;
}
interface AppState {
  title: string;
}

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  history = createBrowserHistory();

  render() {
    return (
      <Router>
        <Header />
        <div className="page">
          <Switch>
            <Route exact path={urls.MAIN} component={Main} />
            <Route exact path={urls.PRODUCTS} component={Products} />
            <Route exact path={urls.ABOUT} component={About} />
            <Route render={() => <Redirect to={urls.MAIN} />} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

ReactDom.render(<AppContainer nothing={false} />, document.getElementById("app"));
