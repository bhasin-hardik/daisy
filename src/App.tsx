import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Obstruction from './components/Obstruction/Obstruction';
import Measure from './components/Measure/Measure';
import Cabinet from './components/Cabinet/Cabinet';



import Appliance from './components/Appliance/Appliance';

import Overview from './components/Overview/Overview';



const App: React.FC = () => {
 

  return (
    <Router>
      
        
          
              
                <div>
                  <Navbar />
                  <Routes>
                  
                    <Route path="/" element={<Layout />} />
                    <Route path="/measurements" element={<Measure />} />
                    <Route path="/obstruction/:count" element={<Obstruction />} />
                    <Route path="/appliance/:count" element={<Appliance />} />
                    <Route path="/cabinet" element={<Cabinet />} />
                    <Route path="/overview" element={<Overview />} />
                  </Routes>
                </div>
              
          
        
      
    </Router>
  );
};

export default App;
