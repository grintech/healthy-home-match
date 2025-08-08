import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();

    const { user, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);


    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    // Session creation function 

    const token = localStorage.getItem("authToken");



    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const shouldLogout = queryParams.get("logout");

        if (shouldLogout) {
            logout();
            const newUrl = location.pathname;
            window.history.replaceState(null, "", newUrl); // optional: clean URL
        }
    }, [location.search]);


    const categories = [
  "Builders",
  "Architects",
  "Building Designer",
  "Energy Consultants",
  "Passivhaus Designers / Certifiers",
  "Green Star",
  "Sustainable high performance builders",
  "Product & Material Suppliers"
];



    return (
        <>
            <header className="main-header">
                <nav className={`navbar  ${isSticky ? 'sticky-nav' : ''}`}>
                    <div className="container">
                        <Link className="navbar-brand me-0" to="/"><img src="/images/healthy_logo.png" alt="logo" /></Link>

                        <div className="d-none d-lg-block">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 d-flex justify-content-between flex-row">
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive("/") ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive("/search-homes") ? "active" : ""}`} to='/search-homes'>Listing</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Categories
                                    </Link>
                                    {/* <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="#">Builders </Link></li>
                                        <li><Link className="dropdown-item" to="#">Architects </Link></li>
                                        <li><Link className="dropdown-item" to="#">Building Designer</Link></li>
                                        <li><Link className="dropdown-item" to="#">Energy Consultants</Link></li>
                                        <li><Link className="dropdown-item" to="#">Energy Consultants</Link></li>
                                        <li><Link className="dropdown-item" to="#">Passivhaus Designers / Certifiers</Link></li>
                                        <li><Link className="dropdown-item" to="#">Green Star</Link></li>
                                        <li><Link className="dropdown-item" to="#">Sustainable high performance builders</Link></li>
                                        <li><Link className="dropdown-item" to="#">Product & Material Suppliers</Link></li>
                                    </ul> */}

                                    <ul className="dropdown-menu">
                                    {categories.map((category, index) => {
                                        const path = `/search-homes?${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`;
                                        return (
                                        <li key={index}>
                                            <Link className="dropdown-item" to={path}>{category}</Link>
                                        </li>
                                        );
                                    })}
                                    </ul>

                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive("/agency") ? "active" : ""}`} to='/agency'>Agencies</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive("/contact") ? "active" : ""}`} aria-disabled="true" to="/contact">Contact Us</Link>

                                </li>
                            </ul>
                        </div>

                        <div className='d-flex align-items-center justify-content-end'>

                            {/* { !user ? (
                                    <div className="d-flex align-items-center">
                                    <Link className={`nav-link ms-1 login_btn ${isActive("/login") ? "active" : ""}`} to="/login"> <i className="fa-regular fa-user-circle"></i> Login
                                    </Link>
                                </div>
                            ) : (
                                    <div className="user_dropdown">
                                    <div className="dropdown">
                                    <button className=" btn-theme rounded-pill dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span className="text-capitalize"> {user.name}</span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link
                                            className="dropdown-item"
                                            to={
                                            user?.role === "4"
                                                ? "/dashboard"
                                                : `http://3.97.143.20:8000/create-session/${token}`
                                            }
                                        >
                                            Dashboard
                                        </Link>
                                        </li>
                                        <li><Link className="dropdown-item" to="#" onClick={logout} >Logout</Link></li>
                                        
                                    </ul>
                                    </div>
                                </div>    
                            )
                            } */}

                            {!user ? (
                                <div className="d-flex align-items-center">
                                    <Link
                                        className={`nav-link ms-1 login_btn ${isActive("/login") ? "active" : ""}`}
                                        to="/login"
                                    >
                                        <i className="fa-regular fa-user-circle"></i> Login
                                    </Link>
                                </div>
                            ) : (
                                <div className="user_dropdown">
                                    <div className="dropdown">
                                        <button
                                            className="btn-theme rounded-pill dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <span className="text-capitalize">{user.name}</span>
                                        </button>

                                        <ul className="dropdown-menu">
                                            {user.role === "4" ? (
                                                <>

                                                    <li>
                                                        <Link className="dropdown-item" to="/my-account">
                                                            <i className="fa fa-gauge me-2"></i> My Account
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link className="dropdown-item" to="/saved-listings">
                                                            <i className="fa fa-heart me-2"></i> Saved Listings
                                                        </Link>
                                                    </li>

                                                    <li>
                                                        <Link className="dropdown-item" to="/watchlist">
                                                            <i className="fa fa-bookmark me-2"></i> Watchlists
                                                        </Link>
                                                    </li>

                                                     <li>
                                                        <Link className="dropdown-item" to="/saved-searches">
                                                            <i className="fa fa-search me-2"></i> Saved Searches
                                                        </Link>
                                                    </li>
                                                     <li>
                                                        <Link className="dropdown-item" to="/contact-agents">
                                                            <i className="fa fa-phone me-2"></i> Contacted Agents
                                                        </Link>
                                                     </li>
                                                     <li>
                                                        <Link className="dropdown-item" to="/inspections">
                                                            <i className="fa fa-house-circle-check me-2"></i> My Inspections
                                                        </Link>
                                                     </li>
                                                     <li>
                                                        <Link className="dropdown-item" to="/my-alerts">
                                                            <i className="fa fa-bell me-2"></i> My Alerts
                                                        </Link>
                                                     </li>


                                                    <li>
                                                        <Link className="dropdown-item" to="/profile">
                                                            <i className="fa fa-user me-2"></i> My Profile
                                                        </Link>
                                                    </li>

                                                    <li><hr className="dropdown-divider" /></li>

                                                    <li>
                                                        <button className="dropdown-item" onClick={() => setShowModal(true)}>
                                                            <i className="fa fa-power-off me-2"></i> Logout
                                                        </button>
                                                    </li>
                                                </>

                                            ) : (
                                                <>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href={`http://3.97.143.20:8000/create-session/${token}`}

                                                        >
                                                            <i className="fa fa-gauge me-2"></i> Dashboard
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <button className="dropdown-item" onClick={logout}>
                                                            <i className="fa fa-power-off me-2"></i> Logout
                                                        </button>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}




                            <div className='d-none d-lg-block'>
                                <Link className="ud-btn btn-white add-property bdrs60 ms-2 ms-xl-3" to="/">Add Property<i className="fa-solid fa-arrow-right-long"></i></Link>
                            </div>


                            <div className="navbar-toggler d-block d-lg-none ms-3">
                                <i className="fa-solid fa-bars   text-white " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation" > </i>
                            </div>
                        </div>

                        <div className="offcanvas offcanvas-end border-0" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-body ">
                                <div className="offcanvas-header py-2">
                                    <h5 className="offcanvas-title fw-bold" id="offcanvasNavbarLabel">Healthy Home Match</h5>

                                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <hr className='my-2' />
                                <ul className="navbar-nav justify-content-end flex-grow-1 p-0">
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive("/") ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive("/search-homes") ? "active" : ""}`} to='/search-homes'>Listing</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Categories
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item" to="#">Builders </Link></li>
                                            <li><Link className="dropdown-item" to="#">Architects </Link></li>
                                            <li><Link className="dropdown-item" to="#">Building Designer</Link></li>
                                            <li><Link className="dropdown-item" to="#">Energy Consultants</Link></li>
                                            <li><Link className="dropdown-item" to="#">Energy Consultants</Link></li>
                                            <li><Link className="dropdown-item" to="#">Passivhaus Designers / Certifiers</Link></li>
                                            <li><Link className="dropdown-item" to="#">Green Star</Link></li>
                                            <li><Link className="dropdown-item" to="#">Sustainable high performance builders</Link></li>
                                            <li><Link className="dropdown-item" to="#">Product & Material Suppliers</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive("/agency") ? "active" : ""}`} to='/agency'>Agencies</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className={`nav-link ${isActive("/contact") ? "active" : ""}`} to="/contact">Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>

                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        role="dialog"
                        style={{ zIndex: 1055 }}
                    >
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title fw-bold">Confirm Logout</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body text-center">
                                    <h6 className="fw-bold text_blue">Are you sure you want to logout?</h6>
                                </div>
                                <div className="modal-footer d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-theme"
                                        onClick={() => {
                                            logout();
                                            setShowModal(false);
                                        }}
                                    >
                                        Yes, Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Navbar;
