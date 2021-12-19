import React from "react";
import Main from "./components/Main"
import { BrowserRouter } from "react-router-dom";
import "./App.css";

const App = () => {
  return(
    <React.Fragment>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    
    </React.Fragment>
  
  );
}

export default App;
