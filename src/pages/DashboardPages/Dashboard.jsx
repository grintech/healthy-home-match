import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import DashSidebar from "./DashSidebar";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />

      {/* <div className="user_dashboard py-5">
          <h5 className='text-capitalize fw-bold text-center'>Hii {user.name}</h5>
            <h1 className="text-center">Welcome To Your Dashboard</h1>
        </div> */}

       <div className="container user_dashboard">
        <div className="row py-5">
          {/* <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <DashSidebar />
          </div> */}
          <div className="col-lg-12 ">
            <div className=" dashboard_home">
              <h1 className="text-capitalize">Welcome, <span className="text-theme">{user.name}</span> to your account</h1>
              {/* <h6>We are glad to see you again!</h6> */}
              <h6>Here you can manage your profile, view saved listings , create watchlist and keep track of your activities.</h6>

              <div className="row mt-5 ">
                <div className="col-sm-6 col-xl-3">
                   <Link to='/saved-listings'>
                     <div className="d-flex justify-content-between statistics_funfact">
                      <div className="details">
                        <div className="text fz25">Your Favourites</div>
                        <div className="title">16</div>
                      </div>
                      <div className="icon text-center">
                        <i className="fa-regular fa-heart"></i>
                      </div>
                  </div>
                   </Link>
                </div>
                <div className="col-sm-6 col-xl-3">
                 <Link to='/watchlist'>
                     <div className="d-flex justify-content-between statistics_funfact">
                      <div className="details">
                        <div className="text fz25">Watchlists</div>
                        <div className="title">35</div>
                      </div>
                      <div className="icon text-center">
                        <i className="fa-regular fa-bookmark"></i>
                      </div>
                  </div>
                 </Link>
                </div>
                 <div className="col-sm-6 col-xl-3">
                  <div className="d-flex justify-content-between statistics_funfact">
                    <div className="details">
                      <div className="text fz25">Alerts</div>
                      <div className="title">12</div>
                    </div>
                    <div className="icon text-center">
                     <i className="fa-solid fa-bell"></i>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-xl-3">
                  <div className="d-flex justify-content-between statistics_funfact">
                    <div className="details">
                      <div className="text fz25">Saved Searches</div>
                      <div className="title">15</div>
                    </div>
                    <div className="icon text-center">
                      <i className="fas fa-magnifying-glass"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
