import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ContextDataProvider from './context/contextData';
import ServicesProvider from './context/services';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextDataProvider>
    <ServicesProvider>
      <App />
    </ServicesProvider>
  </ContextDataProvider>
);

reportWebVitals();
