import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Obstruction from './components/Obstruction/Obstruction';
import Measure from './components/Measure/Measure';
import { LayoutProvider } from './components/Layout/LayoutContext';
import { MeasureProvider } from './components/Measure/measureContext';
import { ObstructionProvider } from './components/Obstruction/ObstructionContext';

import Appliance from './components/Appliance/Appliance';
import Cabinets from './components/Cabinets/Cabinets';
import Overview from './components/Overview/Overview';
import { ApplianceProvider } from './components/Appliance/ApplianceContext';
import { CabinetsProvider } from './components/Cabinets/CabinetsContext';

const App: React.FC = () => {

  return (
    <Router>
      <LayoutProvider>
        <MeasureProvider >
          <ObstructionProvider > {/* Wrap Obstruction with ObstructionProvider */}
            <ApplianceProvider>
              <CabinetsProvider>
                <div>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Layout />} />
                    <Route path="/measurements" element={<Measure />} />
                    <Route path="/obstruction/:count" element={<Obstruction />} />
                    <Route path="/appliance/:count" element={<Appliance />} />
                    <Route path="/cabinet" element={<Cabinets />} />
                    <Route path="/overview" element={<Overview />} />
                  </Routes>
                </div>
              </CabinetsProvider>
            </ApplianceProvider>
          </ObstructionProvider>
        </MeasureProvider>
      </LayoutProvider>
    </Router>
  );
};

export default App;
