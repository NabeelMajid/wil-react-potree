import { useContext, useEffect } from "react";
import { PotreeViewerContext } from "../App";
import { addAllMeasurments, addAllProfiles, addAllVolumes, getCookie } from "../utils";
/* eslint-disable */
const PointCloud = ({ src, name }) => {
  const [viewer, setViewer] = useContext(PotreeViewerContext);

  useEffect(() => {
    if (viewer) {
      window.Potree.loadPointCloud(src, name, function (e) {
        let scene = viewer?.scene;
        let pointcloud = e.pointcloud;

        let material = pointcloud.material;
        material.size = 1;
        material.pointSizeType = window.Potree.PointSizeType.ADAPTIVE;
        material.shape = window.Potree.PointShape.SQUARE;

        scene.addPointCloud(pointcloud);

        e.pointcloud.position.z = 0;

        let data = getCookie("mesurments");
        data = data ? JSON.parse(data) : {};
        addAllMeasurments(viewer, data);
        addAllVolumes(viewer, data);
        addAllProfiles(viewer, data);

        viewer.fitToScreen();
      });
    }
  });

  return null;
};

export default PointCloud;
