const potreeStylePaths = [
  "jquery-ui/jquery-ui.css",
  "openlayers3/ol.css",
  "spectrum/spectrum.css",
  "jstree/themes/mixed/style.css",
  "potree/potree.css",
];

const potreeLibraryPaths = [
  "jquery/jquery-3.1.1.min.js",
  "spectrum/spectrum.js",
  "jquery-ui/jquery-ui.min.js",
  "three.js/build/three.min.js",
  "three.js/extra/lines.js",
  "other/BinaryHeap.js",
  "tween/tween.min.js",
  "d3/d3.js",
  "proj4/proj4.js",
  "openlayers3/ol.js",
  "i18next/i18next.js",
  "jstree/jstree.js",
  "plasio/js/laslaz.js",
];

const getPublicPath = (path) => `/potree/${path}`;

const loadStyles = () => {
  potreeStylePaths.forEach((path) => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = getPublicPath(path);
    document.head.appendChild(l);
  });
};

const loadLibraries = () => {
  potreeLibraryPaths.forEach((path) => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.async = false;
    s.src = getPublicPath(path);
    document.head.appendChild(s);
  });
};

const loadPotree = () =>
  new Promise((resolve) => {
    const s = document.createElement("script");
    s.type = "text/javascript";
    s.onload = () => resolve();
    s.async = false;
    s.src = getPublicPath("potree/potree.js");
    document.head.appendChild(s);
  });

export const loadPotreeLibraries = () => {
  loadStyles();
  loadLibraries();
  return loadPotree();
};
