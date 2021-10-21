/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */

import { useDebouncedCallback } from "use-debounce";
import { SetStateAction, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { makeStyles, styled } from "@material-ui/core";

interface iGame {
  name: string;
}
const useStyles = makeStyles({
  input: {
    width: "100%",
  },
});
function Search() {
  const classes = useStyles();

  const Listbox = styled("ul")(({ theme }) => ({
    width: "100%",
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

  const [games, setGemes] = useState<iGame[]>([]);
  // Debounce callback

  const debounced = useDebouncedCallback(
    // eslint-disable-next-line no-shadow
    async (value: SetStateAction<string>) => {
      const response: AxiosResponse<Array<iGame>> = await axios.get(`http://localhost:8079/gameByName?name=${value}`);

      setGemes(response.data);
    },
    // delay in ms
    300
  );
  console.log(games);
  console.log(games.length);

  return (
    <div>
      <input className={classes.input} defaultValue="" onChange={(e) => debounced(e.target.value)} />

      {games && games.length ? (
        <Listbox>
          {games.map((element) => (
            <div onClick={() => onClickGameShow(element.name)}> {element.name}</div>
          ))}
        </Listbox>
      ) : null}
    </div>
  );
}
export default Search;
