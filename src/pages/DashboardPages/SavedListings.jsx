import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

const listingsData = [
  {
    id: 1,
    title: 'Equestrian Family Home',
    location: 'San Diego City, CA, USA',
    type: 'Rent',
    price: '$14,000',
    image: '/images/card1.jpg',
    tag: '7-Star+',
    bed: 5,
    bath: 4,
    size: '900 sq.',
    category: 'House'
  },
  {
    id: 2,
    title: 'Modern Glass Complex',
    location: 'Austin, TX, USA',
    type: 'Sale',
    price: '$14,000',
    image: '/images/card2.jpg',
    tag: 'Passivhaus',
    bed: 5,
    bath: 4,
    size: '1025 sq.',
    category: 'Apartment'
  },
  {
    id: 3,
    title: 'Personal Open Bunglow',
    location: 'Austin, TX, USA',
    type: 'Sale',
    price: '$16,000',
    image: '/images/card3.jpg',
    tag: 'Green Star',
    bed: 5,
    bath: 4,
    size: '1200 sq.',
    category: 'Bunglow'
  }
];

const SavedListings = () => {

  const [watchlists, setWatchlists] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('watchlists');
    if (stored) {
      setWatchlists(JSON.parse(stored));
    }
  }, []);

  const handleAddToWatchlist = () => {
    if (!selectedListing || !selectedWatchlistId) return;

    const updated = watchlists.map(w => {
      if (w.id === parseInt(selectedWatchlistId)) {
        const alreadyAdded = w.listings.find(l => l.id === selectedListing.id);
        if (!alreadyAdded) {
          return { ...w, listings: [...w.listings, selectedListing] };
        }
      }
      return w;
    });

    setWatchlists(updated);
    localStorage.setItem('watchlists', JSON.stringify(updated));
    setSelectedListing(null);
    setSelectedWatchlistId('');
    document.getElementById('addWatchlistModalClose')?.click();
  };

  return (
    <div className="user_dashboard">
      <Navbar />
      <div className="saved_listings py-5">
        <div className="container">
          <div className="col-lg-12">
            <h1 className="mb-3 sec-title">Saved Listings ({listingsData.length})</h1>

            <div className="row search_right">
              {listingsData.map((listing) => (
                <div key={listing.id} className="col-md-6 col-lg-4 ">
                  <div className="listing-style1">
                    <div className="list-thumb">
                      <img alt={listing.title} src={listing.image} className="w-100" loading="lazy" />
                      <div className="sale-sticker-wrap">
                        <div className="list-tag fz12">
                          <i className="fa-solid fa-bolt me-1"></i>{listing.tag}
                        </div>
                        <div className="list-tag fz12 bg-dark">
                          <i className="fa-solid fa-flag me-1"></i>{listing.type}
                        </div>
                      </div>
                      <div className="list-price">{listing.price}</div>
                    </div>

                    <div className="list-content">
                      <h6 className="list-title">
                        <Link to="/property-single">{listing.title}</Link>
                      </h6>
                      <p className="list-text">{listing.location}</p>
                      <div className="list-meta d-flex align-items-center">
                        <Link to="#"><i className="fas fa-bed"></i> {listing.bed}</Link>
                        <Link to="#"><i className="fas fa-bath"></i> {listing.bath}</Link>
                        <Link to="#"><i className="fa-solid fa-chart-area"></i> {listing.size}</Link>
                        <Link to="#"><i className="fa-solid fa-home"></i> {listing.category}</Link>
                      </div>
                      <hr />
                      <div className="list-meta2 d-flex justify-content-between align-items-center mt-3">
                        <Link to='/property-single' className="view_details">View details</Link>
                        <div className="icons d-flex align-items-center">
                          <Link to="#"><i className="fa-solid fa-heart text-danger"></i></Link>
                          <Link
                            data-bs-toggle="modal"
                            data-bs-target="#addWatchlistModal"
                            title='Add to watchlist'
                            onClick={() => setSelectedListing(listing)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Add to Watchlist Modal */}
      <div className="modal fade" id="addWatchlistModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Add this listing to a watchlist</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" id="addWatchlistModalClose"></button>
            </div>
            <div className="modal-body">
              {watchlists.length === 0 ?  (
                <h6 className='text-center m-0 py-4'>
                    No watchlists found. Please 
                  <Link
                    to="/watchlist"
                    className="ms-1 me-1"
                    onClick={() => {
                        const modal = bootstrap.Modal.getInstance(document.getElementById('addWatchlistModal'));
                        if (modal) modal.hide();
                    }}
                    >
                    create a watchlist
                    </Link>

                    first.
                </h6>
                )  : (
                <>
                  <label className="form-label">Choose Watchlist:</label>
                  <select
                    className="form-select"
                    value={selectedWatchlistId}
                    onChange={(e) => setSelectedWatchlistId(e.target.value)}
                  >
                    <option value="">Select Watchlist</option>
                    {watchlists.map(w => (
                      <option className='text-capitalize' key={w.id} value={w.id}>
                        {w.name}
                         {/* ({w.listings.length} listings) */}
                      </option>
                    ))}
                  </select>
                   <div className="mt-2 d-flex justify-content-end">
                    <Link
                    to='/watchlist'
                    className='ms-1 text_blue text-capitalize text-underline'
                      onClick={() => {
                            const modal = bootstrap.Modal.getInstance(document.getElementById('addWatchlistModal'));
                            if (modal) modal.hide();
                        }}
                    >
                    create a new watchlist
                    </Link>
                   </div>
                </>
              )}
            </div>

            {watchlists.length > 0 && (
                <div className="modal-footer border-0 pt-0">
                    <div className="d-flex w-100 justify-content-center align-items-center">
                        <button type="button" className="btn btn-dark mx-2" data-bs-dismiss="modal">Cancel</button>
                        <button
                            type="button"
                            className="btn btn-theme mx-2"
                            onClick={handleAddToWatchlist}
                            disabled={!selectedWatchlistId}
                        >
                            Add
                        </button>

                    </div>
                </div>

            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SavedListings;
