import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Fade, makeStyles } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Search from "@/components/search/Searc";
import ModalWindowContainer from "../modal/ModaWindowContainer";
import { ILoginContext, IModalProps } from "@/types";
import headersData from "@/constants/headerData";

const useStyles = makeStyles(() => ({
  menuPaper: {
    backgroundColor: "#3f51b5",
    color: "white",
    textDecoration: "none",
  },
}));

export interface ICategory {
  id: number;
  label: string;
  path: string;
}

export interface IHeaderProps {
  anchorEl: (EventTarget & HTMLButtonElement) | null;
  onHandleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  things: ILoginContext;
  handleOpenReg: () => void;
  handleOpenLog: () => void;
  onLogOut: () => void;
  onHandleClose: () => void;
  onLinkClick: (link: string) => void;
  registration: IModalProps;
  categoriesArray: ICategory[];
}

const Header = (props: IHeaderProps): JSX.Element => {
  const classes = useStyles();
  const {
    anchorEl,
    onHandleClick,
    things,
    handleOpenReg,
    handleOpenLog,
    onLogOut,
    onHandleClose,
    onLinkClick,
    registration,
    categoriesArray,
  } = props;

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
    <>
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
          {!things.isLogged ? (
            <div>
              <Button color="inherit" onClick={handleOpenReg}>
                Registration
              </Button>
              <Button color="inherit" onClick={handleOpenLog}>
                Log in
              </Button>
            </div>
          ) : (
            <Button color="inherit" onClick={onLogOut}>
              Log out
            </Button>
          )}
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

      <ModalWindowContainer {...registration} />
    </>
  );
};

export default Header;
