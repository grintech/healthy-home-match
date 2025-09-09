import React from "react";
import Skeleton from "react-loading-skeleton";

const AgencySkeleton = () => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="agency-style1 p-2 border rounded-4">
        <div className="agency-img position-relative">
          <Skeleton height={200} className="rounded-2 w-100" />

          <div
            className="position-absolute top-0 start-0 m-2  rounded text-white d-flex align-items-center justify-content-center"
          >
            <Skeleton
              width={80}
              height={20}
              baseColor="rgba(255,255,255,0.5)"
              highlightColor="#fff"
              borderRadius={4}
            />
          </div>
        </div>

        {/* Details */}
        <div className="agency-details pt-4">
          <Skeleton width={50} height={16} />

          <div className="mt-2">
            <Skeleton width="80%" height={20} />
          </div>

          <div className="mt-2">
            <Skeleton width="100%" height={16} />
          </div>

          <div className="mt-3">
            <Skeleton className="w-100" height={50} borderRadius={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencySkeleton;
