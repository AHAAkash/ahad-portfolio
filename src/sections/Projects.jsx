import { projects } from "../data";
import WorkCarousel from "./WorkCarousel";

export default function Projects() {
  return <WorkCarousel id="projects" title="Projects" entries={projects} />;
}
