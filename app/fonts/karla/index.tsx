import { makeFontComponent } from "../../util/css";

export const Karla = {
  fontFamily: `'Karla', sans-serif`,
  load: makeFontComponent(__dir.filesByName['karla.css']!),
};
