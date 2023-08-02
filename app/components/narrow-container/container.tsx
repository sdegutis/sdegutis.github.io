import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../util/stylesheet";
import css from './container.css';

export const NarrowContainer: JSX.Component<any> = (attrs, children) => <>
  <div class='container' {...attrs}>
    <Stylesheet src={staticRouteFor(css)} />
    {children}
  </div>
</>;
