import { useDebouncedCallback } from "use-debounce";
import React, { SetStateAction, useState } from "react";
import { makeStyles, styled } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { IGame } from "@/types";
import { getSearchGames } from "@/Redux/reducer";

const useStyles = makeStyles({
  input: {
    width: "300px",
    boxSizing: "border-box",
  },
  root: {
    boxSizing: "border-box",
  },
});

interface IToolkit {
  toolkit: {
    searchGames: IGame[];
  };
}

const Listbox = styled("ul")(({ theme }) => ({
  width: "300px",
  color: "black",
  boxSizing: "border-box",
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: theme.palette.background.paper,
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  '& li[data-focus="true"]': {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
}));

const Search = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const onClickGameShow = (name: string) => {
    alert(name);
  };

  const [gameName, setGameName] = useState<string>("");
  const debounceDelay = 300;
  const games = useSelector((state: IToolkit) => state.toolkit.searchGames);

  const debounced = useDebouncedCallback(async (value: SetStateAction<string>) => {
    console.log(value);
    if (value.length >= 3) {
      console.log(dispatch(getSearchGames(value)));
      await dispatch(getSearchGames(value));
    }
  }, debounceDelay);

  const onInputChange = (value: string) => {
    setGameName(value);
    debounced(value);
  };

  return (
    <div className={classes.root}>
      <input
        placeholder="Search"
        className={classes.input}
        defaultValue=""
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value)}
        value={gameName}
      />
      {games && games.length ? (
        <Listbox>
          {games.map((element) => (
            <div
              key={element.id}
              onClick={() => onClickGameShow(element.name)}
              onKeyDown={() => onClickGameShow(element.name)}
              role="menuitem"
              tabIndex={element.id}
            >
              {element.name}
            </div>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
};

export default Search;
