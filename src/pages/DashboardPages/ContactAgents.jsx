import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DashSidebar from "./DashSidebar";
import api from "../../utils/axios";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as bootstrap from "bootstrap";

/* ================= DUMMY AGENTS ================= */
const initialAgents = [
  {
    id: 1,
    name: "Mark Kalsen",
    role: "Real Estate Consultant",
    phone: "123-456-7890",
    email: "mark@example.com",
    image: "/images/agent1.jpg",
    isFollowed: true,
    isContacted: true,
  },
  {
    id: 2,
    name: "Michael Lee",
    role: "Rental Specialist",
    phone: "987-654-3210",
    email: "michael@example.com",
    image: "/images/agent4.jpg",
    isFollowed: false,
    isContacted: false,
  },
];

const ContactAgents = () => {
  // const [agents, setAgents] = useState(initialAgents);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContactedAgents();
  }, []);

  const fetchContactedAgents = async () => {
    try {
      const res = await api.get("/list-contected-agent");

      if (res.data?.status) {
        const formattedAgents = res.data.data.data.map((item) => ({
          id: item.agent.id,
          contact_id: item.id,
          name: item.agent.name,
          email: item.agent.email,
          phone: item.phone,
          image: item.agent.profile?.profile_image
            ? `https://${item.agent.profile.profile_image}`
            : "/images/default-agent.jpg",
          isFollowed: false,
          isContacted: true,
        }));

        setAgents(formattedAgents);
      }
    } catch (error) {
      toast.error("Failed to load contacted agents");
    } finally {
      setLoading(false);
    }
  };





  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    enquiry_type: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  /* ================= FOLLOW ================= */
  const toggleFollow = (id) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id
          ? { ...agent, isFollowed: !agent.isFollowed }
          : agent
      )
    );
  };

  /* ================= CONTACT AGENT ================= */
  const handleContactSubmit = async (e, agentId) => {
    e.preventDefault();

    const { name, phone, email, enquiry_type, message } = formData;

    if (!name || !phone || !email || !enquiry_type || !message) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        agent_id: agentId,
        name,
        phone,
        email,
        enquiry_type,
        message,
      };

      const res = await api.post("/contact-agent", payload);

      if (res.data?.status) {
        toast.success(res.data.message || "Message sent successfully");

        setAgents((prev) =>
          prev.map((agent) =>
            agent.id === agentId
              ? { ...agent, isContacted: true }
              : agent
          )
        );

        setFormData({
          name: "",
          phone: "",
          email: "",
          enquiry_type: "",
          message: "",
        });

        /* ================= CLOSE MODAL PROPERLY ================= */
        const modalEl = document.getElementById(
          `contactModal${agentId}`
        );

        if (modalEl) {
          const modalInstance =
            bootstrap.Modal.getInstance(modalEl) ||
            new bootstrap.Modal(modalEl);

          modalInstance.hide();
        }

        /* ================= FORCE CLEANUP (IMPORTANT) ================= */
        setTimeout(() => {
          document.body.classList.remove("modal-open");
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";

          document
            .querySelectorAll(".modal-backdrop")
            .forEach((el) => el.remove());
        }, 300);
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Server error. Please try again later");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5 contact_agents_page">
        <div className="row">
          <div className="col-lg-4 col-xl-3 mb-4">
            <DashSidebar />
          </div>

          <div className="col-lg-8 col-xl-9">
            <h2 className="sec-title mb-4">Contacted Agents</h2>

            {loading ? (
              <p>Loading agents...</p>
            ) : agents.length === 0 ? (
              <p>No contacted agents found.</p>
            ) : (
              <div className="row">
                {agents.map((agent) => (
                  <div className="col-sm-6 col-xl-4 mb-4" key={agent.id}>
                    <div className="card h-100 overflow-hidden">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        className="w-100"
                      />

                      <div className="card-body p-3">
                        <h5 className="fw-semibold mb-1">{agent.name}</h5>
                        <p className="text-muted">{agent.role}</p>

                        <div className="d-flex">
                          <button
                            onClick={() => toggleFollow(agent.id)}
                            className={`btn btn-sm me-2 ${agent.isFollowed
                                ? "btn-theme"
                                : "btn-dark"
                              }`}
                          >
                            {agent.isFollowed
                              ? "Following"
                              : "Follow Agent"}
                          </button>

                          <button
                            className="btn btn-green btn-sm"
                            data-bs-toggle="modal"
                            data-bs-target={`#contactModal${agent.id}`}
                          >
                            {agent.isContacted
                              ? "Contact Again"
                              : "Contact Agent"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ================= MODAL ================= */}
                    <div
                      className="modal fade"
                      id={`contactModal${agent.id}`}
                      tabIndex="-1"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              Contact {agent.name}
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                            ></button>
                          </div>

                          <form
                            onSubmit={(e) =>
                              handleContactSubmit(e, agent.id)
                            }
                          >
                            <div className="modal-body px-4">
                              <input
                                className="form-control mb-3"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    name: e.target.value,
                                  })
                                }
                              />

                              <div className="mb-3">
                                <PhoneInput
                                  country="au"
                                  value={formData.phone}
                                  onChange={(phone) =>
                                    setFormData({
                                      ...formData,
                                      phone: `+${phone}`,
                                    })
                                  }
                                  inputStyle={{
                                    width: "100%",
                                    height: "45px",
                                  }}
                                  placeholder="Phone Number"
                                  countryCodeEditable={false}
                                />
                              </div>

                              <input
                                className="form-control mb-3"
                                placeholder="Your Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    email: e.target.value,
                                  })
                                }
                              />

                              <select
                                className="form-select mb-3"
                                value={formData.enquiry_type}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    enquiry_type: e.target.value,
                                  })
                                }
                              >
                                <option value="">
                                  Select Enquiry Type
                                </option>
                                <option value="General Enquiry">
                                  General Enquiry
                                </option>
                                <option value="Sell a Property">
                                  Sell a Property
                                </option>
                                <option value="Advertise a Property">
                                  Advertise a Property
                                </option>
                              </select>

                              <textarea
                                className="form-control"
                                rows="3"
                                placeholder="Write your message"
                                value={formData.message}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    message: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="modal-footer border-0">
                              <button
                                className="btn btn-theme w-100 py-3"
                                disabled={submitting}
                              >
                                {submitting
                                  ? "Submitting..."
                                  : "Send Message"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    {/* ================= END MODAL ================= */}
                  </div>
                ))}
              </div>

            )}

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ContactAgents;
