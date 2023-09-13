// package imports
import React , {useState} from "react";
import { Route, Routes, NavLink, HashRouter } from "react-router-dom";

// user imports
import "./App.css";
import Balances from "./components/pages/Balances";
import Assets from "./components/pages/Assets";
import IncomeExpense from "./components/pages/IncomeExpense";
import Stats from "./components/pages/Stats";
import Edit from "./components/pages/Edit";
import AddTrans from "./components/pages/AddTrans";
import Button from "./components/uiComponents/Button";

// electron imports
import { channels } from './shared/constants';
const { ipcRenderer } = window.require('electron');

const App = () => {

  const [trigger, setTrigger] = useState(false);
  const [reset, setReset] = useState(true);

  const resetApp = () => {
    setReset(!reset);
    // setTrigger(false);
  }

  const closeWindow = () => {
    ipcRenderer.send(channels.CLOSE_WINDOW);
  }

  const minWindow = () => {
    ipcRenderer.send(channels.MIN_WINDOW);
  }

  const addTransRoute = () => {
    setTrigger(true);
  }
  
  const exitTransRoute = () => {
    setTrigger(false);
  }

  return (
    <HashRouter>
      <div className="app-container">

        <div className="heading">
          <h1>Multi-Finance</h1>
          <div className="exitButtons">
            <Button onClick={minWindow} buttonStyle="menuBar" hoverStyle="grayHover"><i className="fas fa-window-minimize"></i></Button>
            <Button onClick={closeWindow} buttonStyle="menuBar" hoverStyle="redHover"><i className="fas fa-times"></i></Button>
          </div>

        </div>

        <div className="navbar">
          <ul>
            <li>
              <NavLink to="/">Balances</NavLink>
            </li>
            <li>
              <NavLink to="/assets">Assets</NavLink>
            </li>
            <li>
              <NavLink to="/incexp">Income & Expenses</NavLink>
            </li>
            <li>
              <NavLink to="/stats">Statistics</NavLink>
            </li>
            <li>
              <NavLink to="/edit">Edit</NavLink>
            </li>
            <li className="navbar_reserved">
            </li>
          </ul>
        </div>
        
        <Button onClick={addTransRoute} buttonStyle="floatAct" hoverStyle="whiteHover"><i className="fa fa-plus fa-2x" aria-hidden="true"></i></Button>

        <AddTrans reset={resetApp} exitPopup={exitTransRoute} trigger={trigger} />

        <div className="content">
          <Routes>
            <Route exact path="/" element={<Balances/>} />
            <Route exact path="/assets" element={<Assets/>} />
            <Route exact path="/incexp" element={<IncomeExpense/>} />
            <Route exact path="/stats" element={<Stats/>} />
            <Route exact path="/edit" element={<Edit/>} />
          </Routes>
        </div>

      </div>
    </HashRouter>
  );
}

export default App;
