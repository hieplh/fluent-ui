const fs = require('fs');

describe('Dist', () => {
  it('Folder exists', () => {
    expect(fs.existsSync('dist')).toBeTruthy();
  });

  describe('version.json file', () => {
    const versionFile = fs.readFileSync('dist/version.json');
    const versionJson = JSON.parse(versionFile);

    it('Exists', () => {
      expect(versionFile).toBeTruthy();
    });

    it('Contains property "bundle" which references existing bundle.[contenthash].js', () => {
      expect(versionJson).toHaveProperty('bundle');
      expect(versionJson.bundle).toMatch(/bundle\.[a-z0-9]+\.js$/);
      expect(fs.existsSync(`dist/${versionJson.bundle}`)).toBeTruthy();
    });

    it('Contains property "version"', () => {
      expect(versionJson).toHaveProperty('version');
      expect(versionJson.version.trim().length).not.toEqual(0);
    });
  });

  describe('Manifests folder', () => {
    it('Exists', () => {
      if (fs.existsSync('manifests'))
        expect(fs.existsSync('dist/manifests')).toBeTruthy();
    });
  });
});
