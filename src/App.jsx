import { Routes, Route, useLocation } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import Homepage from './pages/Homepage.jsx';
import Login from './pages/AuthPages/Login.jsx';
import Register from './pages/AuthPages/Register.jsx';
import ForgotPassword from './pages/AuthPages/ForgotPassword.jsx';
import ResetPassword from './pages/AuthPages/ResetPassword.jsx';
import SearchHome from './pages/SearchPages/SearchHome.jsx';
import PropertySingle from './pages/SinglePage/PropertySingle.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import PageNotFound from './pages/OtherPages/PageNotFound.jsx';
import ScrollToTopButton from './components/ScrollToTopButton.jsx';
import Dashboard from './pages/DashboardPages/Dashboard.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import Agency from './pages/Agency.jsx';
import AgencySingle from './pages/AgencySingle.jsx';
import AgentSingle from './pages/AgentSingle.jsx';
import PricingPage from './pages/PricingPage.jsx';
import SavedListings from './pages/DashboardPages/SavedListings.jsx';
import WatchlistPage from './pages/DashboardPages/WatchlistPage.jsx';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Profile from './pages/DashboardPages/Profile.jsx';
import ContactAgents from './pages/DashboardPages/ContactAgents.jsx';
import UserInspections from './pages/DashboardPages/UserInspections.jsx';
import SavedSearches from './pages/DashboardPages/SavedSearches.jsx';
import MyAlerts from './pages/DashboardPages/MyAlerts.jsx';
import FAQPage from './pages/Faq.jsx';
import CreateWatchlist from './pages/DashboardPages/CreateWatchlist.jsx';
import OurBlogs from './pages/Blogs/OurBlogs.jsx';
import PrivacyPolicy from './pages/OtherPages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/OtherPages/TermsAndConditions.jsx';
import BlogSingle from './pages/Blogs/BlogSingle.jsx';
import MortgageCalculator from './components/MortgageCalculator.jsx';
import Agents from './pages/Agents.jsx';
import SellPropertyPage from './pages/SellProperty.jsx';
import HelpPage from './pages/HelpPage.jsx';


const App = () => {
  const location = useLocation();

  // Initialize AOS
  useEffect(() => {
    Aos.init({
      duration: 1000, // animation duration
      // once: true,
    });
  }, []);

  // Reinitialize Bootstrap tooltips on route change

  // useEffect(() => {
  //   // Prevent running if Bootstrap not loaded
  //   if (!window.bootstrap || !window.bootstrap.Tooltip) {
  //     console.warn('Bootstrap Tooltip not found. Make sure bootstrap.bundle.min.js is loaded.');
  //     return;
  //   }

  //   // Select all tooltip elements
  //   const tooltipElList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

  //   // Dispose of existing tooltips to prevent duplicates
  //   tooltipElList.forEach(el => {
  //     const tooltipInstance = window.bootstrap.Tooltip.getInstance(el);
  //     if (tooltipInstance) {
  //       tooltipInstance.dispose();
  //     }
  //   });

  //   // Initialize new tooltips
  //   tooltipElList.forEach(el => {
  //     new window.bootstrap.Tooltip(el);
  //   });
  // }, [location.pathname]);

  // useEffect(() => {
  //   const tooltipElList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  //   tooltipElList.forEach(el => {
  //     const existing = Tooltip.getInstance(el);
  //     if (existing) existing.dispose();
  //     new Tooltip(el);
  //   });
  // }, [location.pathname]);



  return (
    <>
      <ScrollToTop />
      <ScrollToTopButton />
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

        {/* Public Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homes" element={<SearchHome />} />
        <Route path="/property/:slug" element={<PropertySingle />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/agency" element={<Agency />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/agency-single/:slug" element={<AgencySingle />} />
        <Route path="/agent-single/:slug" element={<AgentSingle />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blogs" element={<OurBlogs />} />
        <Route path="/blog/:slug" element={<BlogSingle />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />


        <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
        <Route path="/sell" element={<SellPropertyPage />} />
        <Route path="/help" element={<HelpPage />} />

        
        {/* Dashboard (Protected) */}
        <Route path="/my-account" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/saved-listings" element={<ProtectedRoute><SavedListings /></ProtectedRoute>} />
        <Route path="/watchlist" element={<ProtectedRoute><CreateWatchlist /></ProtectedRoute>} />
        <Route path="/watchlist/:slug" element={<ProtectedRoute><WatchlistPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/saved-searches" element={<ProtectedRoute><SavedSearches /></ProtectedRoute>} />
        <Route path="/inspections" element={<UserInspections />} />
        <Route path="/contact-agents" element={<ProtectedRoute><ContactAgents /></ProtectedRoute>} />
        <Route path="/my-alerts" element={<ProtectedRoute><MyAlerts /></ProtectedRoute>} />

        {/* 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
