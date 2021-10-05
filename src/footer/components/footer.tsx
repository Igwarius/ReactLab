import { AppBar, Toolbar, Container, Typography } from "@material-ui/core";
import imgEA from "images/EA.png";
import imgBethesda from "images/Bethesda.png";
import imgCDP from "images/CDP.png";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    top: "auto",
    bottom: 0,
  },
});
const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar color="primary" className={classes.root}>
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            Incredible convenient
            <a style={{ margin: 5 }} href="https://www.ea.com/ru-ru">
              <img src={imgEA} width="50" height="50" alt="EA" />
            </a>
            <a style={{ margin: 5 }} href="https://bethesda.net/ru/dashboard">
              <img src={imgBethesda} width="80" height="30" alt="Bethesda" />
            </a>
            <a style={{ margin: 5 }} href="https://en.cdprojektred.com/">
              <img src={imgCDP} width="80" height="50" alt="Bethesda" />
            </a>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Footer;
