// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Obstruction from './components/Obstruction/Obstruction';
import Measure from './components/Measure/Measure';
import { LayoutProvider } from './components/Layout/LayoutContext';
import Appliance from './components/Appliance/Appliance';
import Cabinets from './components/Cabinets/Cabinets';

const App: React.FC = () => {
  return (
    <Router>
      <LayoutProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/measurements" element={<Measure />} />
            <Route path="/obstruction/:count" element={<Obstruction />} />
            <Route path="/appliance/:count" element={<Appliance />} />
            <Route path="/cabinet" element={<Cabinets />} />
          </Routes>
        </div>
      </LayoutProvider>
    </Router>
  );
};

export default App;
