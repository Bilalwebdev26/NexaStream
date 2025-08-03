// import React from "react";
// import SideBar from "./SideBar";
// import NavBar from "./NavBar";
// import { useSideBarStore } from "../../store/globalState";

// const Layout = ({ children, showsidebar }) => {
//   //const { showsidebar } = useSideBarStore();
//   console.log("SHow side bar from Layout : ", showsidebar);
//   return (
//     <div className="min-h-screen">
//       <div className="flex">
//         <div className="flex z-50">{showsidebar && <SideBar />}</div>
//         <div className="flex-1 flex flex-col">
//           <NavBar />
//           <main className="flex-1 overflow-y-auto">{children}</main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { useSideBarStore } from "../../store/globalState";

const Layout = ({ children, showsidebar }) => {
  //const { showsidebar } = useSideBarStore();
  console.log("SHow side bar from Layout : ", showsidebar);
  return (
    <div className="min-h-screen flex">
      <div className="flex">
        {/* <div className="flex z-50">{showsidebar && <SideBar />}</div> */}
        <div className="flex-1 flex flex-col">
          <NavBar />
          <main className="">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
