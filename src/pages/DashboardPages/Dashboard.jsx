import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import "./dashboard.css";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";
import DashSidebar from "./DashSidebar";
import CountUp from "react-countup";

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />

    

       <div className="container min_height user_dashboard">
        <div className="row py-5">
          {/* <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <DashSidebar />
          </div> */}
          <div className="col-lg-12 ">
            <div className=" dashboard_home">
              <h1 className="text-capitalize sec-title">Welcome, <span className="text-theme">{user.name}</span> to your account</h1>
              
              <h6>Here you can manage your profile, view saved listings , create watchlist and keep track of your activities.</h6>

              <div className="row mt-5 ">
                <div className="col-sm-6 col-xl-3">
                   <Link to='/saved-listings'>
                     <div className="d-flex justify-content-between statistics_funfact">
                      <div className="details">
                        <div className="text fz25">Your Favourites</div>
                       <div className="title">
                        <CountUp end={16} duration={2} />
                      </div>

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
                        <div className="title"><CountUp end={35} duration={2} /></div>
                      </div>
                      <div className="icon text-center">
                        <i className="fa-regular fa-bookmark"></i>
                      </div>
                  </div>
                 </Link>
                </div>

                 <div className="col-sm-6 col-xl-3">
                  <Link to="/my-alerts">
                  <div className="d-flex justify-content-between statistics_funfact">
                    <div className="details">
                      <div className="text fz25">Alerts</div>
                        <div className="title"><CountUp end={12} duration={2} /></div>
                    </div>
                    <div className="icon text-center">
                     <i className="fa-solid fa-bell"></i>
                    </div>
                  </div>
                  </Link>
                </div>

                <div className="col-sm-6 col-xl-3">
                  <Link to="/saved-searches">
                  <div className="d-flex justify-content-between statistics_funfact">
                    <div className="details">
                      <div className="text fz25">Saved Searches</div>
                       <div className="title"><CountUp end={15} duration={2} /></div>
                    </div>
                    <div className="icon text-center">
                      <i className="fas fa-magnifying-glass"></i>
                    </div>
                  </div>
                  </Link>
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
