import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import Tooltip from '../../components/Tooltip';

const initialAlerts = [
  {
    id: '1',
    email: 'john@example.com',
    propertyId: 'prop_101',
    propertyTitle: '2BHK Apartment in New York',
    propertyImage: '/images/card1.jpg',
    alertType: 'Price Drop',
    date: '2025-08-05T12:00:00Z',
    status: 'active',
  },
  {
    id: '2',
    email: 'john@example.com',
    propertyId: 'prop_102',
    propertyTitle: 'Beachside Villa in Miami',
    propertyImage: '/images/card2.jpg',
    alertType: 'Inspection',
    date: '2025-08-03T15:30:00Z',
    status: 'active',
  },
  {
    id: '3',
    email: 'john@example.com',
    propertyId: 'prop_103',
    propertyTitle: 'Luxury Condo in LA',
    propertyImage: '/images/card3.jpg',
    alertType: 'Status Change',
    date: '2025-08-01T10:00:00Z',
    status: 'active',
  },
];

const MyAlerts = () => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlertId, setSelectedAlertId] = useState(null);

  const openCancelModal = (id) => {
    setSelectedAlertId(id);
    const modal = new window.bootstrap.Modal(document.getElementById('cancelModal'));
    modal.show();
  };

  const confirmCancel = () => {
    if (selectedAlertId) {
      setAlerts((prev) => prev.filter((alert) => alert.id !== selectedAlertId));
      setSelectedAlertId(null);
      toast.success("Alerts for this property has been stopped.")
    }
    const modal = window.bootstrap.Modal.getInstance(document.getElementById('cancelModal'));
    modal.hide();
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h1 className="sec-title mb-4">My Subscribed Alerts</h1>

        <div className="alert_card">
          <p className="text-muted mb-3">
            Manage your property alerts here. You can subscribe to receive notifications for price drops, inspections, and status changes.
          </p>

          {alerts.length === 0 ? (
            <div className="alert alert-info">You haven’t subscribed to any alerts yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr className="align-top">
                    <th>Property</th>
                    <th>Title</th>
                    <th>Alert Type</th>
                    <th>Subscribed On</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>
                        <img
                          src={alert.propertyImage}
                          alt="Property"
                          className="rounded-2"
                          style={{ width: '80px', height: '70px', objectFit: 'cover' }}
                        />
                      </td>
                      <td className="listing_name">
                        <Link to="/property" className="text_blue">{alert.propertyTitle}</Link>
                      </td>
                      <td>{alert.alertType}</td>
                      <td>{new Date(alert.date).toLocaleDateString()}</td>
                      <td>
                        <span className="badge bg-theme text-uppercase">{alert.status}</span>
                      </td>
                      <td>
                         <Tooltip text={"Turn Off"}>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => openCancelModal(alert.id)} 
                          >
                            Off Alert
                          </button>
                         </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Bootstrap Cancel Confirmation Modal */}
      <div className="modal fade" id="cancelModal" tabIndex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold" id="cancelModalLabel">Confirm Cancellation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to turn off this alert? This action cannot be undone.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No, Keep</button>
              <button type="button" className="btn btn-danger" onClick={confirmCancel}>Yes, off</button>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAlerts;
