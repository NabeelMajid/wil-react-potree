import logo from "./logo.svg";
import "./App.css";

import PotreeViewer from "./components/PotreeViewer";
import PointCloud from "./components/PointCloud";
import { createContext, useState } from "react";

const PotreeViewerContext = createContext();

function App() {
  const [viewer, setViewer] = useState();

  return (
    <PotreeViewerContext.Provider value={[viewer, setViewer]}>
      <PotreeViewer showSidebar={true}>
        <PointCloud
          src={
            "http://5.9.65.151/mschuetz/potree/resources/pointclouds/opentopography/CA13_1.4/cloud.js"
          }
          name={"ca13"}
        />
      </PotreeViewer>
    </PotreeViewerContext.Provider>
  );
}

export default App;
export { PotreeViewerContext };
