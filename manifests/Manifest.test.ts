import { manifest as fragment } from './fc.mystique.manifest.fragment.example';
import englishTranslations from './../i18n/locales/en/translation.json';

export const recurseOverObject = (assertions: ((obj: any, property: string) => void)[]) => {
  const objectRecursion = (obj: any) => {
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        if (typeof obj[property] === 'object') {
          objectRecursion(obj[property]);
        } else {
          assertions.forEach(fn => fn(obj, property));
        }
      }
    }
  };
  return objectRecursion;
};

const internationalizationAssertion = (obj: any, property: string) => {
  if (['title', 'subTitle', 'label', 'menuLabel', 'label'].includes(property)) {
    const prefixIsDynamic = obj[property].startsWith('i18n:') || obj[property].startsWith('{{');
    expect(prefixIsDynamic).toBeTruthy();
  }
};

const mystiqueVersionAssertion = (obj: any, property: string) => {
  if (property === 'manifestVersion')
    expect(obj[property]).toBe('2.0');
};

const fragmentAssertion = (obj: any, property: string) => {
  if (typeof obj[property] === 'string')
    expect(obj[property]).not.toMatch(/fragment/i);
};

const translationExistsAssertion = (obj: any, property: string) => {
  if (!obj[property].toString().startsWith('i18n:')) return;
  const expectedKey = obj[property].toString().replace('i18n:', '');
  expect(Object.keys(englishTranslations).find(key => key === expectedKey)).toBe(expectedKey);
};

const assertionsList = [
  fragmentAssertion,
  mystiqueVersionAssertion,
  internationalizationAssertion,
  translationExistsAssertion,
];

describe('Manifest checks', () => {
  test('Fragment should pass basic checks', () => {
    recurseOverObject(assertionsList)(fragment);
  });
});
