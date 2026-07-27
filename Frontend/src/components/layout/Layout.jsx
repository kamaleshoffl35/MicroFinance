import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

function Layout() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <TopNavbar handleShow={() => setShowSidebar(!showSidebar)} />

      <div className="d-flex layout-wrapper">
        <Sidebar show={showSidebar} />
        <div className="content-wrapper flex-fill w-100 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
