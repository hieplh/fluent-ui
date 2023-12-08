import webpack from 'webpack';
const fs = require('fs-extra');

class GenerateManifestsPlugin {
  apply(compiler: webpack.Compiler) {
    compiler.hooks.afterEmit.tap('GenerateManifestsPlugin', () => {
      fs.readdir('./manifests', (err: string, files: string[]) => { 
        if (err) {
          console.log(err);
        } else {
          files.forEach((file: string) => {
            if (file.includes('fc.mystique.manifest') && !file.includes('.test.')) {
              const filenameNoExt = file.slice(0, -3);
              import(`../manifests/${filenameNoExt}`).then(manifest => {
                fs.outputFile(`dist/manifests/${filenameNoExt}.json`, JSON.stringify(manifest.manifest, null, 4));
              });
            }
          });
        }
      });
    });
  }
}
  
module.exports = GenerateManifestsPlugin;