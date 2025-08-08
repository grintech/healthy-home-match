import React, { useState } from "react";
import { Link } from "react-router-dom";

// Dummy JSON Data
const propertyData = [
  {
    id: 1,
    title: "Luxury Villa in Rego Park",
    location: "New Jersey City, CA, USA",
    price: "$82,000",
    type: "Villa",
    featured: true,
    image: "/images/card1.jpg",
  },
  {
    id: 2,
    title: "Equestrian Family Home",
    location: "New Jersey City, CA, USA",
    price: "$67,000",
    type: "House",
    featured: false,
    image: "/images/card2.jpg",
  },
  {
    id: 3,
    title: "Beachfront Apartment",
    location: "Miami, FL, USA",
    price: "$45,000",
    type: "Apartment",
    featured: true,
    image: "/images/card3.jpg",
  },
  {
    id: 4,
    title: "Farmhouse Retreat",
    location: "Austin, TX, USA",
    price: "$55,000",
    type: "Farm",
    featured: false,
    image: "/images/card4.jpg",
  },
];

const PopularProperties = () => {
  const [activeTab, setActiveTab] = useState("View All");
  const tabs = ["View All", "Apartment", "House", "Villa", "Farm"];

  // Filter properties based on tab
  const filteredProperties =
    activeTab === "View All"
      ? propertyData
      : propertyData.filter((property) => property.type === activeTab);

  return (
    <section className="popular_properties space">
      <div className="container">
        <div className="row w-100">
          <div className="col-lg-6">
            <h2 className="sec-title m-0">Discover Popular Properties</h2>
            <p className="paragraph">Aliquam lacinia diam quis lacus euismod</p>
          </div>
          <div className="col-lg-6 pe-0">
            <div className="filter-menu d-flex justify-content-lg-end align align-items-center">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`th-btn tab-btn ${activeTab === tab ? "active" : ""}`}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="row">
          {filteredProperties.map((property) => (
            <div className="col-md-6 col-xl-3" key={property.id}>
              <Link to={`/property-single`}>
                <div className="listing-style6">
                  <div className="list-thumb">
                    <img
                      alt={property.title}
                      loading="lazy"
                      className="w-100"
                      src={property.image}
                    />
                    {property.featured && (
                      <div className="sale-sticker-wrap">
                        <div className="list-tag fz12">
                          <i className="fas fa-bolt me-1"></i>FEATURED
                        </div>
                      </div>
                    )}
                    <div className="list-meta">
                      <div className="icons">
                        <Link to="#"><i className="fa-regular fa-heart"></i></Link>
                        <Link to="#"><i className="fa-regular fa-copy"></i></Link>
                        <Link to="#"><i className="fa-regular fa-share-from-square"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="list-content">
                    <h6 className="list-title">
                      <Link to={`/property/${property.id}`}>{property.title}</Link>
                    </h6>
                    <p className="list-text">{property.location}</p>
                    <div className="list-price mb-2">{property.price}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProperties;
