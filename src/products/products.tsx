import { Switch, Route } from "react-router-dom";
import Pc from "@/pc/pc";
import Xbox from "@/xbox/xbox";
import Ps from "@/ps/ps";

const Products = () => (
  <>
    <div>Products</div>
    <Switch>
      <Route path="/products/pc" component={Pc} />
      <Route path="/products/xbox" component={Xbox} />
      <Route path="/products/ps" component={Ps} />
    </Switch>
  </>
);

export default Products;
