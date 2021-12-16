import React, { useEffect, useState } from "react";
import { RadioGroup, FormControlLabel, Radio, FormLabel, MenuItem, Select, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { debounceDelay, GameAge, GameGeners, Platform } from "@/constants/globalConstants";
import { getProducts } from "@/redux/thunks/gameThunks";
import { IGame } from "@/types";
import GameCard from "../game-card/GameCard";
import { getThreeGamesSelector } from "@/redux/selectors/gameSelectors";

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
  const platformDefault = "All";
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
  const handlePlatformChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlatform(event.target.value);
  };

  const games: IGame[] = useSelector(getThreeGamesSelector);

  const debounced = useDebouncedCallback((value: string) => {
    if (!value.length || value.length >= 3) {
      const params = { genre, age, param, type, name, platform };
      dispatch(getProducts(params));
    }
  }, debounceDelay);

  const onInputChange = (value: string) => {
    setGameName(value);
    debounced(value);
  };

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
          {GameGeners.map((element) => (
            <FormControlLabel value={element.value} control={<Radio />} label={element.lable} />
          ))}
        </RadioGroup>
        <FormLabel component="legend">Platform</FormLabel>
        <RadioGroup
          defaultValue={platformDefault}
          onChange={handlePlatformChange}
          aria-label="platform"
          name="radio-buttons-group"
        >
          {Platform.map((element) => (
            <FormControlLabel value={element} control={<Radio />} label={element} />
          ))}
        </RadioGroup>
        <FormLabel component="legend">Age</FormLabel>
        <RadioGroup defaultValue={ageDefault} onChange={handleAgeChange} aria-label="age" name="radio-buttons-group">
          {GameAge.map((element) => (
            <FormControlLabel value={element} control={<Radio />} label={element} />
          ))}
        </RadioGroup>
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
