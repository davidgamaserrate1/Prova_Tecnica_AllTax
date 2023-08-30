import React from "react";
import ChartComponent from "./components/Chart";
import Header from "./components/Header";
 
const App =()=>{

  return (
    <>
      <Header>
        <h1>Sales Report</h1>
      </Header>
      <ChartComponent/>
    </>
  );
}
 

export default App;
