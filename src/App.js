import { useEffect, useReducer, useRef, useState } from "react";
import "./styles.css";
import "./App.css";
import Button from "./components/Button";
import Puzzle from "./components/Puzzle";
/**
 *
 * @author King Lazarus
 * @version 1.0.0
 * @returns {Component} 8 Puzzle
 */

function App() {
  const initialState = {
    temp: [],
    rand: []
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "random":
        return {
          ...state,
          rand: action.payload,
          shuffled: [...action.payload]
          // temp:[...action.payload]
        };
      case "update":
        return {
          ...state,
          rand: action.payload
        };
      default:
        return { ...state, temp: state.rand };
      // break;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // const data = Array.from(Array(9).keys());
  const [randomData, setRandomData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(true);
  const [mount, setMount] = useState(false);

  let Ref = useRef(null);

  const restartHandler = () => {
    setStart(true);
    setCount(0);
    let random = shuffleArray();
    setRandomData(random);
    setTempData(random);
  };
  const resetHandler = () => {
    setCount(0);
    setRandomData(tempData);
    // setRandomData([
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8]
    // ]);
  };

  // useEffect(() => {
  //   // setTempData(randomData);
  //   // dispatch({type:""})

  // }, [randomData])

  /**@description Shuffles an array*/
  const shuffleArray = () => {
    const array = Array.from(Array(9).keys());
    // console.debug(start);
    // const array = [...data];
    let userData = [];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    for (let i = 0; i < array.length; i += 3) {
      // console.log(array.slice(i, i + 3));
      userData.push(array.slice(i, i + 3));
    }
    // setRandomData(userData);
    // setTempData(userData);
    // dispatch({type:"random",payload:userData})
    return userData;
  };
  useEffect(() => {
    const startGame = () => {
      setStart(true);
      setMount(true);
      let random = shuffleArray();
      setRandomData(random);
      setTempData(random);
      dispatch({ type: "random", payload: random });
    };
    startGame();
    return () => {};
  }, []);

  if (!start) {
    // console.info(randomData, data, start);
    console.debug(state);
    console.debug(randomData.toString() === tempData.toString());
  }

  // const cbRef = useRef(moveTile);

  useEffect(() => {
    // cbRef.current = moveTile;
    Ref.current = randomData;
  });

  useEffect(() => {
    // const cb = cbRef.current;
    function moveTile() {
      // console.table(Ref.current);
      // let a = Ref.current;
      // const array = Array.from(Array(9).keys());
      // console.log(this);
      // let userData = [...Ref.current];
      let userData = [];
      let array = Array.from(
        document.querySelector(".puzzle").textContent,
        (x) => Number(x)
      );
      for (let i = 0; i < array.length; i += 3) {
        // console.log(array.slice(i, i + 3));
        userData.push(array.slice(i, i + 3));
      }
      // let userData = [...Ref.current];
      console.log(userData, this.innerText);
      let x, y;
      for (let i in userData) {
        if (userData[i].includes(Number(this.innerText))) {
          // console.log(i, userData[i].indexOf(Number(this.innerText)));
          x = Number(i);
          y = userData[i].indexOf(Number(this.innerText));
          break;
        }
      }
      // try {
      if (Object.hasOwn(userData, x - 1) && userData[x - 1][y] === 0) {
        // top
        console.debug("top");
        [userData[x - 1][y], userData[x][y]] = [
          userData[x][y],
          userData[x - 1][y]
        ];
      } else if (Object.hasOwn(userData, x + 1) && userData[x + 1][y] === 0) {
        // bottom
        console.debug("bottom");
        [userData[x + 1][y], userData[x][y]] = [
          userData[x][y],
          userData[x + 1][y]
        ];
      } else if (Object.hasOwn(userData, x) && userData[x][y - 1] === 0) {
        // left
        console.debug("left");
        [userData[x][y - 1], userData[x][y]] = [
          userData[x][y],
          userData[x][y - 1]
        ];
      } else if (Object.hasOwn(userData, x) && userData[x][y + 1] === 0) {
        // right
        console.debug("right");
        [userData[x][y + 1], userData[x][y]] = [
          userData[x][y],
          userData[x][y + 1]
        ];
      } else {
        return;
      }
      setCount((count) => count + 1);
      setRandomData(userData);
      dispatch({ type: "" });
    }
    function setEvents() {
      let piece = document.querySelectorAll(".piece");
      piece.forEach((item) => {
        if (item.className !== "piece _") {
          item.addEventListener("click", moveTile);
          console.debug("listener attached");
        }
      });
    }
    function removeEvents() {
      let piece = document.querySelectorAll(".piece");
      piece.forEach((item) => {
        if (item.className !== "piece _") {
          item.removeEventListener("click", moveTile);
          console.debug("listener removed");
        }
      });
    }

    if (mount) {
      setEvents();
      // setMount(false);
      // } else {
      // removeEvents();
      console.debug("Else remove");
      // setMount(false);
    }
    console.debug("Mounted second one");
    // setMount(true)
    return () => {
      removeEvents();
      // }
    };
  }, [mount]);
  // function _moveTile(params) {
  //   console.log("I clicked a button");
  // }
  console.table(randomData);
  console.log("------------");
  console.table(tempData);
  if (tempData.flat().every((v, i) => v === randomData.flat()[i])) {
    console.log("Equal!!!");
  }
  // function hey() {
  //   setRandomData([
  //     [1, 2, 5],
  //     [3, 4, 7],
  //     [8, 9, 0]
  //   ]);
  // }
  return (
    <div className="App">
      <div className="centered-puzzle">
        {randomData}
        <br />
        {tempData}
        <div className="options">
          {count}
          {mount && <Button name="Restart" func={restartHandler} />}
          {mount && <Button name="Reset" func={resetHandler} />}
        </div>
        <Puzzle data={randomData} />
      </div>
    </div>
  );
}

export default App;
