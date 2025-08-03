import React from "react";

const FriendSkeleton = () => {
  return (
    <div className="overflow-x-auto scrollbar-hide w-full max-w-full">
      <div className="flex gap-4 w-max">
        {/* Generate 5 skeleton cards */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 p-2 rounded-md w-[200px] lg:w-[300px] bg-white border-2 shadow-xl animate-pulse"
          >
            {/* Profile Image + Name Skeleton */}
            <div className="flex items-center gap-3 mb-6 mt-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="h-5 bg-gray-300 rounded w-24 lg:w-32"></div>
            </div>

            {/* Language Info Skeleton */}
            <div className="w-full flex items-center gap-1">
              {/* Native Language Section */}
              <div className="w-1/2">
                <div className="h-3 bg-gray-300 rounded w-12 mb-1"></div>
                <div className="w-full border rounded-xl flex items-center justify-center gap-2 py-1">
                  <div className="w-4 h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-12"></div>
                </div>
              </div>

              {/* Learning Language Section */}
              <div className="w-1/2">
                <div className="h-3 bg-gray-300 rounded w-14 mb-1"></div>
                <div className="w-full border rounded-xl flex items-center justify-center gap-2 py-1">
                  <div className="w-4 h-3 bg-gray-300 rounded"></div>
                  <div className="h-3 bg-gray-300 rounded w-12"></div>
                </div>
              </div>
            </div>

            {/* Message Button Skeleton */}
            <div className="w-full h-8 bg-gray-300 rounded-2xl my-3"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendSkeleton;