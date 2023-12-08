import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

import React from 'react';
globalThis.React = React;

import ReactDOM from 'react-dom';
globalThis.ReactDOM = ReactDOM;

import * as MaterialUI from '@material-ui/core';
globalThis.MaterialUI = MaterialUI;

import * as Emotion from '@emotion/react';
globalThis.emotionReact = Emotion;