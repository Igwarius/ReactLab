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
  ref: {
    margin: 5,
  },
  ea: {
    width: 50,
    height: 50,
  },
  bethesda: {
    width: 80,
    height: 30,
  },
  cdp: {
    width: 80,
    height: 50,
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
            <a className={classes.ref} href="https://www.ea.com/ru-ru">
              <img src={imgEA} className={classes.ea} alt="EA" />
            </a>
            <a className={classes.ref} href="https://bethesda.net/ru/dashboard">
              <img src={imgBethesda} className={classes.bethesda} alt="Bethesda" />
            </a>
            <a className={classes.ref} href="https://en.cdprojektred.com/">
              <img src={imgCDP} className={classes.cdp} alt="CDP" />
            </a>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
