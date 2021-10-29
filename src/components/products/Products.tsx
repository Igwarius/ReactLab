import { Switch, Route } from "react-router-dom";
import React from "react";
import Pc from "@/components/pc/Pc";
import Xbox from "@/components/xbox/Xbox";
import Ps from "@/components/ps/Ps";
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
