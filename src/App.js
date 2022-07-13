// package imports
import React, { Component } from "react";
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
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";
const { ipcRenderer } = window.require('electron');

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      trigger : false,
    };
  }

  closeWindow() {
    ipcRenderer.send(channels.CLOSE_WINDOW);
  }

  minWindow() {
    ipcRenderer.send(channels.MIN_WINDOW);
  }

  addTransRoute = () => {
    this.setState({trigger:true});
    console.log(`HOS ${this.state.trigger}`);
  }
  
  exitTransRoute = () => {
    this.setState({trigger:false});
  }

  render() {
    return (
      <HashRouter>
        <div className="app-container">

          <div className="heading">
            <h1>Multi-Finance</h1>
            <div className="exitButtons">
              <Button onClick={this.minWindow} buttonStyle="menuBar" hoverStyle="grayHover"><i className="fas fa-window-minimize"></i></Button>
              <Button onClick={this.closeWindow} buttonStyle="menuBar" hoverStyle="redHover"><i className="fas fa-times"></i></Button>
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
          
          <Button onClick={this.addTransRoute} buttonStyle="floatAct" hoverStyle="whiteHover"><i className="fa fa-plus fa-2x" aria-hidden="true"></i></Button>

          <AddTrans exitPopup={this.exitTransRoute} trigger={this.state.trigger} />

          <div className="content">
            <Routes>
              <Route exact path="/" element={<Balances />} />
              <Route exact path="/assets" element={<Assets />} />
              <Route exact path="/incexp" element={<IncomeExpense />} />
              <Route exact path="/stats" element={<Stats />} />
              <Route exact path="/edit" element={<Edit />} />
            </Routes>
          </div>

        </div>
      </HashRouter>
    );
  }
}

export default App;
