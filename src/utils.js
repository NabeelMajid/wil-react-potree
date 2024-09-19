const createCookieInHour = (cookieName, cookieValue, hourToExpire = 24) => {
  let date = new Date();
  date.setTime(date.getTime() + hourToExpire * 60 * 60 * 1000);
  document.cookie = `${cookieName}=${cookieValue}; expires = ${date.toGMTString()}`;
};

function getCookie(cookieName) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();

    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return null;
}

function clearCookie(cookieName) {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const getMeasurments = ({ scene: { measurements = [] } }) => {
  const pointCloudMeasurements = measurements.map((measure) => {
    const {
      name,
      points,
      visible,
      _closed: closed,
      _showAngles: showAngles,
      _showArea: showArea,
      _showAzimuth: showAzimuth,
      _showCircle: showCircle,
      _showCoordinates: showCoordinates,
      _showDistances: showDistances,
      _showEdges: showEdges,
      _showHeight: showHeight,
    } = measure;

    const pointMarkers = points.map((pointAxis) => pointAxis.position.toArray());

    return {
      name,
      pointMarkers,
      visible,
      closed,
      showAngles,
      showArea,
      showAzimuth,
      showCircle,
      showCoordinates,
      showDistances,
      showEdges,
      showHeight,
    };
  });

  return pointCloudMeasurements;
};

const getProfile = ({ scene: { profiles = [] } }) => {
  const pointCloudProfile = profiles.map((profile) => {
    const { name, points, visible, height, width } = profile;

    const pointMarkers = [...points].map((pointAxis) => pointAxis.toArray());

    return {
      name,
      pointMarkers,
      visible,
      height,
      width,
    };
  });
  return pointCloudProfile;
};

const getvolumes = ({ scene: { volumes = [] } }) => {
  const pointCloudVolumes = volumes.map((volume) => {
    const {
      name,
      position,
      rotation,
      scale,
      _modifiable: modifiable,
      _visible: visible,
      _clip: clip,
      sphere,
    } = volume;

    const positionPoints = position.toArray();
    const rotationPoints = rotation.toArray();
    const scalePoints = scale.toArray();

    return {
      name,
      positionPoints,
      rotationPoints,
      scalePoints,
      modifiable,
      visible,
      clip,
      closed,
      sphere,
    };
  });

  return pointCloudVolumes;
};

const addAllMeasurments = (viewer, { measurments = [] }) => {
  measurments?.forEach((measure) => {
    let measurement = new window.Potree.Measure();
    measure.pointMarkers.forEach((marker) => {
      measurement.addMarker(new window.THREE.Vector3(marker[0], marker[1], marker[2]));
    });

    const {
      name,
      visible,
      closed,
      showAngles,
      showArea,
      showAzimuth,
      showCircle,
      showCoordinates,
      showDistances,
      showEdges,
      showHeight,
    } = measure;

    measurement.name = name;
    measurement.visible = visible;
    measurement.closed = closed;
    measurement.showAngles = showAngles;
    measurement.showArea = showArea;
    measurement.showAzimuth = showAzimuth;
    measurement.showCircle = showCircle;
    measurement.showCoordinates = showCoordinates;
    measurement.showDistances = showDistances;
    measurement.showEdges = showEdges;
    measurement.showHeight = showHeight;

    viewer.scene.addMeasurement(measurement);
  });
};

const addAllVolumes = (viewer, { volumes = [] }) => {
  volumes?.forEach((volume) => {
    const {
      name,
      positionPoints,
      rotationPoints,
      scalePoints,
      modifiable,
      visible,
      clip,
      closed,
      sphere,
    } = volume;

    let newVolume = !sphere ? new window.Potree.BoxVolume() : new window.Potree.SphereVolume();

    newVolume.position.set(positionPoints[0], positionPoints[1], positionPoints[2]);
    newVolume.scale.set(scalePoints[0], scalePoints[1], scalePoints[2]);
    newVolume.rotation.set(rotationPoints[0], rotationPoints[1], rotationPoints[2], "XYZ");
    newVolume.clip = clip;
    newVolume.visible = visible;
    newVolume.name = name;
    newVolume.modifiable = modifiable;
    newVolume.closed = closed;
    viewer.scene.addVolume(newVolume);
  });
};

const addAllProfiles = (viewer, { profiles = [] }) => {
  profiles?.forEach((profile) => {
    const { name, pointMarkers, visible, height, width } = profile;

    let pointProfile = new window.Potree.Profile();
    pointProfile.setWidth(width);
    pointProfile.height = height;
    pointProfile.visible = visible;
    pointProfile.name = name;

    pointMarkers.forEach((marker) => {
      pointProfile.addMarker(new window.THREE.Vector3(marker[0], marker[1], marker[2]));
    });

    viewer.scene.addProfile(pointProfile);
  });
};
export {
  createCookieInHour,
  getCookie,
  getMeasurments,
  getvolumes,
  getProfile,
  addAllMeasurments,
  addAllVolumes,
  addAllProfiles,
  clearCookie,
};
