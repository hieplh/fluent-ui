import { MystiqueManifest } from 'mystique/types/manifest';

export const manifest: MystiqueManifest = {
  manifestVersion: '2.0',
  name: 'example',
  title: 'example',
  homePath: 'example',
  routes: [
    {
      type: 'reference',
      settingName: 'fc.mystique.manifest.fragment',
    },
  ],
};