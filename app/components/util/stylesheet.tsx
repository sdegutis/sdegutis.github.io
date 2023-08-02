export const Stylesheet: JSX.Component<{ src: string }> = (attrs, children) => <>
  <link rel="stylesheet" href={attrs.src} />
</>;
