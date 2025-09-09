import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AgencySingleSkeleton = () => {
  return (
    <div className="agency_single">
      {/* Top Banner Section */}
      <div className="cta-agency">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8">
              <div className=" agent-single d-sm-flex align-items-center">
                {/* Agency Logo */}
                <div className="row align-items-center w-100">
                    <div className="col-5 col-sm-4 col-md-3 mb-4 mb-sm-0">
                        <div className="single-img d-flex align-items-center" >
                         <Skeleton className="d-none d-sm-block" style={{zIndex:"99"}} circle width={140} height={140} />
                         <Skeleton className="d-block d-sm-none" style={{zIndex:"99"}} circle width={120} height={120} />
                        </div>
                    </div>
                    <div className="col-sm-8">
                    <div className="single-contant ms-4">
                    <Skeleton className="w-100"  height={25} />
                    <Skeleton  height={20} className="mt-2 w-75" />
                    <div className="d-flex flex-wrap gap-3 mt-3">
                        <Skeleton width={120} height={20} />
                        <Skeleton width={120} height={20} />
                        <Skeleton width={150} height={20} />
                    </div>
                    </div>

                    </div>

                </div>
              </div>
              <div className="img-box-12 position-relative d-none d-xl-block"><img className="img-1" alt="svg image" src="/images/agency-single.png" /><img className="img-2" alt="svg image" src="/images/agency-single1.png" /></div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <div className="row py-5">
          {/* Left Side */}
          <div className="col-lg-8 mb-4 mb-lg-0 pe-lg-5">
            {/* About Agency */}
            <div className="agent-single-details pb30 bdrb1 pb-3">
              <h5 className="mb-3 fw-bold">About Agency</h5>
              <Skeleton count={3} />
              <Skeleton width={120} />
            </div>

            {/* Listing Section */}
            <div className="row align-items-baseline mt-4">
              <div className="col-sm-4">
                <Skeleton width={100} height={25} />
              </div>
              <div className="col-sm-8 d-flex justify-content-end">
                <Skeleton width={300} height={35} />
              </div>
            </div>

            <div className="row py-4 g-4">
              {[1, 2].map((i) => (
                <div className="col-md-6" key={i}>
                  <div className="card shadow-sm p-2">
                    <Skeleton height={150} className="w-100" />
                    <div className="mt-2">
                      <Skeleton width={`80%`} />
                      <Skeleton width={`60%`} />
                      <Skeleton width={`50%`} />
                      <Skeleton width={100} height={30} className="mt-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Agents Section */}
            <h5 className="fw-bold mb-3">Our Agents</h5>
            <div className="row g-4">
              {[1, 2, 3].map((i) => (
                <div className="col-lg-4 col-sm-4 col-6" key={i}>
                  <Skeleton  height={150} className="w-100" />
                  <Skeleton width={`70%`} className="mt-3" />
                  <Skeleton width={`50%`} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Contact Form */}
            <div className="card p-3 mb-4">
              <h5 className="fw-bold mb-3">Contact Form</h5>
              <Skeleton height={40} className="mb-2" />
              <Skeleton height={40} className="mb-2" />
              <Skeleton height={40} className="mb-2" />
              <Skeleton height={80} className="mb-3" />
              <Skeleton width={`60%`} height={40} />
            </div>

            {/* Professional Info */}
            <div className="card p-3">
              <h6 className="fw-bold mb-2">Professional Information</h6>
              {[1, 2, 3,4].map((i) => (
              <div className="row justify-content-between mt-2" key={i}>
                <div className="col-4">
                 <Skeleton height={15} className="w-100" />   
                </div>
                <div className="col-8">
                 <Skeleton height={15} className="w-100" />   
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencySingleSkeleton;
