const serverURL = "http://localhost:8079";
const urls = {
  PRODUCTS: "/products",
  MAIN: "/",
  ABOUT: "/about",
  GET_THREE_GAMES: `${serverURL}/top-three-games`,
  GET_GAME_BY_NAME: `${serverURL}/game-by-name`,
  LOG_IN: `${serverURL}/log-in`,
  REGISTRATION: `${serverURL}/registration`,
  PROFILE: "/profile",
  GET_PROFILE: `${serverURL}/profile-info`,
  CHANGE_PASSWORD: `${serverURL}/change-password`,
  SAVE_PROFILE: `${serverURL}/save-profile`,
};
export default urls;
