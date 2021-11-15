import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import urls from "@/constants/urls";
import { IModalProps } from "@/types";
import { ModalType } from "@/constants/globalConstants";
import LogInContext from "../../contexts/loginContext";
import Header, { ICategory, IHeaderProps } from "./Header";

const categoriesArray: ICategory[] = [
  {
    label: "PC",
    path: `${urls.PRODUCTS}/pc`,
  },
  {
    label: "PS",
    path: `${urls.PRODUCTS}/ps`,
  },
  {
    label: "XBOX",
    path: `${urls.PRODUCTS}/xbox`,
  },
];

const HeaderContainer = (): JSX.Element => {
  const history = useHistory();
  const thingsContext = useContext(LogInContext);
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [modelType, setModelType] = React.useState<ModalType | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleOpenReg = () => {
    setOpenModal(true);
    setModelType(ModalType.registration);
  };

  const handleOpenLog = () => {
    setOpenModal(true);
    setModelType(ModalType.logIn);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
    thingsContext.signOut && thingsContext.signOut();
  };

  const registration: IModalProps = {
    typeModal: modelType,
    handleClose: handleCloseModal,
    open: openModal,
  };

  const props: IHeaderProps = {
    anchorEl,
    onHandleClick,
    isLogged: thingsContext.isLogged,
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
