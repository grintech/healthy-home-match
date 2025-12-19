import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashSidebar from './DashSidebar';
import api from '../../utils/axios';

const CreateWatchlist = () => {
  const [watchlistName, setWatchlistName] = useState('');
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);


  // pagination
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  /* ====== GET WATCHLISTS ======== */
  const fetchWatchlists = async (pageNo = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/list-saved-watchlist?page=${pageNo}`);

      if (res.data.status) {
        setWatchlists(res.data.data);
        setPage(pageNo);
        setLastPage(res.data.meta?.last_page || 1);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('Failed to fetch watchlists');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlists(1);
  }, []);

  /* ===== CREATE WATCHLIST ====== */
  const handleCreate = async (e) => {
  e.preventDefault();
  if (!watchlistName.trim()) return;

  try {
    setCreating(true);

    const res = await api.post('/save-watchlist', {
      title: watchlistName,
    });

    if (res.data.status) {
      toast.success(res.data.message);
      setWatchlistName('');
      document.getElementById('createWatchlistModalClose')?.click();
      fetchWatchlists(1);
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error('Unable to create watchlist');
  } finally {
    setCreating(false);
  }
};

  /* ===== DELETE WATCHLIST ====== */
  const handleDeleteWatchlist = async () => {
  if (!deleteId) return;

  try {
    setDeleting(true);
    const res = await api.delete(`/delete-watchlist/${deleteId}`);

    if (res.data.status) {
      toast.success(res.data.message);
      fetchWatchlists(page);
      document.getElementById('closeDeleteModal')?.click();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    toast.error('Failed to delete watchlist');
  } finally {
    setDeleting(false);
    setDeleteId(null);
  }
};


  return (
    <div className="user_dashboard">
      <Navbar />

      <div className="saved_listings min_height py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-xl-3 mb-4">
              <DashSidebar />
            </div>
            <div className="col-lg-8 col-xl-9">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0 sec-title">My Watchlists</h1>
                <button
                  className="btn-sm btn btn-theme"
                  data-bs-toggle="modal"
                  data-bs-target="#createWatchlistModal"
                >
                  Create new <i className="fa fa-plus ms-1"></i>
                </button>
              </div>

              {/* LIST */}
              <div className="row watchlist_cards">
                {loading ? (
                  <p>Loading...</p>
                ) : watchlists.length === 0 ? (
                  <p className="text-muted">No watchlists created yet.</p>
                ) : (
                  watchlists.map((list) => (
                    <div className="col-md-4 col-lg-3 mb-4" key={list.id}>
                      <div className="card watchlist-card h-100 shadow-sm border-0">
                        <div className="card-header bg-green border-0 d-flex justify-content-between align-items-center">
                          <h6 className="card-title fw-bold text-capitalize text-truncate mb-0">
                            {list.title}
                          </h6>
                        </div>

                        <div className="card-body">
                          <div className="text-muted small mb-0 d-flex align-items-baseline m-0">
                            <span className="badge bg-theme rounded-circle text-white me-1">
                            {list.properties_count}
                          </span> 
                          <p className='m-0'>Saved properties in this watchlist</p>
                          </div>
                        </div>

                        <div className="card-footer bg-white border-0 d-flex align-items-center justify-content-center gap-2">
                          <Link
                            to={`/watchlist/${list.slug}`}
                            className="btn btn-sm btn-outline-success w-100"
                          >
                            <i className="fa fa-eye me-1"></i> View
                          </Link>

                          <button
                            className="btn btn-sm btn-outline-danger w-100"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteWatchlistModal"
                            onClick={() => setDeleteId(list.id)}
                          >
                            <i className="fa fa-trash me-1"></i> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>


              {/* PAGINATION */}
              {lastPage > 1 && (
                <nav className="mt-4">
                  <ul className="pagination">
                    {[...Array(lastPage)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${page === i + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => fetchWatchlists(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* CREATE MODAL */}
      <div className="modal fade" id="createWatchlistModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <form onSubmit={handleCreate}>
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Create a Watchlist</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="createWatchlistModalClose"
                ></button>
              </div>

              <div className="modal-body">
                <label className="form-label">Watchlist Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={watchlistName}
                  onChange={(e) => setWatchlistName(e.target.value)}
                  placeholder="e.g. My Dream Homes"
                  required
                />
              </div>

              <div className="modal-footer border-0">
                <button type="button" className="btn btn-dark" data-bs-dismiss="modal">
                  Cancel
                </button>
               <button
                  type="submit"
                  className="btn btn-theme"
                  disabled={creating}
                >
                  {creating ? 'Creating...' : 'Create'}
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      <div className="modal fade" id="deleteWatchlistModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-bold">Delete Watchlist</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="closeDeleteModal"
              ></button>
            </div>

            <div className="modal-body text-center">
              <h6 className="mb-0 fw-bold ">
                Are you sure you want to delete this watchlist?  
              </h6>
            </div>

            <div className="modal-footer d-flex justify-content-center align-items-center border-0">
                <button
                type="button"
                className="btn btn-green"
                data-bs-dismiss="modal"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteWatchlist}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CreateWatchlist;
