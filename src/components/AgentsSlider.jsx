import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {  Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const agents = [
  {
    name: "John Doe",
    agency: "Ray White",
    agencyLogo: "/images/agency1.png",
    img: "/images/agent1.jpg",
  },
  {
    name: "Janny Smith",
    agency: "LJ Hooker",
    agencyLogo: "/images/agency2.png",
    img: "/images/agent2.jpg",
  },
  {
    name: "David Johnson",
    agency: "McGrath",
    agencyLogo: "/images/agency3.png",
    img: "/images/agent3.jpg",
  },
  {
    name: "Emily Clark",
    agency: "Belle Property",
    agencyLogo: "/images/agency4.png",
    img: "/images/agent4.jpg",
  },
  {
    name: "Ketty Wilson",
    agency: "Harcourts",
    agencyLogo: "/images/agency5.png",
    img: "/images/agent5.jpg",
  },
  {
    name: "Jane Smith",
    agency: "Century 21",
    agencyLogo: "/images/agency3.png",
    img: "/images/agent6.jpg",
  },
  {
    name: "Cathy Johnson",
    agency: "First National",
    agencyLogo: "/images/agency4.png",
    img: "/images/agent7.jpg",
  },
];

const AgentsSlider = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 sec-title">Meet Our Agents</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={25}
        // slidesPerView={1}
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
        {agents.map((agent, index) => (
          <SwiperSlide key={index}>
            <div className="item agent_card">
                <div className="team-style1">
                  <Link to="/agent-single">
                    <div className="team-img">
                      <img alt="agent team" src={agent.img} />
                    </div>
                  </Link>
                  <div className="team-content pt-4">
                    <Link to="/agent-single">
                     <h6 className="name mb-2">{agent.name}</h6>
                      </Link>

                      <Link to="/agency-single">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-secondary fw-bold">{agent.agency}</span>
                        {/* <img
                          src={agent.agencyLogo}
                          alt={agent.agency}
                          style={{ height: "45px", width:"45px", objectFit: "cover", border:"1px solid #ccc", borderRadius:"50%" }}
                          className="shadow-sm"
                        /> */}
                      </div>
                      </Link>
                  </div>
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AgentsSlider;
