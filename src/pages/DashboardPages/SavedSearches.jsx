import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const SavedSearches = () => {
  const navigate = useNavigate();

  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: 'Luxury Homes in NYC',
      dateSaved: '2025-08-01',
      alerts: true,
      params: {
        location: 'New York',
        price: '1000000-2000000',
        type: 'luxury',
      },
    },
    {
      id: 2,
      name: 'Affordable Apartments in LA',
      dateSaved: '2025-07-28',
      alerts: false,
      params: {
        location: 'Los Angeles',
        price: '200000-500000',
        type: 'apartment',
      },
    },
    {
      id: 3,
      name: 'Best Villa in CL',
      dateSaved: '2025-08-03',
      alerts: true,
      params: {
        location: 'California',
        price: '150000-200000',
        type: 'villa',
      },
    },
  ]);

  const toggleAlerts = (id) => {
    const updated = savedSearches.map((item) =>
      item.id === id ? { ...item, alerts: !item.alerts } : item
    );
    setSavedSearches(updated);
  };

  const deleteSearch = (id) => {
    setSavedSearches(savedSearches.filter((item) => item.id !== id));
  };

  const redirectToSearch = (params) => {
    const query = new URLSearchParams(params).toString();
    navigate(`/search-homes?${query}`);
  };

  return (
    <>
      <Navbar />

      <div className="container saved_searches py-5">
        <h3 className="sec-title mb-4">Saved Searches</h3>

        <div className="card ">
          <div className="table-responsive">
            <table className="table  mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Listing Name</th>
                  <th scope="col">Date Saved</th>
                  <th scope="col">Alerts</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedSearches.length > 0 ? (
                  savedSearches.map((search, index) => (
                    <tr key={search.id}>
                      <td className='fw-bold'>{index + 1}</td>
                      <td className='listing_name'>{search.name}</td>
                      <td>{new Date(search.dateSaved).toLocaleDateString()}</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={search.alerts}
                            onChange={() => toggleAlerts(search.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex">
                            <button
                            className="btn btn-sm btn-green me-2"
                             data-bs-toggle="tooltip"
                             data-bs-placement="top"
                             data-bs-title="Run Search"
                             onClick={() => redirectToSearch(search.params)}
                            >
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </button>
                            <button
                            className="btn btn-sm btn-green"
                             data-bs-toggle="tooltip"
                             data-bs-placement="top"
                             data-bs-title="Delete"
                             onClick={() => deleteSearch(search.id)}
                            >
                            <i className="fa-solid fa-trash"></i>
                            </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <i className="fa-regular fa-face-frown fa-lg me-2"></i>
                      No saved searches found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />

    </>
  );
};

export default SavedSearches;
