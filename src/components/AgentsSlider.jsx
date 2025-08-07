import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {  Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const agents = [
  {
    name: "John Doe",
    role: "Senior Agent",
    img: "/images/agent1.jpg",
  },
  {
    name: "Janny Smith",
    role: "Real Estate Expert",
    img: "/images/agent2.jpg",
  },
  {
    name: "David Johnson",
    role: "Agent",
    img: "/images/agent3.jpg",
  },
  {
    name: "Emily Clark",
    role: "Senior Advisor",
    img: "/images/agent4.jpg",
  },
  {
    name: "Ketty Wilson",
    role: "Senior Agent",
    img: "/images/agent5.jpg",
  },
  {
    name: "Jane Smith",
    role: "Real Estate Expert",
    img: "/images/agent6.jpg",
  },
  {
    name: "Cathy Johnson",
    role: "Agent",
    img: "/images/agent7.jpg",
  },
];

const AgentsSlider = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">Meet Our Agents</h2>
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
              <Link to="/agent-single">
                <div className="team-style1">
                  <div className="team-img">
                    <img alt="agent team" src={agent.img} />
                  </div>
                  <div className="team-content pt-4">
                    <h6 className="name mb-1">{agent.name}</h6>
                    <p className="text fz15 mb-0">{agent.role}</p>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AgentsSlider;
