import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/UserContextProvider';
import { BrowserRouter as Router } from "react-router-dom";
import LoadingPage from './components/LoadingPage';
import ScrollToTop from './components/ScrollToTop'
import Footer from './pages/Footer';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Router>
        <UserContextProvider>
            <ScrollToTop />
            <LoadingPage />
            <App />
        </UserContextProvider>
    </Router>
)

