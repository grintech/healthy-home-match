import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ disableSticky = false }) => {
    const [isSticky, setIsSticky] = useState(false);
    const location = useLocation();

    const { user, logout } = useAuth();
    const [showModal, setShowModal] = useState(false);


    // const isActive = (path) => location.pathname === path;
    const isActive = (path) => location.pathname + location.search === path;


    useEffect(() => {
        if (disableSticky) return; // If true skip sticky

        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [disableSticky]);


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
                <nav className={`navbar navbar-expand-lg d-none d-lg-block ${isSticky ? 'sticky-nav shadow-sm bg-white' : ''}`}>
                    <div className="container d-flex justify-content-between align-items-center px-0">

                        <div className="col-5">
                            <ul className="navbar-nav flex-row">
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/homes?buy") ? "active" : ""}`} to="/homes?buy">Buy</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/homes?rent") ? "active" : ""}`} to="/homes?rent">Rent</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/build") ? "active" : ""}`} to="/build">Build</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/mortgage-calculator") ? "active" : ""}`} to="/mortgage-calculator">Get a mortgage</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/get-finance") ? "active" : ""}`} to="/get-finance">Get a Finance</Link>
                                </li>

                            </ul>

                        </div>

                        <div className="col-2 text-center">
                            {/* Center Logo */}
                            <Link className="navbar-brand m-0 p-0" to="/">
                                <img src="/images/healthy_logo.png" alt="logo" style={{ height: "65px" }} />
                            </Link>

                        </div>

                        <div className="col-5 ">
                            <ul className="navbar-nav flex-row align-items-center justify-content-end">
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/agency") ? "active" : ""}`} to="/agency">Agencies</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/agents") ? "active" : ""}`} to="/agents">Find an agent</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/sell") ? "active" : ""}`} to="/sell">Sell</Link>
                                </li>
                                <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/help") ? "active" : ""}`} to="/help">Help</Link>
                                </li>

                                {!user ? (
                                    <div className="d-flex align-items-center">
                                        <Link
                                            className={`nav-link ms-1 login_btn ${isActive("/login") ? "active" : ""}`}
                                            to="/login"
                                        >
                                            {/* <i className="fa-regular fa-user-circle"></i> */}
                                             Login
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
                                                {/* <span className="text-capitalize">{user.name}</span> */}
                                                   <span className="text-uppercase fw-bold">
                                                        {(() => {
                                                            const nameParts = user.name.trim().split(" ");
                                                            if (nameParts.length === 1) {
                                                                return nameParts[0][0]; // first letter if only one word
                                                            }
                                                            return nameParts[0][0] + nameParts[1][0]; // first letters of first two words
                                                        })()}
                                                    </span>
                                            </button>

                                            <ul className="dropdown-menu">
                                                {user.role === "4" ? (
                                                    <>

                                                        <li>
                                                            <Link className="dropdown-item" to="/my-account">
                                                                <i className="fa fa-gauge me-2"></i> My Account
                                                            </Link>
                                                        </li>

                                                        {/* <li>
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

                                                        <li><hr className="dropdown-divider" /></li> */}

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
                                                                href={`http://35.154.224.205/backend/public/create-session/${token}`}

                                                            >
                                                                <i className="fa fa-gauge me-2"></i> My Account
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
                            </ul>

                        </div>

                    </div>
                </nav>

                <nav className={`navbar w-100 navbar-expand-lg d-block d-lg-none ${isSticky ? 'sticky-nav shadow-sm bg-white' : ''}`}>
                    <div className="container d-flex justify-content-between align-items-center">

                        <div className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <i className="fa-solid fa-bars text-white"  > </i>
                        </div>

                        {/* Center Logo */}
                        <Link className="navbar-brand " to="/">
                            <img src="/images/healthy_logo.png" alt="logo" style={{ height: "65px" }} />
                        </Link>

                        {/* Right side links */}

                        {!user ? (
                            <div className="d-flex align-items-center ">
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
                                        {/* <span className="text-capitalize">{user.name}</span> */}
                                         <span className="text-uppercase fw-bold">
                                                        {(() => {
                                                            const nameParts = user.name.trim().split(" ");
                                                            if (nameParts.length === 1) {
                                                                return nameParts[0][0]; // first letter if only one word
                                                            }
                                                            return nameParts[0][0] + nameParts[1][0]; // first letters of first two words
                                                        })()}
                                                    </span>
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
                                                        href={`http://35.154.224.205/backend/public/create-session/${token}`}

                                                    >
                                                        <i className="fa fa-gauge me-2"></i> My Account
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
                            // <div className="user_dropdown ">
                                
                            // </div>
                        )}
                        

                    </div>
                </nav>

                <div style={{ zIndex: "9999" }} className="offcanvas offcanvas-start border-0" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-body ">
                        <div className="offcanvas-header py-2">
                            <h5 className="offcanvas-title fw-bold" id="offcanvasNavbarLabel">Healthy Home Match</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <hr className='my-2' />
                        <ul className="navbar-nav ">
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${isActive("/homes?buy") ? "active" : ""}`} to="/homes?buy">Buy</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${isActive("/homes?rent") ? "active" : ""}`} to="/homes?rent">Rent</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${isActive("/build") ? "active" : ""}`} to="/build">Build</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${isActive("/mortgage-calculator") ? "active" : ""}`} to="/mortgage-calculator">Get a mortgage</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${isActive("/get-finance") ? "active" : ""}`} to="/get-finance">Get a Finance</Link>
                             </li>


                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${isActive("/agency") ? "active" : ""}`} to="/agency">Agencies</Link>
                            </li>

                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${isActive("/agents") ? "active" : ""}`} to="/agents">Find an Agent</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className={`nav-link ${isActive("/sell") ? "active" : ""}`} to="/sell">Sell</Link>
                            </li>
                            <li className="nav-item mx-2">
                                    <Link className={`nav-link ${isActive("/help") ? "active" : ""}`} to="/help">Help</Link>
                                </li>

                        </ul>
                    </div>
                </div>

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
