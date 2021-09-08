import { camera, sizes } from "./script";

export const convertToScreenCoordinates = function (point: THREE.Vector3) {
  point.project(camera);

  let widthHalf = sizes.width / 2;
  let heightHalf = sizes.height / 2;

  point.x = point.x * widthHalf + widthHalf;
  point.y = -(point.y * heightHalf) + heightHalf;
  point.z = 0;

  return point;
};
