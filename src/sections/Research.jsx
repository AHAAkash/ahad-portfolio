import { research } from "../data";
import WorkCarousel from "./WorkCarousel";

export default function Research() {
  return <WorkCarousel id="research" title="Research" entries={research} />;
}
