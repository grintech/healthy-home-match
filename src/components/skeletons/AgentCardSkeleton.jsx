import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AgentCardSkeleton = () => {
  return (
    <div className="col-lg-3 col-md-4 col-6 single-agent-card">
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <div className="border rounded-3 p-3 mb-3" >
        {/* Avatar */}
          <Skeleton  width={`100%`} height={140} />
       
        {/* Name + rating */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Skeleton width={100} height={16} />
          <Skeleton width={50} height={16} />
        </div>

        <div className="mt-2">
            <Skeleton width={`100%`} height={14} />
        </div>

        {[1, 2, 3].map((i) => (
            <div className="row justify-content-between mt-2" key={i}>
            <div className="col-5">
                <Skeleton height={15} className="w-100" />   
            </div>
            <div className="col-7">
                <Skeleton height={15} className="w-100" />   
            </div>
            </div>
         ))}
      </div>
    </SkeletonTheme>

    </div>
  );
};

export default AgentCardSkeleton;
