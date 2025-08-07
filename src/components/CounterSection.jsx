import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CounterSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // runs only once
    threshold: .4, // 40% visible
  });

  return (
    <div ref={ref} className="row text-center counter_section py-4">
      {/* Card 1 */}
      <div className="col-6 col-md-3 mb-4">
        <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center justify-content-center">
          <i className="fas fa-users"></i>
          <h4 className="fw-bold mb-1">
            {inView && <CountUp end={1200} duration={4} separator="," />}+
          </h4>
          <p className="text-muted mb-0">Happy Clients</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-6 col-md-3 mb-4">
        <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center justify-content-center">
          <i className="fas fa-home"></i>
          <h4 className="fw-bold mb-1">
            {inView && <CountUp end={850} duration={3} separator="," />}+
          </h4>
          <p className="text-muted mb-0">Properties Listed</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="col-6 col-md-3 mb-4">
        <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center justify-content-center">
          <i className="fas fa-briefcase"></i>
          <h4 className="fw-bold mb-1">
            {inView && <CountUp end={95} duration={5} />}%
          </h4>
          <p className="text-muted mb-0">Success Rate</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="col-6 col-md-3 mb-4">
        <div className="card border-0 shadow-sm p-4 h-100 d-flex flex-column align-items-center justify-content-center">
          <i className="fas fa-award"></i>
          <h4 className="fw-bold mb-1">
            {inView && <CountUp end={30} duration={4} />}+
          </h4>
          <p className="text-muted mb-0">Awards Won</p>
        </div>
      </div>
    </div>
  );
};

export default CounterSection;
