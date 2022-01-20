import { useThree } from "@react-three/fiber";

export const convertToScreenCoordinates = function (point: THREE.Vector3) {
  const { camera, size } = useThree();

  point.project(camera);

  let widthHalf = size.width / 2;
  let heightHalf = size.height / 2;

  point.x = point.x * widthHalf + widthHalf;
  point.y = -(point.y * heightHalf) + heightHalf;
  point.z = 0;

  return point;
};
