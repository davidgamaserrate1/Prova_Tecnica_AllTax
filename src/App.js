import React from "react";
import ChartComponent from "./components/Chart";
import Header from "./components/Header";
 
const App =()=>{

  return (
    <>
      <Header>
        <div>Sales Report</div>
      </Header>
      <ChartComponent/>
    </>
  );
}
 

export default App;
