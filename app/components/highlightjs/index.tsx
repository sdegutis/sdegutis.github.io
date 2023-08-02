import { staticRouteFor } from "../../util/static";

export const HighlightJs: JSX.Component<{}> = (attrs, children) => <>
  <link rel="stylesheet" href={staticRouteFor(__dir.filesByName["vs.min.css"]!)} />
  <script src={staticRouteFor(__dir.filesByName["highlight.min.js"]!)}></script>
  <script defer>hljs.highlightAll();</script>
</>;
