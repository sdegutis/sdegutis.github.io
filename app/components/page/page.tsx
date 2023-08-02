import { baseUrl } from "../../core/http-server";
import { Inter } from "../../fonts/inter";
import { staticRouteFor } from "../../util/static";
import { Stylesheet } from "../util/stylesheet";
import fixExternalLinks from './fix-external-links.js';

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

    <OpenExternalsInNewTab />

    {children}
  </head>
</>;

const OpenExternalsInNewTab: JSX.Component<{}> = (attrs, children) => <>
  <script src={staticRouteFor(replaceInFile(fixExternalLinks, { 'BASE_URL': baseUrl }))} defer />
</>;

function replaceInFile(file: { buffer: Buffer, name: string }, replacements: Record<string, string>) {
  return {
    name: file.name,
    buffer: Buffer.from(replaceInString(file.buffer.toString('utf8'), replacements), 'utf8'),
  };
}

function replaceInString(string: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce((s, [k, v]) => {
    return s.replace(k, v);
  }, string);
}
