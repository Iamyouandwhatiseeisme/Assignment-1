import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from "./components/pages/About/About.js";
import Contact from './components/pages/Contact.js';
import Welcome  from './components/pages/Welcome.js';


function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element=<Welcome /> />
            <Route path="/about" element=<About /> />
            <Route path="/contact" element=<Contact /> />
          </Routes>
        </div>
     
    </Router>
  );
}

export default App;
