import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import headersData from "./headerData";

export default function Header() {
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
  const displayDesktop = () => <Toolbar>{getMenuButtons()}</Toolbar>;
  return (
    <header>
      <AppBar position="sticky">
        {" "}
        <Typography variant="body1" color="inherit">
          Best Games Market
        </Typography>
        {displayDesktop()}
      </AppBar>
    </header>
  );
}
