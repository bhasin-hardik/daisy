import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './Layout/Layout';
import Obstruction from './/Obstruction/Obstruction';
import Measure from './/Measure/Measure';
import Cabinet from './/Cabinet/Cabinet';
import Appliance from './/Appliance/Appliance';
import Overview from './Overview/Overview';
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout />} />
                <Route path="/measurements" element={<Measure />} />
                <Route path="/obstruction/:count" element={<Obstruction />} />
                <Route path="/appliance/:count" element={<Appliance />} />
                <Route path="/cabinet" element={<Cabinet />} />
                <Route path="/overview" element={<Overview />} />
            </Routes>
        </AnimatePresence>

  );
};
export default AnimatedRoutes;
