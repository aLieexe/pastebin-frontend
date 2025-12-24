import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import PastePage from './pages/PastePage';
import CreatePage from './pages/CreatePage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app">
                <header className="header">
                    <h1>Pastebin</h1>
                    <Navigation />
                </header>
                <main className="mainContent">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<CreatePage />} />
                        <Route path="/paste/:id" element={<PastePage />} />
                    </Routes>
                </main>
                <footer className="footer">
                    <p>© 2025 Pastebin App</p>
                </footer>
            </div>
        </Router>
    );
};

export default App;