import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IModalProps } from "../../types";
import { IS_AUTHORIZED_KEY, ModalType } from "../../constants/globalConstants";
import Header, { IHeaderProps } from "./Header";
import { signIn, signOut } from "../../redux/actions/authActions";
import { getUserNameSelector, isAutorisedSelector } from "../../redux/selectors/authSelectors";

const HeaderContainer = (): JSX.Element => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [modelType, setModelType] = React.useState<ModalType | null>(null);
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem(IS_AUTHORIZED_KEY)) {
      dispatch(signIn(localStorage.getItem(IS_AUTHORIZED_KEY)));
    }
  });
  const userName = useSelector(getUserNameSelector);
  const handleOpenReg = () => {
    setOpenModal(true);
    setModelType(ModalType.Registration);
  };

  const handleOpenLog = () => {
    setOpenModal(true);
    setModelType(ModalType.LogIn);
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
    localStorage.removeItem(IS_AUTHORIZED_KEY);
    dispatch(signOut());
  };

  const registration: IModalProps = {
    typeModal: modelType,
    handleModal: handleCloseModal,
    open: openModal,
  };

  const isLogged = useSelector(isAutorisedSelector);
  const props: IHeaderProps = {
    anchorEl,
    onHandleClick,
    isLogged,
    handleOpenReg,
    handleOpenLog,
    onLogOut,
    onHandleClose,
    onLinkClick,
    registration,

    userName,
  };

  return <Header {...props} />;
};

export default HeaderContainer;
