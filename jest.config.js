const path = require('path');

module.exports = {
    restoreMocks: true,
    roots: [
        "<rootDir>"
    ],
    setupFilesAfterEnv: ['./src/setup-tests.ts'],
    setupFiles:[
        "./lib/material-ui.js",
        "./lib/init.js",
        "./lib/mystique.js",
    ],
    testMatch: [
        "**/?(*.)+(test).+(ts|tsx)"
    ],
    coverageThreshold: {
        global: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80
        }
    },    
    coveragePathIgnorePatterns: [
        ".storybook/",
        "src/index.tsx",
        '.stories.'
    ],
    collectCoverageFrom: [
        "src/**/*.{ts,tsx}"
    ],    
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
        "\\.(css|less)$": "identity-obj-proxy",
        "^./react": path.resolve(__dirname, 'node_modules/react'),
        // "^./@material-ui": path.resolve(__dirname, 'node_modules/@material-ui'),
        "^mystique": path.resolve(__dirname, 'lib/mystique-export.js')
    },
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report",
            "outputPath": "./test-report/test-report.html"
        }]
    ],
    globals: {
        "ts-jest": {
            "compiler": "ttypescript"
        }
    }
};
