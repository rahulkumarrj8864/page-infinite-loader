import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import InfiniteScrollingFrontendHacks from './InfiniteScrollingFrontendHacks';
import 'bootstrap/dist/css/bootstrap.min.css'
import GridComponent from './GridComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <GridComponent /> */}
    <InfiniteScrollingFrontendHacks/>
  </React.StrictMode>
);
