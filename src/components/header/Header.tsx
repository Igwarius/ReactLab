import { AppBar, Toolbar, Button, Typography, Menu, MenuItem, Fade, makeStyles } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import headersData from "../../constants/headerData";
import Search from "@/components/search/Searc";
import urls from "@/constants/urls";
import { IModalProps } from "@/types";
import ModalWindow from "../modal/ModaWindow";
import { IS_AUTORISED_KEY, ModalType } from "@/constants/globalConstants";
import LogInContext from "../loginContext";

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

const Header = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [modelType, setmodelType] = React.useState<ModalType | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleOpenReg = () => {
    setOpenModal(true);
    setmodelType(ModalType.registration);
  };
  const handleOpenLog = () => {
    setOpenModal(true);
    setmodelType(ModalType.logIn);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (localStorage.getItem(IS_AUTORISED_KEY)) {
      changeIsLogged();
    }
  }, []);
  const changeIsLogged = () => {
    handleCloseModal();
  };
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
    things.signOut && things.signOut();
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

  const registration: IModalProps = {
    typeModal: modelType,
    handleClose: handleCloseModal,
    open: openModal,
  };
  const things = useContext(LogInContext);

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

      <ModalWindow {...registration} />
    </>
  );
};

export default Header;
