import { Montserrat } from "../../fonts/montserrat";
import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../util/stylesheet";

export const HeroImage: JSX.Component<{ image: FsFile }> = (attrs, children) => <>
  <Montserrat.load />
  <Stylesheet src={staticRouteFor(__dir.filesByName['hero-image.css']!)} />
  <header class='hero-image' style={`background-image: url(${staticRouteFor(attrs.image)})`}>
    <div>
      <script>{`(()=>{const s = document.currentScript; document.addEventListener('DOMContentLoaded', () => s.parentNode.classList.toggle('activate-animation'), 0);})();`}</script>
      <div>
        {children}
      </div>
    </div>
  </header>
</>;
