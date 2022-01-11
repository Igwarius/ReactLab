import { AppBar, Toolbar, Button, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Search from "../search/Search";
import ModalWindowContainer from "../modal/ModaWindowContainer";
import { IModalProps } from "../../types";
import headersData from "../../constants/headerData";
import urls from "../../constants/urls";

export interface IHeaderProps {
  anchorEl: (EventTarget & HTMLButtonElement) | null;
  onHandleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLogged: boolean;
  handleOpenReg: () => void;
  handleOpenLog: () => void;
  onLogOut: () => void;
  onHandleClose: () => void;
  onLinkClick: (link: string) => void;
  registration: IModalProps;

  userName: string;
}

const Header = ({
  isLogged,
  handleOpenReg,
  handleOpenLog,
  onLogOut,

  onLinkClick,
  registration,

  userName,
}: IHeaderProps): JSX.Element => {
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

          {!isLogged ? (
            <div>
              <Button id="reg" color="inherit" onClick={handleOpenReg}>
                Registration
              </Button>
              <Button color="inherit" onClick={handleOpenLog}>
                Log in
              </Button>
            </div>
          ) : (
            <>
              <Button color="inherit" onClick={onLogOut}>
                Log out
              </Button>
              <Button color="inherit" onClick={() => onLinkClick(urls.PROFILE)}>
                {userName}
              </Button>
            </>
          )}

          <Search />
        </Toolbar>
      </AppBar>

      <ModalWindowContainer {...registration} />
    </>
  );
};

export default Header;
