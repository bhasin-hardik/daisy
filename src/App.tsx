// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';

import Measure from './components/Measure/Measure';
import { LayoutProvider } from './components/Layout/LayoutContext';

const App: React.FC = () => {
  return (
    <Router>
      <LayoutProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/measurements" element={<Measure />} />
          </Routes>
        </div>
      </LayoutProvider>
    </Router>
  );
};

export default App;
