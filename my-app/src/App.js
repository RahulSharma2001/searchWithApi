import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = React.useState([]);
  const [absoluteData, setAbsoluteData] = useState([]);
  const options = {
    method: "GET",
    url: "https://exercisedb.p.rapidapi.com/exercises/bodyPart/back",
    params: { limit: "10" },
    headers: {
      "X-RapidAPI-Key": "43a63efb70msh4a77d3947ed878bp15e4b9jsn6cc6f0370345",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.request(options);
      setData(response.data);
      setAbsoluteData(response.data);
    }
    fetchData();
  }, []);

  function filterItems(event) {
    let filterData = absoluteData.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setData(filterData);
    console.log(filterData);
  }

  return (
    <div className="App">
      <div style={{ width: "100%", textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search Health exercise by NAME"
          style={{ width: "250px", height: "50px" }}
          onChange={(event) => filterItems(event)}
        ></input>
        <hr></hr>
      </div>
      {data.length > 0 &&
        data.map((e) => {
          return (
            <div
              key={e.id}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "30%",
                textAlign: "center",
              }}
            >
              <div>{e.name}</div>
              <img src={e.gifUrl} alt={e.name} />
            </div>
          );
        })}
    </div>
  );
}

export default App;
