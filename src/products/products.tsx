import { Switch, Route } from "react-router-dom";
import React from "react";
import Pc from "@/pc/pc";
import Xbox from "@/xbox/xbox";
import Ps from "@/ps/ps";
import urls from "@/constants/urls";

const Products = () => (
  <>
    <div>Products</div>
    <Switch>
      <Route path={`${urls.PRODUCTS}/pc`} component={Pc} />
      <Route path={`${urls.PRODUCTS}/xbox`} component={Xbox} />
      <Route path={`${urls.PRODUCTS}/ps`} component={Ps} />
    </Switch>
  </>
);

export default Products;
