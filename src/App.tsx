import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

import AnimatedRoutes from './components/AnimatedRoutes';
const App: React.FC = () => {
  
  return (
    <Router>
      <div>
        <Navbar />
       
      </div>
      <AnimatedRoutes />




    </Router>
  );
};

export default App;
