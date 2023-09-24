import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'tailwindcss/tailwind.css';

import { LayoutProvider } from '../../daisy/src/components/Layout/LayoutContext.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LayoutProvider>
      <App />
    </LayoutProvider>
   
  </React.StrictMode>
)
