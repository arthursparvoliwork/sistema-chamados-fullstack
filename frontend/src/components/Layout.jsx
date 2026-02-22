import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BackgroundParticles from "./BackgroundParticles";

export default React.memo(function Layout({ children }) {
  return (
    <>
      <BackgroundParticles />

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "transparent",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(6px)",
          }}
        >
          <Topbar />

          <main
            style={{
              padding: "40px",
              color: "white",
              flex: 1,
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
});
