const fs = require('fs-extra');
const path = require('path');
const { readDirectory } = require('./memfs');

readDirectory('docs').forEach(({ name, path }) => {
  if (name !== 'patterns') {
    fs.unlinkSync(path);
  }
});

function readPatterns(directories) {
  return directories.reduce((arr, obj) => {
    if (Array.isArray(obj.children)) {
      readPatterns(obj.children).forEach((v) => arr.push(v));
    } else {
      arr.push({
        name: require(path.join('..', '..', obj.path)).title,
        path: obj.path.replace(/\\/g, '/').replace('docs/patterns/', ''),
      });
    }
    return arr;
  }, []);
}

const patterns = readPatterns(readDirectory(path.join('docs', 'patterns')));

fs.writeFileSync(
  path.join('src', 'static', 'index.html'),
  `<!DOCTYPE html>

<html lang="en">
  <head>
    <title>Conway's Game of Life</title>
    <meta charset="utf-8" />
    <meta name="author" content="TroyTae" />
    <meta name="robots" content="index,follow" />
    <meta name="keywords" content="Conway,Game of Life" />
    <meta name="description" content="Conway's Game of Life web version!" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=5.0" />
    <link rel="stylesheet" href="./style.css" />
    <link rel="shortcut icon" href="./favicon.gif" />
  </head>
  <body>
    <h1>Game of Life</h1>
    <select id="patterns">${patterns
      .map(
        ({ name, path }) => `
      <option value="${path}">${name}</option>`
      )
      .join('')}
    </select>
    <script src="../index.ts"></script>
  </body>
</html>
`
);
