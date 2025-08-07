import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './dashboard.css';
import { useAuth } from '../../context/AuthContext';

const DashSidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const currentPath = location.pathname;

  return (
    <>
      <div className="menu_items">
        <div className="dash_sidebar">
          <ul className="d-flex flex-row flex-lg-column gap-1 gap-sm-2 gap-md-3 gap-lg-4 m-0 p-0">
            <Link
              to="/dashboard"
              className={currentPath === "/dashboard" ? "active" : ""}
            >
              <li>
                <i className="fa-solid fa-gauge me-1"></i> Dashboard
              </li>
            </Link>

            <Link
              to="/saved-listings"
              className={currentPath === "/saved-listings" ? "active" : ""}
            >
              <li>
                <i className="fa-solid fa-heart me-1"></i> Saved Listings
              </li>
            </Link>

            <Link
              to="/watchlist"
              className={currentPath === "/watchlist" ? "active" : ""}
            >
              <li>
                <i className="fa-solid fa-file-circle-plus me-1"></i> Watchlists
              </li>
            </Link>

            <Link
              to="#"
              className={currentPath === "/contact-agent" ? "active" : ""}
            >
              <li>
                <i className="fa-solid fa-phone me-1"></i> Contact Agent
              </li>
            </Link>

            <Link
              to="#"
              className={currentPath === "/profile" ? "active" : ""}
            >
              <li>
                <i className="fa-solid fa-user me-1"></i> My Profile
              </li>
            </Link>

            <Link  onClick={() => setShowModal(true)}>
              <li>
                <i className="fa-solid fa-power-off me-1"></i> Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>

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
                  <h5 className="modal-title">Confirm Logout</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <h6 className="fw-bold">Are you sure you want to logout?</h6>
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

export default DashSidebar;
