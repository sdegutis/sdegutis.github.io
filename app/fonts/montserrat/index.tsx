import { makeFontComponent } from "../../util/css";

export const Montserrat = {
  fontFamily: `'Montserrat', sans-serif`,
  load: makeFontComponent(__dir.filesByName['montserrat.css']!),
};
