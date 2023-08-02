import fs from 'fs';
import { mkdirp } from 'mkdirp';
import path from 'path';
import { rimraf } from 'rimraf';
import 'source-map-support/register';
import { createPersistentServer, makeRequestHandler } from "./core/http-server";
import { makeRouteHandler } from './core/route-handler';
import { loadRoutes } from './core/router';

for (const routeDir of __dir.dirsByName['routes']!.dirs) {
  const indexFile = routeDir.find(routeDir.name);
  if (indexFile && indexFile.isFile()) {
    require(indexFile.path);
  }
}

const routes = loadRoutes();

let server: ReturnType<typeof createPersistentServer> = (persisted['server'] ??= createPersistentServer(8080));
server.httpHandler = makeRequestHandler(makeRouteHandler(routes));

// generateSite();

async function generateSite() {
  await rimraf('docs');
  for (const [route, handler] of routes) {
    const filepath = path.join('docs', route);
    const body = handler().body!;
    console.log(filepath);

    await mkdirp(path.dirname(filepath));
    fs.writeFile(filepath, body, () => { });
  }
  fs.writeFile('docs/CNAME', 'www.thesoftwarephilosopher.com', () => { });

  console.log('Done generating site.');
};
