import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Fade, makeStyles, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import headersData from "../../constants/headerData";
import Search from "@/components/search/Searc";
import urls from "@/constants/urls";
import MyForm from "../modal/Modal";

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

const categoriesArray: ICategory[] = [
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
interface IType {
  type: string;
}

const Header = (): JSX.Element => {
  const registration: IType = { type: "Registration" };
  const logIn: IType = { type: "Log in" };
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const classes = useStyles();
  const history = useHistory();
  const [openReg, setOpenReg] = React.useState(false);
  const handleOpenReg = () => setOpenReg(true);
  const handleCloseReg = () => setOpenReg(false);
  const [openLog, setOpenLog] = React.useState(false);
  const handleOpenLog = () => setOpenLog(true);
  const handleCloseLog = () => setOpenLog(false);

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
  const onLogOut = () => {
    localStorage.removeItem("isAutorised");
    window.location.reload();
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
          {!localStorage.getItem("isAutorised") ? (
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
      <Modal open={openReg} onClose={handleCloseReg}>
        <MyForm {...registration} />
      </Modal>
      <Modal open={openLog} onClose={handleCloseLog}>
        <MyForm {...logIn} />
      </Modal>
    </header>
  );
};

export default Header;
