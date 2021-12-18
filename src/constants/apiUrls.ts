const serverURL = "http://localhost:8079";
const apiUrls = {
  GET_THREE_GAMES: `${serverURL}/top-three-games`,
  GET_GAME_BY_NAME: `${serverURL}/game-by-name`,
  LOG_IN: `${serverURL}/log-in`,
  REGISTRATION: `${serverURL}/registration`,
  GET_PROFILE: `${serverURL}/profile-info`,
  CHANGE_PASSWORD: `${serverURL}/change-password`,
  SAVE_PROFILE: `${serverURL}/save-profile`,
  GET_PRODUCTS: `${serverURL}/all-products`,
};
export default apiUrls;
