import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {  Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AgentCardSkeleton from "./skeletons/AgentCardSkeleton";
import { BiSearchAlt2 } from "react-icons/bi";
import api from "../utils/axios";

// const agents = [
//   {
//     name: "John Doe",
//     agency: "Ray White",
//     agencyLogo: "/images/agency1.png",
//     img: "/images/agent1.jpg",
//   },
//   {
//     name: "Janny Smith",
//     agency: "LJ Hooker",
//     agencyLogo: "/images/agency2.png",
//     img: "/images/agent2.jpg",
//   },
//   {
//     name: "David Johnson",
//     agency: "McGrath",
//     agencyLogo: "/images/agency3.png",
//     img: "/images/agent3.jpg",
//   },
//   {
//     name: "Emily Clark",
//     agency: "Belle Property",
//     agencyLogo: "/images/agency4.png",
//     img: "/images/agent4.jpg",
//   },
//   {
//     name: "Ketty Wilson",
//     agency: "Harcourts",
//     agencyLogo: "/images/agency5.png",
//     img: "/images/agent5.jpg",
//   },
//   {
//     name: "Jane Smith",
//     agency: "Century 21",
//     agencyLogo: "/images/agency3.png",
//     img: "/images/agent6.jpg",
//   },
//   {
//     name: "Cathy Johnson",
//     agency: "First National",
//     agencyLogo: "/images/agency4.png",
//     img: "/images/agent7.jpg",
//   },
// ];

const AgentsSlider = () => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchAgents = async () => {
        try {
          setLoading(true);
      
          const res = await api.get(`/agents/listing/`);

          if (res.data.success) {
            setAgents(res.data.data);
            console.log(res.data.data);
          } else {
            setAgents([]);
          }
        } catch (err) {
          console.error("API Error:", err);
          setAgents([]);
        } finally {
          setLoading(false);
        }
      };
      fetchAgents();
    },[])

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 sec-title">Meet Our Agents</h2>
         {loading ? (
           <div className="row g-4 g-xxl-5">
                {[...Array(4)].map((_, i) => (
                  <AgentCardSkeleton key={i} />
                ))}
              </div>
            ) : agents.length > 0 ? (
              <Swiper
                modules={[Autoplay]}
                spaceBetween={25}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 3000 }}
                loop= {true}
                breakpoints={{
                  375: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  992: { slidesPerView: 4 },
                  1200: { slidesPerView: 5 },
                }}
              >
             { agents.map((agent, index) => (
                <SwiperSlide key={index}>
                   <div className="item agent_card h-100">
                        <Link to={`/agent/${agent.slug}`}>
                          <div className="team-style1">
                            <div className="team-img">
                              <img
                                alt={agent.slug}
                                src={agent.profile_image ? `https://${agent.profile_image}` : "/images/default_img.png"}
                              />
                            </div>
                            <div className="team-content mt-2">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <h6 className="name mb-0 text-truncate">{agent.user.name}</h6>
                                <span className="small text-dark d-flex align-items-baseline">
                                  4.5 <i className="fa-solid fa-star text-theme small"></i> (20)
                                </span>
                              </div>
                              {/* <p className="mb-0">Real Estate Agency</p> */}

                              {agent.price_range && (
                                <p className="mb-0">
                                  Price Range: <b>AUD {agent.price_range}</b>
                                </p>
                              )}
                              {/* <p className="mb-0">Sold Properties: <b>(48)</b></p> */}
                            </div>
                          </div>
                        </Link>
                      </div>
                </SwiperSlide>
               ))}
               </Swiper>
            ):(
                 <div className="card border-0 d-flex flex-column justify-content-center align-items-center bg-light rounded-3 py-4">
                  <BiSearchAlt2 size={40} className="text-danger mb-2" />
                  <h6 className="text-danger fw-bold m-0">No agent found</h6>
                </div>
          )}
       
    </div>
  );
};

export default AgentsSlider;
