interface IAuthIsAutorised {
  auth: {
    isAutorised: boolean;
  };
}

interface IAuthStatus {
  auth: {
    status: number;
  };
}
export const isAutorisedSelector = (state: IAuthIsAutorised) => state.auth.isAutorised;
export const getStatusSelector = (state: IAuthStatus) => state.auth.status;
