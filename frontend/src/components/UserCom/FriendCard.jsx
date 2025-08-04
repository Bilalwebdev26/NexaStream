import React from "react";
import { LANGUAGE_TO_FLAG } from "../../constant";
import { Link } from "react-router";

// const FriendCard = ({ friends }) => {
//   const getLangFlag = (lang) => {
//     if (!lang) return null;
//     const lowerLang = lang.toLowerCase();
//     const countryCode = LANGUAGE_TO_FLAG[lowerLang];
//     if (countryCode) {
//       return (
//         <img
//           className="h-3 inline-block"
//           src={`https://flagcdn.com/24x18/${countryCode}.png`}
//           alt={`${lowerLang}-flag`}
//         />
//       );
//     }
//   };
//   return (
//     <div className="bg-black w-full overflow-x-auto flex">
//       {friends.friends.map((friend) => (
//         <div className="card p-2 rounded-md w-[200px] lg:w-[300px] bg-white">
//           {/* Img + Name */}
//           <div className="flex items-center gap-3 mb-3 mt-3">
//             <img
//               className="w-10 h-10"
//               src={friend.profilePic}
//               alt={friend.fullName}
//             />
//             <span className="text-xl font-bold text-black">
//               {friend.fullName}
//             </span>
//           </div>
//           <div className="w-full flex items-center gap-2">
//             <div className="w-1/2 border rounded-xl text-center text-black text-xs py-1">
//               <span className="flex items-center justify-center gap-2 text-xs text-black">
//                 {getLangFlag(friend.nativeLanguage)}Native:
//                 <span className="font-semibold">{friend.nativeLanguage}</span>
//               </span>
//             </div>
//             <div className="w-1/2 border rounded-xl text-center  text-xs py-1 px-2">
//               <span className="flex items-center gap-2 justify-center text-xs text-black">
//                 {getLangFlag(friend.learningLanguage)}
//                 Learning :
//                 <span className="font-semibold">{friend.learningLanguage}</span>
//               </span>
//             </div>
//           </div>
//           <Link to={`/chat/${friend._id}`} className="">
//             <button className="w-full text-center border mb-3 bg-black rounded-2xl px-2 py-1 my-3 text-white font-bold">
//               Message
//             </button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

const FriendCard = ({ friends }) => {
  const getLangFlag = (lang) => {
    if (!lang) return null;
    const lowerLang = lang.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[lowerLang];
    if (countryCode) {
      return (
        <img
          className="h-3 inline-block"
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${lowerLang}-flag`}
        />
      );
    }
  };

  return (
    <div className={`overflow-x-auto lg:scrollbar-hide w-full max-w-full`}>
      <div className="flex gap-4 w-max">
        {friends.friends.map((friend) => (
          <div
            key={friend._id}
            className="flex-shrink-0 p-2 rounded-md w-[200px] lg:w-[300px] bg-white border-2 shadow-xl"
          >
            {/* Img + Name */}
            <div className="flex items-center gap-3 mb-3 mt-3">
              <img
                className="w-10 h-10"
                src={friend.profilePic}
                alt={friend.fullName}
              />
              <span className="text-base lg:text-xl font-bold text-black">
                {friend.fullName}
              </span>
            </div>
            {/* Language Info */}
            {/* Native Info */}
            {/* <div className=""> */}

            <div className="w-full flex items-center gap-1">
              <div className="w-1/2">
                 <span className="text-xs font-semibold text-black">
                  Native :{" "}
                </span>
              <div className="w-full border rounded-xl text-center flex items-center justify-center gap-2 text-black text-xs py-1">
               
                <span className=""> {getLangFlag(friend.nativeLanguage)}</span>

                <span className="font-semibold">{friend.nativeLanguage}</span>
              </div>
              </div>
                <div className="w-1/2">
                 <span className="text-xs font-semibold text-black">
                  Learning :{" "}
                </span>
              <div className="w-full border rounded-xl text-center flex items-center justify-center gap-2 text-black text-xs py-1">
               
                <span className=""> {getLangFlag(friend.learningLanguage)}</span>

                <span className="font-semibold">{friend.learningLanguage}</span>
              </div>
              </div>
            </div>
            {/* Message Button */}
            <Link to={`/chat/${friend._id}`} className="">
              <button className="w-full text-center border mb-3 bg-black rounded-2xl px-2 py-1 my-3 text-white font-bold">
                Message
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FriendCard;
