import React from "react";

const RecommendUserSkeleton = () => {
  const skeletonArray = new Array(8).fill(0); // 8 skeleton cards

  return (
    <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {skeletonArray.map((_, idx) => (
        <div
          key={idx}
          className="border p-2 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-md"
        >
          {/* Profile Info */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-14 h-14 bg-gray-400 rounded-full" />
            <div className="flex-1 space-y-1">
              <div className="w-24 h-3 bg-gray-400 rounded" />
              <div className="w-20 h-2 bg-gray-300 rounded" />
            </div>
          </div>

          {/* Languages */}
          <div className="flex gap-2 mb-2">
            <div className="w-1/2 space-y-1">
              <div className="w-16 h-2 bg-gray-400 rounded" />
              <div className="w-full h-6 bg-gray-300 rounded-xl" />
            </div>
            <div className="w-1/2 space-y-1">
              <div className="w-16 h-2 bg-gray-400 rounded" />
              <div className="w-full h-6 bg-gray-300 rounded-xl" />
            </div>
          </div>

          {/* Bio */}
          <div className="w-full h-3 bg-gray-300 rounded my-2" />

          {/* Button */}
          <div className="w-full h-8 bg-gray-400 rounded-2xl" />
        </div>
      ))}
    </div>
  );
};

export default RecommendUserSkeleton;
