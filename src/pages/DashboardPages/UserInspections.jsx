import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashSidebar from './DashSidebar';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import api from '../../utils/axios';

/* ============================
   TIME FORMATTER (AM / PM)
============================ */
const formatTimeToAMPM = (time) => {
  if (!time) return '';
  const [hour, minute] = time.split(':');
  const h = parseInt(hour, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedHour = h % 12 || 12;
  return `${formattedHour}:${minute} ${ampm}`;
};

const UserInspections = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedInspectionId, setSelectedInspectionId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [inspections, setInspections] = useState({
    upcoming: [],
    past: []
  });

  /*  FETCH USER INSPECTIONS  */
  useEffect(() => {
    fetchUserInspections();
  }, []);


const fetchUserInspections = async () => {
  try {
    const res = await api.get('/list-saved-inspection');

    if (res.data.status) {
      const now = new Date(); // current date & time
      const upcoming = [];
      const past = [];

      res.data.data.forEach(item => {
        // Combine available_date + start_time for full datetime
        const inspectionDateTime = new Date(`${item.available_date}T${item.start_time}`);

        const inspectionObj = {
          id: item.id,
          slug: item.property?.slug,
          propertyImage:
            item.property?.image ||
            item.property?.featured_image ||
            '/images/no-image.jpg',
          title: item.property?.title || 'Property',
          address: item.property?.address || '',
          date: new Date(item.available_date),
          start_time: item.start_time,
          end_time: item.end_time,
          deleted_at: item.deleted_at,
          // Determine status based on date & time
          status: inspectionDateTime < now ? 'closed' : 'open'
        };

        // Push to upcoming or past based on full datetime
        if (inspectionDateTime >= now) {
          upcoming.push(inspectionObj);
        } else {
          past.push(inspectionObj);
        }
      });

      setInspections({ upcoming, past });
    }
  } catch (error) {
    console.error(error);
    toast.error('Failed to load inspections');
  } finally {
    setLoading(false);
  }
};



  /*  CANCEL / DELETE HANDLERS */
  const openCancelModal = (id) => {
    setSelectedInspectionId(id);
    setShowModal(true);
  };

  const confirmCancellation = async () => {
    if (!selectedInspectionId) return;

    setDeleting(true);
    try {
      const res = await api.delete(`/delete-saved-inspection/${selectedInspectionId}`);
      if (res.data.status) {
        toast.success(res.data.message || 'Inspection deleted successfully');

        // Remove inspection from UI
        setInspections(prev => ({
          upcoming: prev.upcoming.filter(item => item.id !== selectedInspectionId),
          past: prev.past.filter(item => item.id !== selectedInspectionId)
        }));
      } else {
        toast.error('Failed to delete inspection');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while deleting');
    } finally {
      setShowModal(false);
      setDeleting(false);
    }
  };

 
  return (
    <div className="buyer-inspections faq_page">
      <Navbar />

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <DashSidebar />
          </div>

          <div className="col-lg-8 col-xl-9">
            <h2 className="mb-4 sec-title">Property Inspections</h2>

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

            {loading && (
                <div className="d-flex flex-column justify-content-center align-items-center py-3" >
                  <i className="fa-solid fa-home text-theme fs-3 loader-icon"></i>
                  <span>Loading...</span>
                </div>
            )}

            {/* Inspection Cards */}
            <div className="row contact_agents_page my_inspections">
              {!loading &&
                inspections[activeTab].map((inspection) => (
                  <div className="col-md-6 col-xl-4 mb-4" key={inspection.id}>
                    <div className="card h-100">
                      <img
                        src={`https://${inspection.propertyImage}`}
                        alt={inspection.title}
                        className="rounded-top"
                      />

                      <div className="card-body">
                        <h5 className="card-title fw-bold text-truncate text-capitalize">
                          <Link to={`/property/${inspection.slug}`} className="text_blue">
                            {inspection.title}
                          </Link>
                        </h5>

                        <p className="card-text text-muted text-truncate mb-2">
                          {inspection.address}
                        </p>

                        <p className="card-text mb-2">
                          <strong>Date & Time:</strong>{' '}
                          {inspection.date.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                          {' | '}
                          {formatTimeToAMPM(inspection.start_time)} –{' '}
                          {formatTimeToAMPM(inspection.end_time)}
                        </p>

                       <p className="card-text mb-3">
                        <strong>Status:</strong>{' '}
                        <span
                          className={`badge ${
                            inspection.deleted_at === null
                              ? (inspection.status === 'open' ? 'bg-success' : 'bg-danger')
                              : 'bg-danger'
                          }`}
                        >
                          {inspection.deleted_at === null
                            ? (inspection.status === 'open' ? 'Open' : 'Closed')
                            : 'Closed'}
                        </span>
                      </p>


                              <button
                                className="btn btn-outline-dark btn-sm calendar_btn mb-3 me-2"
                                onClick={() =>
                                  toast.info('Add to calendar coming soon')
                                }
                              >
                                <i className="fa-solid fa-calendar"></i> Add to Calendar
                              </button>

                              <button
                                className="btn btn-sm btn-outline-danger trash_btn mb-3"
                                onClick={() => openCancelModal(inspection.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                        {/* {activeTab === 'upcoming' &&
                          inspection.deleted_at === null && (
                            <>
                            </>
                          )} */}
                      </div>
                    </div>
                  </div>
                ))}

              {!loading && inspections[activeTab].length === 0 && (
                <div className="col-12">
                  <p className="text-muted">
                    No {activeTab} inspections found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Cancel Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
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
                <h6>
                  Are you sure you want to cancel this inspection? 
                </h6>
              </div>

              <div className="modal-footer d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                  disabled={deleting}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmCancellation}
                  disabled={deleting}
                >
                  {deleting ? 'Deleting...' : 'Yes, Cancel'}
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
