import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import MagazinePage from './pages/MagazinePage';
import SubmitPage from './pages/SubmitPage';
import AdminPage from './pages/AdminPage';
import ArticlePage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/"         element={<LandingPage />} />
        <Route path="/read"     element={<MagazinePage />} />
        <Route path="/submit"   element={<SubmitPage />} />
        <Route path="/admin"    element={<AdminPage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
