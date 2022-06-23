/*
Custom hook implemented
*/
import React, { useState } from "react";
import "./App.css";
import Car from "./components/cars";
import useList from "./hooks/useList";

const initialState = [
  { name: "benz", rpm: 10000 },
  { name: "audi", rpm: 5000 },
  { name: "mahindra", rpm: 3000 },
];

function App() {
  //state  //react hooks allows to use multiple states in one component which is advantage over class components//
  const items = useList(initialState);
  const [editable, setEditable] = useState(false);

  //handles
  const removeLowHandle = () => {
    items.removeParent();
  };

  //using SyntheticEvent of js
  const removeInChildHandle = (e) => {
    // console.log("child comp button click");
    // console.dir(e.target.name);
    items.removeChild(e.target.name);
    // const filtered_list = list.filter((v) => {
    //   return v.name !== e.target.name;
    // });
    // setList(filtered_list);    
  };

  const makeEditableHandle = () => {
    setEditable(true);
  };

  const keyPressHandle = (e, i) => {
    // console.dir(e.key) // to get the key details
    if (e.key === "Enter") {
      // console.log("Enter key pressed");
      // console.log(i)
      setEditable(false);
      items.saveItem(i,e.target.value)
      // const copyList = [...list];
      // copyList[i].name = e.target.value;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Car List</h2>
        {items.list.map((v, k) => {
          return (
            <Car
              key={`${k}${v.name}${v.rpm}`}
              value={v}
              onClick={removeInChildHandle}
              editable={editable}
              onDoubleClick={makeEditableHandle}
              onKeyPress={keyPressHandle}
              index={k}
            ></Car>
          );
        })}
        <button onClick={removeLowHandle} className="remove-button">
          Remove low RPM
        </button>
      </header>
    </div>
  );
}

export default App;
