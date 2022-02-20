import dynamic from "next/dynamic";

const Scene = dynamic(() => import("../components/Scene"), {
  ssr: false,
});

export default function Index() {
  return <Scene />;
}
