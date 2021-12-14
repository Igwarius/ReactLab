import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { RadioGroup, FormControlLabel, Radio, FormLabel, MenuItem, Select, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import Pc from "@/components/pc/Pc";
import Xbox from "@/components/xbox/Xbox";
import Ps from "@/components/ps/Ps";
import urls from "@/constants/urls";
import { GameAge, GameGener } from "@/constants/globalConstants";
import { getProducts } from "@/redux/thunks/gameThunks";
import { IGame } from "@/types";
import GameCard from "../game-card/GameCard";
import { getProductsSelector } from "@/redux/selectors/gameSelectors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  filter: {
    marginRight: "50px",
  },
  games: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const Products = () => {
  const genreDefault = "All";
  const ageDefault = "All";
  const typeDefault = "asc";
  const classes = useStyles();
  const [name, setGameName] = useState("");
  const [genre, setGenre] = useState(genreDefault);
  const [age, setAge] = useState(ageDefault);
  const [param, setParam] = useState("");
  const [type, setType] = useState(typeDefault);
  const [platform, setPlatform] = useState("");
  const dispatch = useDispatch();

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGenre(event.target.value);
  };
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(event.target.value);
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };
  const handleParamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParam(event.target.value);
  };

  const debounceDelay = 300;
  const games: IGame[] = useSelector(getProductsSelector);

  const debounced = useDebouncedCallback((value: string) => {
    if (value.length >= 3 || value.length === 0) {
      const params = { genre, age, param, type, name, platform };
      dispatch(getProducts(params));
    }
  }, debounceDelay);

  const onInputChange = (value: string) => {
    setGameName(value);
    debounced(value);
  };
  useEffect(() => {
    if (window.location.href.includes("pc")) {
      setPlatform("pc");
    } else if (window.location.href.includes("ps")) {
      setPlatform("ps");
    } else if (window.location.href.includes("xbox")) {
      setPlatform("xbox");
    } else {
      setPlatform("");
    }

    const params = { genre, age, param, type, name, platform };
    dispatch(getProducts(params));
  }, [window.location.href]);
  useEffect(() => {
    const params = { genre, age, param, type, name, platform };
    dispatch(getProducts(params));
  }, [genre, age, param, type, platform]);

  return (
    <div className={classes.root}>
      <div className={classes.filter}>
        <FormLabel component="legend">Type</FormLabel>
        <Select defaultValue={typeDefault} label="Type" onChange={handleTypeChange}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
        <Select defaultValue="" label="param" onChange={handleParamChange}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="raiting">Raitng</MenuItem>
          <MenuItem value="price">Price</MenuItem>
        </Select>
        <FormLabel component="legend">Gener</FormLabel>
        <RadioGroup
          defaultValue={genreDefault}
          onChange={handleGenreChange}
          aria-label="genre"
          name="radio-buttons-group"
        >
          {GameGener.map((element) => (
            <FormControlLabel value={element.value} control={<Radio />} label={element.lable} />
          ))}
        </RadioGroup>
        <FormLabel component="legend">Age</FormLabel>
        <RadioGroup defaultValue={ageDefault} onChange={handleAgeChange} aria-label="age" name="radio-buttons-group">
          {GameAge.map((element) => (
            <FormControlLabel value={element} control={<Radio />} label={element} />
          ))}
        </RadioGroup>
        <Switch>
          <Route path={`${urls.PRODUCTS}/pc`} component={Pc} />
          <Route path={`${urls.PRODUCTS}/xbox`} component={Xbox} />
          <Route path={`${urls.PRODUCTS}/ps`} component={Ps} />
        </Switch>
      </div>
      <div>
        <input
          placeholder="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)}
          value={name}
        />
        <div className={classes.games}>
          {games.map((element) => (
            <GameCard {...element} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Products;
