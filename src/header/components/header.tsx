import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Fade, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
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

const Header = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const classes = useStyles();

  const onHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  const onHandleClose = () => {
    setAnchorEl(null);
  };

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
            onMouseOver={onHandleClick}
          >
            Categories
          </Button>

          <Menu
            classes={{ paper: classes.menuPaper }}
            color="inherit"
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={onHandleClose}
            MenuListProps={{ onMouseLeave: onHandleClose }}
            TransitionComponent={Fade}
          >
            <MenuItem href="/products" color="inherit" onClick={onHandleClose}>
              <RouterLink className={classes.menuPaper} to="/products/pc">
                PC
              </RouterLink>
            </MenuItem>
            <MenuItem color="inherit" onClick={onHandleClose}>
              <RouterLink className={classes.menuPaper} to="/products/xbox">
                XBOX
              </RouterLink>
            </MenuItem>
            <MenuItem color="inherit" onClick={onHandleClose}>
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
