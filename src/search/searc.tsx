/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */

import { useDebouncedCallback } from "use-debounce";
import { SetStateAction, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { makeStyles, styled } from "@material-ui/core";

interface IGame {
  id: number;
  name: string;
  img: string;
  price: number;
  rating: number;
  date: Date;
}
const useStyles = makeStyles({
  input: {
    width: "300px",
    boxSizing: "border-box",
  },
  root: {
    boxSizing: "border-box",
  },
});
function Search() {
  const classes = useStyles();

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

  const onClickGameShow = (name: string) => {
    alert(name);
  };

  const [games, setGemes] = useState<IGame[]>([]);
  const debounceDelay = 300;
  const debounced = useDebouncedCallback(
    // eslint-disable-next-line no-shadow

    async (value: SetStateAction<string>) => {
      if (value.length >= 3) {
        const response: AxiosResponse<Array<IGame>> = await axios.get(
          `http://localhost:8079/game-by-name?name=${value}`
        );
        setGemes(response.data);
      }
    },
    debounceDelay
  );

  return (
    <div className={classes.root}>
      <input
        placeholder="Search"
        className={classes.input}
        defaultValue=""
        onChange={(e) => debounced(e.target.value)}
      />

      {games && games.length ? (
        <Listbox>
          {games.map((element) => (
            <div key={element.id} onClick={() => onClickGameShow(element.name)}>
              {element.name}
            </div>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}
export default Search;
