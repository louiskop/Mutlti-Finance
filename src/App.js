
// package imports
import React, { Component } from 'react';
import { Route, Routes, NavLink, HashRouter } from 'react-router-dom'

// user imports
import './App.css';
import Balances from './components/pages/Balances';
import Assets from './components/pages/Assets';
import IncomeExpense from './components/pages/IncomeExpense';
import Stats from './components/pages/Stats';
import Edit from './components/pages/Edit';
import AddTrans from './components/pages/AddTrans';

class App extends Component {
  
  render(){
    
    return(
      <HashRouter>
      <div>

        <h1>Multi-Finance</h1>

        {/* Automatic class of 'active' assigned to active link */}
        <ul>
          <li><NavLink to="/" >Balances</NavLink></li>
          <li><NavLink to="/assets" >Assets</NavLink></li>
          <li><NavLink to="/incexp" >Income & Expenses</NavLink></li>
          <li><NavLink to="/stats" >Statistics</NavLink></li>
          <li><NavLink to="/edit" >Edit</NavLink></li>
        </ul>

        <div className="content">
          <Routes>
          <Route exact path="/" element={<Balances/>} />
          <Route exact path="/assets" element={<Assets/>} />
          <Route exact path="/incexp" element={<IncomeExpense/>} />
          <Route exact path="/stats" element={<Stats/>} />
          <Route exact path="/edit" element={<Edit/>} />
          <Route exact path="/addTrans" element={<AddTrans/>} />
          </Routes>
        </div>

      </div>
      </HashRouter>
    );

  }

}


export default App;
