
import { Routes, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Aos from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react'

import Homepage from './pages/Homepage.jsx'
import Login from './pages/AuthPages/Login.jsx'
import Register from './pages/AuthPages/Register.jsx'
import ForgotPassword from './pages/AuthPages/ForgotPassword.jsx'
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
import SessionManager from './components/SessionManager.jsx';
import FAQPage from './pages/Faq.jsx';
import CreateWatchlist from './pages/DashboardPages/CreateWatchlist.jsx';
import OurBlogs from './pages/Blogs/OurBlogs.jsx';
import PrivacyPolicy from './pages/OtherPages/PrivacyPolicy.jsx';
import TermsAndConditions from './pages/OtherPages/TermsAndConditions.jsx';
import BlogSingle from './pages/Blogs/BlogSingle.jsx';

// import { Tooltip, Dropdown } from 'bootstrap';



const App = () => {

  useEffect(() => {
    Aos.init({
      duration: 1000, // animation duration
      // once: true,     // whether animation should happen only once
    });
  }, []);

  useEffect(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl)
  );
}, []);



// useEffect(() => {
//   const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
//   tooltipTriggerList.forEach(el => new Tooltip(el));

//   // This will enable dropdowns
//   const dropdownElementList = document.querySelectorAll('[data-bs-toggle="dropdown"]');
//   dropdownElementList.forEach(el => new Dropdown(el));
// }, []);






  return (
    <>
     <ScrollToTop />
     <ScrollToTopButton />
     {/* <SessionManager /> */}
     <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute> } />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute> } />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

          <Route path="/" element={<Homepage /> } />
          <Route path="/search-homes" element={<SearchHome /> } />
          <Route path="/property-single" element={<PropertySingle /> } />
          <Route path="/about" element={<About /> } />
          <Route path="/contact" element={<Contact /> } />
          <Route path="/agency" element={<Agency /> } />
          <Route path="/agency-single" element={<AgencySingle /> } />
          <Route path="/agent-single" element={<AgentSingle /> } />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/faq" element={<FAQPage/>} />
          <Route path="/blogs" element={<OurBlogs/>} />
          <Route path="/blog/:slug" element={<BlogSingle/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />


          <Route path="*" element={<PageNotFound /> } />


          {/* Dashboard Routes */}

          <Route path="/my-account" element={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
          <Route path="/saved-listings" element={<ProtectedRoute> <SavedListings /></ProtectedRoute>} />
          <Route path="/watchlist" element={<ProtectedRoute> <CreateWatchlist /></ProtectedRoute>} />
          <Route path="/watchlist/:slug" element={<ProtectedRoute> <WatchlistPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />
          <Route path="/saved-searches" element={<ProtectedRoute> <SavedSearches /></ProtectedRoute>} />
          <Route path="/inspections" element={<UserInspections />} />
          <Route path="/contact-agents" element={<ProtectedRoute> <ContactAgents /></ProtectedRoute>} />
          <Route path="/my-alerts" element={<ProtectedRoute> <MyAlerts /></ProtectedRoute>} />

        </Routes>
    

    </>
  )
}

export default App