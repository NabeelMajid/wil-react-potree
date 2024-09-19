import { useEffect, useContext } from "react";
import { PotreeViewerContext } from "../App";
import { clearCookie, createCookieInHour, getMeasurments, getProfile, getvolumes } from "../utils";
/* eslint-disable */
const PotreeViewer = ({ showSidebar, children }) => {
  const [viewer, setViewer] = useContext(PotreeViewerContext);

  useEffect(() => {
    const localViewer = new window.Potree.Viewer(document.getElementById("potree_render_area"));
    setViewer(localViewer);

    localViewer.setEDLEnabled(true);
    localViewer.setFOV(60);
    localViewer.setPointBudget(1_000_000);
    localViewer.loadSettingsFromURL();
    localViewer.setDescription("React Potree");

    localViewer.loadGUI(() => {
      localViewer.setLanguage("en");
      window.$("#menu_appearance").next().show();
      if (showSidebar) {
        localViewer.toggleSidebar();
      }
    });

    const liElement = document.getElementById("potree_render_area");

    liElement.addEventListener("click", function () {
      const measurments = getMeasurments(localViewer);
      const volumes = getvolumes(localViewer);
      const profiles = getProfile(localViewer);

      const data = {
        measurments,
        volumes,
        profiles,
      };
      createCookieInHour("mesurments", JSON.stringify(data), 24);
    });

    let attachEventListnerRetryTime = 0;
    function addClickListenerToElement() {
      const element = document.querySelector('img[data-i18n="[title]tt.remove_all_measurement"]');

      if (element) {
        element.addEventListener("click", function () {
          clearCookie("mesurments");
        });
      } else if (attachEventListnerRetryTime <= 1) {
        setTimeout(addClickListenerToElement, 1000); // Retry after 1 second
      }
      ++attachEventListnerRetryTime;
    }

    // Call the function to add the click listener
    addClickListenerToElement();
  }, []);

  return (
    <>
      {children}
      <div
        className='potree_container'
        style={{
          position: "absolute",
          width: " 100%",
          height: "100%",
          left: " 0px",
          top: "0px",
        }}
      >
        <div id='potree_render_area'></div>
        <div id='potree_sidebar_container'> </div>
      </div>
    </>
  );
};

export default PotreeViewer;
