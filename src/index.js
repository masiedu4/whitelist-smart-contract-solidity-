/**
    * @description      : 
    * @author           : Michael
    * @group            : 
    * @created          : 13/04/2022 - 17:02:00
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/04/2022
    * - Author          : Michael
    * - Modification    : 
**/
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
