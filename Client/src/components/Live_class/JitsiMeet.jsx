import React, { useEffect } from "react";

const JitsiMeet = ({ roomName, user }) => {
  const containerStyle = "w-full h-[600px] rounded-lg shadow-lg";

  useEffect(() => {
    // Load Jitsi script dynamically
    if (window.JitsiMeetExternalAPI) {
      startJitsi();
    } else {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = startJitsi;
      document.body.appendChild(script);
    }

    function startJitsi() {
      const domain = "meet.jit.si";
      const options = {
        roomName: roomName,
        width: "100%",
        height: "100%",
        parentNode: document.getElementById("jitsi-container"),
        userInfo: {
          displayName: user.name,
          email: user.email,
        },
        configOverwrite: {
          disableSimulcast: false,
          enableWelcomePage: false,
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
        },
      };
      new window.JitsiMeetExternalAPI(domain, options);
    }

    return () => {
      // Cleanup
      const jitsiContainer = document.getElementById("jitsi-container");
      if (jitsiContainer) jitsiContainer.innerHTML = "";
    };
  }, [roomName, user]);

  return <div id="jitsi-container" className={containerStyle} />;
};

export default JitsiMeet;