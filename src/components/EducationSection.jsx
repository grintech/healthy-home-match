import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faStar,
  faHouse,
  faLeaf,
  faWind
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const educationData = [
  {
    title: "Why Healthy Homes?",
    icon: faCircleQuestion,
    description: "Discover why healthy home design is essential for well-being.",
    link: "#"
  },
  {
    title: "What is a 7-Star Home?",
    icon: faStar,
    description: "Learn what makes a 7-star rated home efficient and comfortable.",
    link: "#"
  },
  {
    title: "Understanding Passivhaus",
    icon: faHouse,
    description: "Explore the Passivhaus standard for ultra-low energy buildings.",
    link: "#"
  },
  {
    title: "Understanding GreenStar",
    icon: faLeaf,
    description: "Know how GreenStar ratings assess sustainable buildings.",
    link: "#"
  },
  {
    title: "The Role of Air Quality & Energy Efficiency",
    icon: faWind,
    description: "See how air quality and energy efficiency go hand in hand.",
    link: "#"
  }
];

const EducationSection = () => {
  return (
    <div className="container pb-5">
      <section className="education-section py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-6 ps-4">
              <h2 className="sec-title mb-5 text-white">
                Let’s Find The Right Selling Option For You
              </h2>
              <div className="d-flex flex-column gap-4">
                {educationData.map((item, index) => (
                  <div key={index} className="d-flex align-items-center wrap">
                    <div className="icon-wrapper bg-light-subtle rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: 50, height: 50 }}>
                      <FontAwesomeIcon icon={item.icon} className=" fs-5" />
                    </div>
                  <div>
                    <Link><h6 className="mb-0 fw-semibold text-white">{item.title}</h6></Link>
                    <p className="m-0 text-white">{item.description}</p>
                  </div>
                  </div>
                ))}
              
              </div>
            </div>

          
          
          </div>
        </div>
      </section>
    </div>
  );
};

export default EducationSection;
