import { Compiler, sources } from 'webpack';

class GenerateVersionPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.afterCompile.tap('GenerateVersionPlugin', (compilation) => {
      Object.entries(compilation.assets).forEach(([pathname]) => {
        if (pathname.match(/bundle\.[a-z0-9]+\.js$/))
          compilation.assets['version.json'] =
              new sources.RawSource(JSON.stringify({ bundle: pathname, version: process.env.GIT_TAG || Date.now().toString() }));
      });
    });
  }
}

module.exports = GenerateVersionPlugin;
