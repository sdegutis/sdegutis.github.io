import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../util/stylesheet";

export const ActionButton: JSX.Component<{ href: string }> = (attrs, children) => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['action-button.css']!)} />
  <a href={attrs.href} class="action-button">
    {children}
  </a>
</>;

export const ActionSubmitButton: JSX.Component<{}> = (attrs, children) => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['action-button.css']!)} />
  <button type='submit' class="action-button">
    {children}
  </button>
</>;
