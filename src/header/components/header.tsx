/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */

import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Fade, makeStyles } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import headersData from "../../constants/headerData";
import Search from "@/search/searc";

const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: "#3f51b5",
    color: "white",
    textDecoration: "none",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  function handleClick(event: any) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

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
        <Toolbar>
          {getMenuButtons()}

          <Button
            color="inherit"
            aria-controls="fade-menu"
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            onMouseOver={handleClick}
          >
            Categories
          </Button>

          <Menu
            classes={{ paper: classes.menuPaper }}
            color="inherit"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            getContentAnchorEl={null}
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
            TransitionComponent={Fade}
          >
            <MenuItem href="/products" color="inherit" onClick={handleClose}>
              <RouterLink className={classes.menuPaper} to="/products/pc">
                PC
              </RouterLink>
            </MenuItem>
            <MenuItem color="inherit" onClick={handleClose}>
              <RouterLink className={classes.menuPaper} to="/products/xbox">
                XBOX
              </RouterLink>
            </MenuItem>
            <MenuItem color="inherit" onClick={handleClose}>
              <RouterLink className={classes.menuPaper} to="/products/ps">
                PS
              </RouterLink>
            </MenuItem>
          </Menu>
          <Search />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
