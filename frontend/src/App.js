import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cards from './components/Cards';
import Historystate from './context/Historystate';
import History from './components/History';
function App() {
  return (
    <Historystate>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History/>} />
          <Route path="/bucket/:bucket" element={<Cards />} />
        </Routes>
      </Router>
    </Historystate>
  );
}

export default App;