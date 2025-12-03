// src/components/PropertyByArea.jsx
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const PropertyByArea = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showNav, setShowNav] = useState(true);
  const swiperRef = useRef(null);

  const areas = [

    { id: "vic", title: "Victoria - Downtown Office", desc: "Find commercial property in Australia's most populous state", img: "/images/vic.webp" },

    { id: "nsw", title: "NSW - Sydney Office", desc: "Premium office spaces in Sydney", img: "/images/nsw.webp" },
    
    { id: "qld", title: "Queensland - Brisbane Commercial", desc: "Browse commercial real estate in Brisbane", img: "/images/qld.webp" },  

    { id: "wa", title: "WA - Perth Office", desc: "Explore commercial properties in Perth", img: "/images/wa.webp" },

    { id: "tas", title: "Tasmania - Hobart Retail", desc: "Browse commercial premises in Hobart", img: "/images/tas.webp" },

    { id: "sa", title: "SA - Adelaide Office", desc: "Search for commercial properties in Adelaide", img: "/images/sa.webp" },
   
    { id: "act", title: "ACT - Canberra Office", desc: "Discover commercial properties in Canberra", img: "/images/act.webp" },
   
    { id: "nt", title: "NT - Darwin Commercial", desc: "Explore commercial properties in Darwin", img: "/images/nt.webp" },

  ];



  const filteredAreas = activeTab === "all" ? areas : areas.filter((a) => a.id === activeTab);

  const uniqueStateIds = Array.from(new Set(areas.map(a => a.id)));


  // Function to update navigation visibility based on slidesPerView
  const updateNavigation = () => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current;
    const slidesPerView = swiper.params.slidesPerView;
    setShowNav(filteredAreas.length > slidesPerView);
  };

  useEffect(() => {
    setTimeout(updateNavigation, 100);
  }, [filteredAreas]);

  return (
    <section className="property_by_area">
      <div className="container py-5">
      <h4 className="fw-bold mb-3">Explore properties by area</h4>

       <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
                <button
                className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                onClick={() => setActiveTab("all")}
                >
                All States
                </button>
            </li>
            {uniqueStateIds.map((id) => (
                <li key={id} className="nav-item">
                <button
                    className={`text-uppercase nav-link ${activeTab === id ? "active" : ""}`}
                    onClick={() => setActiveTab(id)}
                >
                    {id}
                </button>
                </li>
            ))}
        </ul>


        <Swiper
          modules={[Navigation]}
          navigation={showNav}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            375: { slidesPerView: 2 },
            576: { slidesPerView: 2},
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 },
            1200: { slidesPerView: 5 },
            1920: { slidesPerView: 6 },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavigation();
            swiper.on("resize", updateNavigation);
          }}
        >
          {filteredAreas.map((a, index) => (
            <SwiperSlide key={index} className="">
              <Link to={`/for-sale/${a.id}`} className="card  border-0 h-100">
                <img
                  src={a.img}
                  alt={a.title}
                  className="rounded-2"
                  style={{ height: 180, objectFit: "cover" }}
                />
                <div className="card-body px-0 pb-0">
                  <h6 className="fw-bold text-truncate">{a.title}</h6>
                  <p className="text-muted small mb-0">{a.desc}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PropertyByArea;
