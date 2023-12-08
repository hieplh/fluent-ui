# OMX Plugin

## Run on local environment
1. Install dependencies with `yarn install`
2. Build artifacts with `yarn build`
3. Start development server with `yarn start`

## Husky pre scripts

Configured to run `yarn test` pre-push. Will fail to push to the cloud if the tests fail
Configured to run `yarn lint` pre-commit. Will fail to commit if the linter fails

Can be overriden by specifying the `--no-verify` flag. E.g. `git push --no-verify`

## Manifests

To enable query checks in your manifests, wrap your query in the `gql` tag and use the parse method to convert it to a string:

```json
'data': {
    'query': parse(gql`query getLocationById($id: ID!) { locationById(id: $id){ ref type status } }`)
}
```

## Test tools configured in this project

| Name & Link                                                  | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Jest](https://jestjs.io/)                                   | Delightful JavaScript Testing Library for unit and component testing |
| [@testing-library](https://testing-library.com/docs/)        | Light-weight family of libraries to assist with testing components similar to how users would user them. In this way, testing-library helps ensure your tests give you confidence in your UI code. |
| [Storybook](https://storybook.js.org/docs/react/get-started/introduction) | Component design system tool for UI development and testing  |
| [Storyshots](https://storybook.js.org/addons/@storybook/addon-storyshots) | Automated snapshot testing tool for Storybook                |
| [Cypress](https://www.cypress.io/)                           | A powerful testing library for running scenarios in the browser. It comes with features such as recording video, taking screenshots, mocking APIs and much more. |

## Test resources

1. [Mocking and stubbing in Jest](https://codewithhugo.com/jest-mock-spy-module-import/)
2. [Jest cheatsheet](https://github.com/sapegin/jest-cheat-sheet)
3. [Cypress best practices](https://docs.cypress.io/guides/references/best-practices)

## Further reading

1. [OMX SDK documentation in Lingo](https://lingo.fluentcommerce.com/extend/component-sdk/)

