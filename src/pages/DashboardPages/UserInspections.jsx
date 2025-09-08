import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Tooltip from '../../components/Tooltip';

const inspectionsData = {
  upcoming: [
    {
      id: 1,
      propertyImage: '/images/card1.jpg',
      title: '3-Bedroom Apartment',
      address: '123 Main St, Springfield',
      datetime: '2025-08-10T11:00:00',
      agent: 'John Doe',
      status: 'Upcoming',
    },
    {
      id: 2,
      propertyImage: '/images/card4.jpg',
      title: 'Modern Villa',
      address: '456 Oceanview Dr, Malibu',
      datetime: '2025-08-15T15:30:00',
      agent: 'Sophia Lee',
      status: 'Upcoming',
    }
  ],
  past: [
    {
      id: 3,
      propertyImage: '/images/card3.jpg',
      title: 'Luxury Condo',
      address: '789 City Center, LA',
      datetime: '2025-07-30T14:00:00',
      agent: 'Emma Brown',
      status: 'Attended',
    }
  ]
};

const UserInspections = () => {

  const [activeTab, setActiveTab] = useState('upcoming');
  const [inspections, setInspections] = useState(inspectionsData);

  const [showModal, setShowModal] = useState(false);
  const [selectedInspectionId, setSelectedInspectionId] = useState(null);

  const openCancelModal = (id) => {
    setSelectedInspectionId(id);
    setShowModal(true);
  };

  const confirmCancellation = () => {
    const updated = {
      ...inspections,
      upcoming: inspections.upcoming.filter(item => item.id !== selectedInspectionId),
    };
    setInspections(updated);
    setShowModal(false);
    toast.success("Inspection cancelled successfully.");
  };

  return (
    <div className="buyer-inspections faq_page">
      <Navbar />

      <div className="container py-5">
        <h2 className="mb-4 sec-title">My Property Inspections</h2>

        {/* Tabs */}
         <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              Past
            </button>
          </li>
         </ul>

        {/* Inspection Cards */}
        <div className="row contact_agents_page my_inspections">

          {inspections[activeTab].map((inspection) => (
            <div className="col-md-6 mb-4" key={inspection.id}>
              <div className="card h-100 ">
                <div className="row g-0">
                  <div className="col-lg-5 overflow-hidden">
                    <img
                      src={inspection.propertyImage}
                      alt={inspection.title}
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                  <div className="col-lg-7">
                    <div className="card-body position-relative">
                      {/* Cancel Icon */}

                     {activeTab === 'upcoming' && (
                  <div className="tooltip-wrapper position-absolute top-0 end-0 m-2">
                    <div className="custom-tooltip1">Cancel Inspection</div>
                    <button
                      className="btn btn-sm btn-outline-danger trash_btn"
                      onClick={() => openCancelModal(inspection.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                )}


                      <h5 className="card-title mt-4 fw-bold text-truncate">
                        <Link to="/property" className="text_blue">
                          {inspection.title}
                        </Link>
                      </h5>
                      <p className="card-text text-muted text-truncate mb-2">{inspection.address}</p>
                      <p className="card-text mb-2">
                        <strong>Date & Time : </strong>
                        {new Date(inspection.datetime).toLocaleString()}
                      </p>
                      <p className="card-text mb-2">
                        <strong>Agent : </strong>
                        <Link to="/agent-single" className="text-theme fw-semibold">
                          {inspection.agent}
                        </Link>
                      </p>
                      <p className="card-text mb-3">
                        <strong>Status : </strong>
                        <span
                          className={`badge bg-${inspection.status === 'Upcoming' ? 'theme' : 'success'}`}
                        >
                          {inspection.status}
                        </span>
                      </p>

                      {activeTab === 'upcoming' && (
                        <button
                          className="btn btn-outline-dark calendar_btn  mb-4"
                          onClick={() => toast.info('Add to calendar feature coming soon!')}
                        >
                          <i className="fa-solid fa-calendar"></i> Add to Calendar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {inspections[activeTab].length === 0 && (
            <div className="col-12">
              <p className="text-muted">No {activeTab} inspections found.</p>
            </div>
          )}

        </div>
      </div>

      <Footer />

      {/* Cancel Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Cancel Inspection</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>Are you sure you want to cancel this inspection? This action cannot be undone.</p>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmCancellation}>
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInspections;
