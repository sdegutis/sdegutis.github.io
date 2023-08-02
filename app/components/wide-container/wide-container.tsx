import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../util/stylesheet";
import css from './wide-container.css';

export const WideContainer: JSX.Component<any> = (attrs, children) => <>
  <div class='wide-container' {...attrs}>
    <Stylesheet src={staticRouteFor(css)} />
    {children}
  </div>
</>;
