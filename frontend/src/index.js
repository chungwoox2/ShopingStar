import React from 'react';
import { createRoot } from 'react-dom/client'; // 변경된 부분
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(<App />);
