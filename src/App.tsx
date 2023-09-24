// src/App.tsx
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Obstruction from './components/Obstruction/Obstruction';
import { Routes, Route } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      
      
       <Layout/>
      <Obstruction/>
       
      

    </div>
  );
};

export default App;
