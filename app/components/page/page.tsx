import { Inter } from "../../fonts/inter";
import { blogIndexPage } from "../../routes/all-articles/all-articles";
import { email } from "../../routes/contact/contact";
import { landingPage } from "../../routes/home/home";
import { portfolioPage } from "../../routes/portfolio/portfolio";
import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../util/stylesheet";

export const Html: JSX.Component<{}> = (attrs, children) => <>
  {'<!DOCTYPE html>'}
  <html lang="en">
    {children}
  </html>
</>;

export const Head: JSX.Component<{ imagePath?: string, title?: string | undefined, description?: string | undefined }> = (attrs, children) => <>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>{attrs.title && `${attrs.title} - `}The Software Philosopher</title>
    <meta property="og:title" content={"The Software Philosopher" + (attrs.title ? `: ${attrs.title}` : '')} />
    <meta property="og:locale" content="en_US" />
    <meta name="description" content={attrs.description ?? "Software front-end, back-end, full-stack development, with consulting, freelancer, webinars, and mentoring"} />

    <Inter.load />
    <style>{`html{font-family: ${Inter.fontFamily}}`}</style>

    <Stylesheet src={staticRouteFor(__dir.filesByName['all.css']!)} />

    {children}
  </head>
</>;

export const SiteFooter: JSX.Component<{}> = (attrs, children) => <>
  <Stylesheet src={staticRouteFor(__dir.filesByName['sitefooter.css']!)} />
  <footer id="site-footer">
    <section>
      <nav>
        <a href={landingPage.route}>TSP</a>
        <a href={blogIndexPage.route}>Articles</a>
        <a href={portfolioPage.route}>Portfolio</a>
        <a href="https://github.com/sdegutis/">GitHub</a>
        <a href={email.address}>Email</a>
      </nav>
      <p>Copyright 2022 ©️ All rights reserved</p>
    </section>
  </footer>
</>;
