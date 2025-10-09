import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DashSidebar from './DashSidebar';

const dummyListings = [
  {
    id: 1,
    title: 'Equestrian Family Home',
    location: 'San Diego City, CA, USA',
    type: 'Rent',
    price: '$14,000',
    image: '/images/card1.jpg',
    tag: '7-Star+',
  },
  {
    id: 2,
    title: 'Modern Glass Complex',
    location: 'Austin, TX, USA',
    type: 'Sale',
    price: '$16,000',
    image: '/images/card2.jpg',
    tag: 'Passivhaus',
  },
  {
    id: 3,
    title: 'House on the Northridge',
    location: 'Main street, Amesterdam, USA',
    type: 'Rent',
    price: '$18,000',
    image: '/images/card3.jpg',
    tag: 'Green Star',
  },
];

const CreateWatchlist = () => {
  const [watchlistName, setWatchlistName] = useState('');
  const [watchlists, setWatchlists] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('watchlists');
    if (stored) {
      setWatchlists(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (lists) => {
    localStorage.setItem('watchlists', JSON.stringify(lists));
  };

  const slugify = (name) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!watchlistName.trim()) return;

    const slug = slugify(watchlistName);

 //  Prevent duplicate watchlist by slug
  const duplicate = watchlists.some((w) => w.slug === slug);
  if (duplicate) {
    toast.error('A watchlist with this name already exists.');
    return;
  }

    const newWatchlist = {
      id: Date.now(),
      name: watchlistName,
      slug,
      listings: dummyListings,
    };

    const updated = [newWatchlist, ...watchlists];
    setWatchlists(updated);
    saveToStorage(updated);
    setWatchlistName('');
    document.getElementById('createWatchlistModalClose')?.click();

    toast.success('Watchlist created successfully!');
  };

  const handleDeleteWatchlist = (id) => {
    const updated = watchlists.filter((list) => list.id !== id);
    setWatchlists(updated);
    saveToStorage(updated);

    toast.success('Watchlist deleted successfully!');
  };

  return (
    <div className='user_dashboard'>
      <Navbar />
      <div className='saved_listings min_height py-5'>
        <div className='container'>
          <div className='row'>
            <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
              <DashSidebar/>
            </div>
            <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0">
            <div className=''>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <h1 className='mb-0 sec-title'>My Watchlists</h1>
                <button className='btn-sm btn btn-theme' data-bs-toggle='modal' data-bs-target='#createWatchlistModal'>
                 Create new <i className='fa fa-plus me-2'></i>
                </button>
              </div>

              <div className='row watchlist_cards'>
                {watchlists.length === 0 ? (
                  <p className='text-muted'>No watchlists created yet.</p>
                ) : (
                  watchlists.map((list) => (
                    <div className='col-md-4 col-lg-3 mb-4' key={list.id}>
                      <div className='border rounded p-3 shadow-sm h-100 d-flex flex-column justify-content-between'>
                        <div>
                          <h6 className='mb-2 text-truncate text-capitalize fw-bold'>
                           {list.name}
                          </h6>
                          <p className="text-muted small mb-2">{list.listings.length} Listings</p>
                        </div>
                        <div className='mt-3'>
                          <Link to={`/watchlist/${list.slug}`} className='btn btn-sm btn-outline-green me-2'>View</Link>
                          <button className='btn btn-sm btn-outline-danger' onClick={() => handleDeleteWatchlist(list.id)}>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Create Watchlist Modal */}
      <div className='modal fade' id='createWatchlistModal' tabIndex='-1'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <form onSubmit={handleCreate}>
              <div className='modal-header border-0'>
                <h5 className='modal-title fw-bold'>Create a Watchlist</h5>
                <button type='button' className='btn-close' data-bs-dismiss='modal' id='createWatchlistModalClose'></button>
              </div>
              <div className='modal-body'>
                <label htmlFor='watchlistName' className='form-label'>Watchlist Name</label>
                <input
                  type='text'
                  id='watchlistName'
                  className='form-control'
                  value={watchlistName}
                  onChange={(e) => setWatchlistName(e.target.value)}
                  placeholder='e.g. My Dream Homes'
                  required
                />
              </div>
              <div className='modal-footer border-0'>
                <button type='button' className='btn btn-dark' data-bs-dismiss='modal'>Cancel</button>
                <button type='submit' className='btn btn-theme'>Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWatchlist;
