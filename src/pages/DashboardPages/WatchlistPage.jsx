import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const WatchlistPage = () => {
  const { slug } = useParams();
  const storedWatchlists = JSON.parse(localStorage.getItem('watchlists')) || [];
  const watchlist = storedWatchlists.find(w => w.slug === slug);

  const navigate = useNavigate();

  return (
    <div className="user_dashboard">
      <Navbar />
      <div className="container py-5">
        <Link className="text_blue " onClick={() => navigate(-1)}><i className="fa-solid fa-chevron-left "></i> <span className="fs-6 text-underline ">Back</span></Link>
        <div className="mt-3 ">
            {watchlist ? (
            <>
                <h1 className="mb-4 sec-title text-capitalize">Watchlist: <span className="text-theme">{watchlist.name}</span></h1>
                <div className="row search_right">
                {watchlist.listings.map((item) => (
                    <div className='col-md-6 col-lg-4 ' key={item.id}>
                    <div className='card listing-style1'>
                        <div className="list-thumb">
                        <img src={item.image} className='card-img-top' alt={item.title} />
                        <div className="sale-sticker-wrap">
                            <div className="list-tag fz12">
                            <i className="fa-solid fa-bolt me-1"></i>
                            {item.tag}
                            </div>
                            <div className="list-tag fz12 bg-dark">
                            <i className="fa-solid fa-flag me-1"></i>
                            {item.type}
                            </div>
                        </div>
                        <div className="list-price">{item.price}</div>
                        </div>
                        <div className="list-content">
                        <Link to="/property-single"> <h6 className='list-title'>{item.title}</h6></Link>
                        <p className='list-text'>{item.location}</p>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </>
            ) : (
            <p className="text-muted">Watchlist not found.</p>
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WatchlistPage;
