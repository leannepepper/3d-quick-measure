import dynamic from "next/dynamic";
import Script from "next/script";

const Scene = dynamic(() => import("../components/Scene"), {
  ssr: false,
});

export default function Index() {
  return (
    <>
      <Scene />
    </>
  );
}
