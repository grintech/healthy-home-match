import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashSidebar from './DashSidebar';

const initialAgents = [
  {
    id: 1,
    name: 'Mark Kalsen',
    role: 'Real Estate Consultant',
    phone: '123-456-7890',
    email: 'mark@example.com',
    image: '/images/agent1.jpg',
    isFollowed: true,
    isContacted: true,
  },
  {
    id: 2,
    name: 'Michael Lee',
    role: 'Rental Specialist',
    phone: '987-654-3210',
    email: 'michael@example.com',
    image: '/images/agent4.jpg',
    isFollowed: false,
    isContacted: false,
  },
  {
    id: 3,
    name: 'Henry Smith',
    role: 'Property Manager',
    phone: '456-789-1230',
    email: 'henry@example.com',
    image: '/images/agent3.jpg',
    isFollowed: false,
    isContacted: false,
  },
  {
    id: 4,
    name: 'Emily Wilson',
    role: ' Real Estate Agent',
    phone: '321-654-9870',
    email: 'emily@example.com',
    image: '/images/agent2.jpg',
    isFollowed: true,
    isContacted: false,
  },
];

const ContactAgents = () => {
  const [agents, setAgents] = useState(initialAgents);

  const toggleFollow = (id) => {
    const updated = agents.map((agent) =>
      agent.id === id ? { ...agent, isFollowed: !agent.isFollowed } : agent
    );
    setAgents(updated);
  };

  const handleContactSubmit = (e, agentId) => {
    e.preventDefault();

    const updated = agents.map((agent) =>
      agent.id === agentId ? { ...agent, isContacted: true } : agent
    );
    setAgents(updated);

    const modal = window.bootstrap.Modal.getInstance(
      document.getElementById(`contactModal${agentId}`)
    );
    if (modal) modal.hide();
  };

  return (
    <>
      <Navbar />

      <div className="container py-5 contact_agents_page">

        <div className="row">
          <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <DashSidebar />
          </div>
          <div className="col-lg-8 col-xl-9 mb-4 mb-lg-0">
            <h2 className="sec-title mb-4">Contacted Agents</h2>
            <div className="row">
              {agents.map((agent) => (
                <div className="col-sm-6 col-xl-4 mb-4" key={agent.id}>
                  <div className="card h-100  overflow-hidden">
                    <div className="row g-0">
                      <div className="col-12 overflow-hidden">
                        <img
                          src={agent.image}
                          alt={agent.name}
                          className="w-100 overflow-hidden"
                        />
                      </div>
                      <div className="col-12 ">
                        <div className="card-body p-3 h-100 d-flex flex-column justify-content-center">
                          <h5 className="card-title fw-semibold mb-1">{agent.name}</h5>
                          <p className="card-text text-muted">{agent.role}</p>
                          <p className="mb-1">
                            <i className="fa-solid fa-phone me-2"></i>
                            <a href={`tel:${agent.phone}`} className="text-decoration-none text_blue">
                              {agent.phone}
                            </a>
                          </p>
                          <p>
                            <i className="fa-solid fa-envelope me-2"></i>
                            <a href={`mailto:${agent.email}`} className="text-decoration-none text_blue">
                              {agent.email}
                            </a>
                          </p>
                          <div className="d-flex align-items-center ">
                            <button
                              onClick={() => toggleFollow(agent.id)}
                              className={`btn btn-sm me-2 ${
                                agent.isFollowed ? 'btn-theme' : 'btn-dark'
                              }`}
                            >
                              {agent.isFollowed ? 'Following' : 'Follow Agent'}
                            </button>

                            <button
                              className="btn btn-green btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target={`#contactModal${agent.id}`}
                            >
                              {agent.isContacted ? 'Contact Again' : 'Contact Agent'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  {/* Modal */}
                  <div
                    className="modal fade"
                    id={`contactModal${agent.id}`}
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title fw-semibold">Contact {agent.name}</h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form onSubmit={(e) => handleContactSubmit(e, agent.id)}>
                          <div className="modal-body px-4">
                            <div className="mb-3">
                              <label className="form-label">Your Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Phone Number</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your number"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Your Email</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Message</label>
                              <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Write your message"
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div className="modal-footer border-0 px-3">
                            <button type="submit" className="btn btn-theme py-3 w-100">
                              Send Message
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* End Modal */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
    </>
  );
};

export default ContactAgents;
