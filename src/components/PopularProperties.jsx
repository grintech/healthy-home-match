import React, { useState } from "react";
import { Link } from "react-router-dom";

const PopularProperties = () => {
  const [activeTab, setActiveTab] = useState("View All");
  const tabs = ["View All", "Apartment", "House", "Villa", "Farm"];

  return (
    <>
      <section className="popular_properties space">
        <div className="container ">
          <div className="row w-100">
            <div className="col-lg-6">
              <h2 className="sec-title m-0">discover popular properties</h2>
              <p className="paragraph">Aliquam lacinia diam quis lacus euismod</p>
            </div>
            <div className="col-lg-6 pe-0">
              <div className="filter-menu d-flex justify-content-lg-end align align-items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    className={`th-btn tab-btn ${
                      activeTab === tab ? "active" : ""
                    }`}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* <p className="sub-title fadeinup wow" ><span className="double-line"></span>Discover Popular Properties</p> */}

         
          <div className="row">
            <div className="col-md-6 col-xl-3">
              <div className="listing-style6">
                <div className="list-thumb">
                  <img
                    alt="listings"
                    loading="lazy"
                    className="w-100"
                    src="/images/card1.jpg"
                  />
                  <div className="sale-sticker-wrap">
                    <div className="list-tag fz12">
                      <i className="fas fa-bolt me-1"></i>FEATURED
                    </div>
                  </div>
                  <div className="list-meta">
                    <div className="icons">
                      <Link href="#">
                        <i className="fa-regular fa-heart"></i>
                      </Link>
                      <Link href="#">
                      <i className="fa-regular fa-copy"></i>
                      </Link>
                      <Link href="#">
                        <i className="fa-regular fa-share-from-square"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-content">
                 
                  <h6 className="list-title">
                    <Link to="/property-single">Luxury villa in Rego Park</Link>
                  </h6>
                  <p className="list-text">New Jersey City, CA, USA</p>
                   <div className="list-price mb-2">$82,000</div>
                </div>
              </div>
            </div>
             <div className="col-md-6 col-xl-3">
              <div className="listing-style6">
                <div className="list-thumb">
                  <img
                    alt="listings"
                    loading="lazy"
                    className="w-100"
                    src="/images/card2.jpg"
                  />
                  <div className="sale-sticker-wrap">
                    {/* <div className="list-tag fz12">
                      <i className="fas fa-bolt me-1"></i>FEATURED
                    </div> */}
                  </div>
                  <div className="list-meta">
                    <div className="icons">
                      <Link href="#">
                        <i className="fa-regular fa-heart"></i>
                      </Link>
                      <Link href="#">
                      <i className="fa-regular fa-copy"></i>
                      </Link>
                      <Link href="#">
                        <i className="fa-regular fa-share-from-square"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-content">
                 
                  <h6 className="list-title">
                    <Link to="/property-single">Equestrian Family Home</Link>
                  </h6>
                  <p className="list-text">New Jersey City, CA, USA</p>
                   <div className="list-price mb-2">$67,000</div>
                </div>
              </div>
            </div>
              <div className="col-md-6 col-xl-3">
              <div className="listing-style6">
                <div className="list-thumb">
                  <img
                    alt="listings"
                    loading="lazy"
                    className="w-100"
                    src="/images/card3.jpg"
                  />
                  <div className="sale-sticker-wrap">
                    <div className="list-tag fz12">
                      <i className="fas fa-bolt me-1"></i>FEATURED
                    </div>
                  </div>
                  <div className="list-meta">
                    <div className="icons">
                      <Link href="#">
                        <i className="fa-regular fa-heart"></i>
                      </Link>
                      <Link href="#">
                      <i className="fa-regular fa-copy"></i>
                      </Link>
                      <Link href="#">
                        <i className="fa-regular fa-share-from-square"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-content">
                  
                  <h6 className="list-title">
                    <Link to="/property-single">Luxury villa in Rego Park</Link>
                  </h6>
                  <p className="list-text">New Jersey City, CA, USA</p>
                  <div className="list-price mb-2">$82,000</div>
                </div>
              </div>
            </div>
             <div className="col-md-6 col-xl-3">
              <div className="listing-style6">
                <div className="list-thumb">
                  <img
                    alt="listings"
                    loading="lazy"
                    className="w-100"
                    src="/images/card4.jpg"
                  />
                  <div className="sale-sticker-wrap">
                    {/* <div className="list-tag fz12">
                      <i className="fas fa-bolt me-1"></i>FEATURED
                    </div> */}
                  </div>
                  <div className="list-meta">
                    <div className="icons">
                      <Link href="#">
                        <i className="fa-regular fa-heart"></i>
                      </Link>
                      <Link href="#">
                      <i className="fa-regular fa-copy"></i>
                      </Link>
                      <Link href="#">
                        <i className="fa-regular fa-share-from-square"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="list-content">
                  
                  <h6 className="list-title">
                    <Link to="/property-single">Equestrian Family Home</Link>
                  </h6>
                  <p className="list-text">New Jersey City, CA, USA</p>
                  <div className="list-price mb-2">$45,000</div>
                </div>
              </div>
            </div>
             
          </div>
        </div>
      </section>
    </>
  );
};

export default PopularProperties;
