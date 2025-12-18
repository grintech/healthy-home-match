import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashSidebar from "./DashSidebar";
import Tooltip from "../../components/Tooltip";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const SavedSearches = () => {
  const navigate = useNavigate();

  const [savedSearches, setSavedSearches] = useState([]);
  const [meta, setMeta] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSavedSearches(page);
  }, [page]);

  const fetchSavedSearches = async (pageNo) => {
    setLoading(true);
    try {
      const res = await api.get(`/list-search-filters?page=${pageNo}`);

      if (res.data?.data) {
        setSavedSearches(res.data.data);
        setMeta(res.data.meta);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load saved searches");
    } finally {
      setLoading(false);
    }
  };

  const redirectToSearch = (search) => {
    const params = {
      location: search.location,
      min_price: search.min_price,
      max_price: search.max_price,
      property_type: search.property_type,
      listing_type: search.listing_type,
      bedrooms: search.bedrooms,
      bathrooms: search.bathrooms,
    };

    const query = new URLSearchParams(params).toString();
    navigate(`/homes?${query}`);

  };

  /*-------- Delete Saved Search ---------------*/

  const deleteSavedSearch = async (id) => {
  if (!window.confirm("Are you sure you want to delete this saved search?")) {
    return;
  }

  try {
    const res = await api.delete(`/delete-search-filters/${id}`);

    if (res.data?.status) {
      toast.success(res.data.message || "Saved search deleted");

      // Option 1: refetch current page (recommended)
      fetchSavedSearches(page);
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete saved search");
  }
 };


  return (
    <>
      <Navbar />

      <div className="container saved_searches py-5">
        <div className="row">
          <div className="col-lg-4 col-xl-3 mb-4">
            <DashSidebar />
          </div>

          <div className="col-lg-8 col-xl-9">
            <h3 className="sec-title mb-4">Saved Searches</h3>

            <div className="card">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>S.No</th>
                      <th>Location</th>
                      <th>Date Saved</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                         <div className="d-flex flex-column justify-content-center align-items-center py-2" >
                            <i className="fa-solid fa-home text-theme fs-3 loader-icon"></i>
                            <span>Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : savedSearches.length > 0 ? (
                      savedSearches.map((search, index) => (
                        <tr key={search.id}>
                          <td className="fw-bold">
                            {(meta?.per_page * (page - 1)) + index + 1}
                          </td>
                          <td className="listing_name">
                            {search.location || "N/A"}
                          </td>
                          <td>
                            {new Date(search.created_at).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Tooltip text="Run Search">
                              <button
                                className="btn btn-sm btn-green"
                                onClick={() => redirectToSearch(search)}
                              >
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                              </button>
                            </Tooltip>
                            <Tooltip text="Delete Search">
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => deleteSavedSearch(search.id)}
                              >
                                <i className="fa-solid fa-trash"></i>
                              </button>
                            </Tooltip>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No saved searches found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGINATION */}
            {meta && meta.last_page > 1 && (
              <div className="d-flex justify-content-end mt-3">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => setPage(page - 1)}
                      >
                        Prev
                      </button>
                    </li>

                    {[...Array(meta.last_page)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${page === i + 1 ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    <li
                      className={`page-item ${
                        page === meta.last_page ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setPage(page + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SavedSearches;
