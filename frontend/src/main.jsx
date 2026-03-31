import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';
import store from './store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-left"
          toastOptions={{
            duration: 2800,
            style: {
              borderRadius: '18px',
              background: '#0f172a',
              color: '#f8fafc',
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
