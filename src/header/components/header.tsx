import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import headersData from "../../constants/headerData";

const Header = () => {
  const getMenuButtons = () =>
    headersData.map(({ label, href }) => (
      <Button
        {...{
          key: label,
          color: "inherit",
          to: href,
          component: RouterLink,
        }}
      >
        {label}
      </Button>
    ));

  return (
    <header>
      <AppBar position="sticky">
        <Typography variant="body1" color="inherit">
          Best Games Market
        </Typography>
        <Toolbar>{getMenuButtons()}</Toolbar>
      </AppBar>
    </header>
  );
};
export default Header;
