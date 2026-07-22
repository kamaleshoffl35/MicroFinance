import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

function Layout() {

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <>
      <TopNavbar
        handleShow={() => setShowSidebar(!showSidebar)}
      />

      <div className="d-flex layout-wrapper"
       >

        <Sidebar show={showSidebar} />
<div className="content-wrapper"
 style={{
    flex: 1,
    width: "100%",
    minWidth: 0,
    
  }}>
          <Outlet />
        </div>

      </div>
    </>
  );
}

export default Layout;