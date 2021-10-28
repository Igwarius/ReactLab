import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Fade, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import headersData from "../../constants/headerData";
import Search from "@/components/search/Searc";
import urls from "@/constants/urls";

const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: "#3f51b5",
    color: "white",
    textDecoration: "none",
  },
}));
interface ICategory {
  id: number;
  label: string;
  path: string;
}

const categoriesArray: Array<ICategory> = [
  {
    id: 1,
    label: "PC",
    path: `${urls.PRODUCTS}/pc`,
  },
  {
    id: 2,
    label: "PS",
    path: `${urls.PRODUCTS}/ps`,
  },
  {
    id: 3,
    label: "XBOX",
    path: `${urls.PRODUCTS}/xbox`,
  },
];

const Header = (): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const classes = useStyles();
  const history = useHistory();
  const onHandleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };
  const onLinkClick = (link: string) => {
    history.push(link);
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
            {categoriesArray.map((element) => (
              <MenuItem key={element.id} color="inherit" onClick={() => onLinkClick(element.path)}>
                {element.label}
              </MenuItem>
            ))}
          </Menu>
          <Search />
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
