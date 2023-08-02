import { makeFontComponent } from "../../util/css";

export const Inter = {
  fontFamily: `'Inter', sans-serif`,
  load: makeFontComponent(__dir.filesByName['inter.css']!),
};
