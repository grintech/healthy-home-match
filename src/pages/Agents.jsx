import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Agents = () => {

    const [activeTabs, setActiveTabs] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 18000000]);
    const [specialties, setSpecialties] = useState([]);

    const tabs = ["Top Rated", "Buying", "Selling"];

    const toggleTab = (tab) => {
        setActiveTabs((prev) =>
            prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
        );
    };

    const toggleSpecialty = (option) => {
        setSpecialties((prev) =>
            prev.includes(option)
                ? prev.filter((s) => s !== option)
                : [...prev, option]
        );
    };

    const applyFilters = () => {
        console.log("Applied Price:", priceRange);
        console.log("Applied Specialties:", specialties);
    };

    return (
        <div className="all_agents_page">
            <Navbar />
            <div className="cta-agency cta-agent">
                <div className="container">
                    <h1 className="sec-title mb-4">Real estate agents</h1>
                    <form action="" className="search_agent_form">
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" className="form-control" placeholder="City, Province, State , Zipcode" />
                            </div>
                            <div className="col-md-4">
                                <input type="text" className="form-control" placeholder="Agent Name" />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-theme w-100"><i className="fa-solid fa-magnifying-glass"></i> Find agent </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="all_agents py-4">
                <div className="container">
                    <div className="agents_section py-4">
                        <h6 className=" mb-3">4 Agents Found</h6>

        
                        <div className="agent_filter_tabs d-flex align-items-center gap-3 flex-wrap">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    className={`btn ${activeTabs.includes(tab) ? "btn-active" : "btn-light"}`}
                                    onClick={() => toggleTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}


                            <div className="dropdown">
                                <button
                                    className="btn btn-light dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    Price Range
                                </button>
                                <div
                                    className="dropdown-menu p-3"
                                    style={{ minWidth: "250px" }}
                                    onClick={(e) => e.stopPropagation()} // <-- Keep dropdown open
                                >
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>${priceRange[0].toLocaleString()}</span>
                                        <span>${priceRange[1] >= 18000000 ? "18M+" : priceRange[1].toLocaleString()}</span>
                                    </div>
                                    <Slider
                                        range
                                        min={0}
                                        max={18000000}
                                        step={10000}
                                        value={priceRange}
                                        onChange={setPriceRange}

                                    />
                                    <button
                                        className="btn btn-active w-100 mt-3"
                                        onClick={applyFilters}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>


                            <div className="dropdown">
                                <button
                                    className="btn btn-light dropdown-toggle"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                >
                                    Specialty
                                </button>
                                <ul
                                    className="dropdown-menu p-2"
                                    onClick={(e) => e.stopPropagation()} // <-- Prevent auto-close
                                >
                                    {["First Time Buyers", "Rental", "Luxury Homes", "New Construction", "Land"].map(
                                        (option) => (
                                            <li key={option}>
                                                <label className="dropdown-item d-flex align-items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={specialties.includes(option)}
                                                        onChange={() => toggleSpecialty(option)}
                                                        className="me-2"
                                                    />
                                                    {option}
                                                </label>
                                            </li>
                                        )
                                    )}
                                    <li>
                                        <button
                                            className="btn btn-active w-100 mt-2"
                                            onClick={applyFilters}
                                        >
                                            Apply
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            <Link><i className="fa-solid fa-rotate"></i> Reset all filters</Link>
                        </div>

                        <div className="row g-4 g-xxl-5 mt-4">
                            <div className=" col-lg-3 col-md-4 col-6 single-agent-card ">
                                <div className="item agent_card h-100">
                                    <Link to="/agent-single">
                                        <div className="team-style1">
                                            <div className="team-img">
                                                <img
                                                    alt="agent team"
                                                    src="/images/agent1.jpg"
                                                />
                                            </div>
                                            <div className="team-content">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="name mb-0">Eden Markram</h6>
                                                    <span className="small text-dark d-flex align-items-baseline">5 <i className="fa-solid fa-star text-theme small"></i> (20)</span>
                                                </div>
                                                <p className="text fz15 mb-1 text-dark">Inc Real State</p>
                                                <p className="mb-0" >Price Range: <b>$15K - $500K</b></p>
                                                <p className="mb-0">Sold Properties: <b>(24)</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className=" col-lg-3 col-md-4 col-6 single-agent-card ">
                                <div className="item agent_card h-100">
                                    <Link to="/agent-single">
                                        <div className="team-style1">
                                            <div className="team-img">
                                                <img
                                                    alt="agent team"
                                                    src="/images/agent2.jpg"
                                                />
                                            </div>
                                            <div className="team-content">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="name mb-0">Joe Marry Murphy</h6>
                                                    <span className="small text-dark d-flex align-items-baseline">5 <i className="fa-solid fa-star text-theme small"></i> (20)</span>
                                                </div>
                                                <p className="text fz15 mb-1 text-dark">Keller Reality-AV</p>
                                                <p className="mb-0" >Price Range: <b>$25K - $770K</b></p>
                                                <p className="mb-0">Sold Properties: <b>(57)</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className=" col-lg-3 col-md-4 col-6 single-agent-card ">
                                <div className="item agent_card h-100">
                                    <Link to="/agent-single">
                                        <div className="team-style1">
                                            <div className="team-img">
                                                <img
                                                    alt="agent team"
                                                    src="/images/agent4.jpg"
                                                />
                                            </div>
                                            <div className="team-content">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="name mb-0">Emily Wilson</h6>
                                                    <span className="small text-dark d-flex align-items-baseline">4.5 <i className="fa-solid fa-star text-theme small"></i> (20)</span>
                                                </div>
                                                <p className="text fz15 mb-1 text-dark">Luxury collective house</p>
                                                <p className="mb-0" >Price Range: <b>$20K - $300K</b></p>
                                                <p className="mb-0">Sold Properties: <b>(48)</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className=" col-lg-3 col-md-4 col-6 single-agent-card ">
                                <div className="item agent_card h-100">
                                    <Link to="/agent-single">
                                        <div className="team-style1">
                                            <div className="team-img">
                                                <img
                                                    alt="agent team"
                                                    src="/images/agent3.jpg"
                                                />
                                            </div>
                                            <div className="team-content">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="name mb-0">George Mendis</h6>
                                                    <span className="small text-dark d-flex align-items-baseline">4.8 <i className="fa-solid fa-star text-theme small"></i> (50)</span>
                                                </div>
                                                <p className="text fz15 mb-1 text-dark">West Coastal Reality</p>
                                                <p className="mb-0" >Price Range: <b>$15K - $500K</b></p>
                                                <p className="mb-0">Sold Properties: <b>(24)</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className=" col-lg-3 col-md-4 col-6 single-agent-card ">
                                <div className="item agent_card h-100">
                                    <Link to="/agent-single">
                                        <div className="team-style1">
                                            <div className="team-img">
                                                <img
                                                    alt="agent team"
                                                    src="/images/agent1.jpg"
                                                />
                                            </div>
                                            <div className="team-content">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="name mb-0">Eden Markram</h6>
                                                    <span className="small text-dark d-flex align-items-baseline">5 <i className="fa-solid fa-star text-theme small"></i> (20)</span>
                                                </div>
                                                <p className="text fz15 mb-1 text-dark">Inc Real State</p>
                                                <p className="mb-0" >Price Range: <b>$15K - $500K</b></p>
                                                <p className="mb-0">Sold Properties: <b>(24)</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className=" col-lg-3 col-md-4 col-6 single-agent-card ">
                                <div className="item agent_card h-100">
                                    <Link to="/agent-single">
                                        <div className="team-style1">
                                            <div className="team-img">
                                                <img
                                                    alt="agent team"
                                                    src="/images/agent2.jpg"
                                                />
                                            </div>
                                            <div className="team-content">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="name mb-0">Joe Marry Murphy</h6>
                                                    <span className="small text-dark d-flex align-items-baseline">5 <i className="fa-solid fa-star text-theme small"></i> (20)</span>
                                                </div>
                                                <p className="text fz15 mb-1 text-dark">Keller Reality-AV</p>
                                                <p className="mb-0" >Price Range: <b>$25K - $770K</b></p>
                                                <p className="mb-0">Sold Properties: <b>(57)</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className=" col-lg-3 col-md-4 col-6 single-agent-card ">
                                <div className="item agent_card h-100">
                                    <Link to="/agent-single">
                                        <div className="team-style1">
                                            <div className="team-img">
                                                <img
                                                    alt="agent team"
                                                    src="/images/agent4.jpg"
                                                />
                                            </div>
                                            <div className="team-content">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="name mb-0">Emily Wilson</h6>
                                                    <span className="small text-dark d-flex align-items-baseline">4.5 <i className="fa-solid fa-star text-theme small"></i> (20)</span>
                                                </div>
                                                <p className="text fz15 mb-1 text-dark">Luxury collective house</p>
                                                <p className="mb-0" >Price Range: <b>$20K - $300K</b></p>
                                                <p className="mb-0">Sold Properties: <b>(48)</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className=" col-lg-3 col-md-4 col-6 single-agent-card ">
                                <div className="item agent_card h-100">
                                    <Link to="/agent-single">
                                        <div className="team-style1">
                                            <div className="team-img">
                                                <img
                                                    alt="agent team"
                                                    src="/images/agent3.jpg"
                                                />
                                            </div>
                                            <div className="team-content">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <h6 className="name mb-0">George Mendis</h6>
                                                    <span className="small text-dark d-flex align-items-baseline">4.8 <i className="fa-solid fa-star text-theme small"></i> (50)</span>
                                                </div>
                                                <p className="text fz15 mb-1 text-dark">West Coastal Reality</p>
                                                <p className="mb-0" >Price Range: <b>$15K - $500K</b></p>
                                                <p className="mb-0">Sold Properties: <b>(24)</b></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-4">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <Link className="page-link" to="#" aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </Link>
                                </li>
                                <li className="page-item"><Link className="page-link active" to="#">1</Link></li>
                                <li className="page-item"><Link className="page-link " to="#">2</Link></li>
                                <li className="page-item">
                                    <Link className="page-link" to="#" aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Agents