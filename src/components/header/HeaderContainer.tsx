import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import headersData from "../../constants/headerData";
import urls from "@/constants/urls";
import { IModalProps } from "@/types";
import { IS_AUTORISED_KEY, ModalType } from "@/constants/globalConstants";
import LogInContext from "../loginContext";
import Header, { ICategory, IHeaderProps } from "./Header";

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

const HeaderContainer = (): JSX.Element => {
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
  const props: IHeaderProps = {
    getMenuButtons,
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
  };

  return <Header {...props} />;
};

export default HeaderContainer;
