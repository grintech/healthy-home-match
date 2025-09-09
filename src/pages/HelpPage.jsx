import React, { useState } from "react";
import { FaHome, FaUser, FaCreditCard, FaQuestionCircle, FaUsers } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import Navbar from "../components/Navbar";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function HelpPage() {

 const [searchTerm, setSearchTerm] = useState("");
    
  const helpCategories = [
    { icon: <FaHome />, title: "Buying a Home", desc: "Guides, tips, and FAQs for purchasing property.", link:"/faq?category=Buy" },
    { icon: <FaQuestionCircle />, title: "Renting", desc: "Information for renters and landlords.", link:"/faq?category=Rent" },
    { icon: <FaHome />, title: "Selling Property", desc: "Steps and advice for selling homes.", link:"/faq?category=Sell" },
    { icon: <FaUsers />, title: "Agents", desc: "How to find, contact, and work with agents.", link:"/faq?category=Agents" },
    { icon: <FaUser />, title: "Account & Profile", desc: "Manage your account and settings.", link:"/faq?category=Account" },
    { icon: <FaCreditCard />, title: "Payments", desc: "Learn about deposits, payments, and refunds.", link:"/faq?category=Payments" },
  ];
  

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
   );



  return (
    <>
      <Navbar />
      <section className="bg-light py-5 min-vh-100">
        <div className="container">
          <h1 className="text-center fw-bold mb-3"><span className="text-theme">Help</span> & Support</h1>
          <p className="text-center text-muted mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Welcome to <strong>Healthy Home Match</strong> support.  
            Find answers to common questions about buying, selling, or renting property in Australia.
          </p>

          {/* Search */}
          <div className="d-flex justify-content-center mb-5">
            <div className="position-relative w-100" style={{ maxWidth: "500px" }}>
              <input
                type="search"
                placeholder="Search for help articles..."
                className="form-control rounded-pill ps-5 py-3 shadow-sm"
                onChange={(e) => setSearchTerm (e.target.value) }
              />
              <BsSearch
                className="position-absolute top-50 translate-middle-y text-muted"
                style={{ left: "15px" }}
              />
            </div>
          </div>

          {/* Categories */}
         <div className="row g-4">
              {/* {helpCategories.length > 0 ? (
                helpCategories.map((item, index) => ( */}
             {filteredCategories.length > 0 ? (
                filteredCategories.map((item, index) => (
                <div className="col-md-4" key={index}>
                    <Link to={item.link}>
                    <div className="card h-100 border-0 shadow-sm rounded-4 p-4 text-center hover-shadow">
                        <div className="text-theme fs-2 mb-3">{item.icon}</div>
                        <h5 className="fw-semibold mb-2 text-green">{item.title}</h5>
                        <p className="text-muted small">{item.desc}</p>
                    </div>
                    </Link>
                </div>
                ))
            ) : (
                <div className="col-12 text-center text-muted fw-bold">
                No help topics found for "{searchTerm}"
                </div>
            )}
        </div>

        </div>
      </section>

      <CTA />
      <Footer />
    </>
  );
}
