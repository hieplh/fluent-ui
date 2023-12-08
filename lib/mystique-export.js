/**
 * TODO: figure out how to automate this and import of mystique.js
 */

const m = globalThis.Mystique;

// registry
export const ComponentRegistry = m.ComponentRegistry;
export const FieldRegistry = m.FieldRegistry;

// frame
export const DataModal = m.DataModal;
export const pushModal = m.pushModal;
export const pushDrawer = m.pushDrawer;
export const pushToast = m.pushToast;

// hooks
export const useAuth = m.useAuth;
export const useI18n = m.useI18n;
export const useSettings = m.useSettings;
export const useQuery = m.useQuery;
export const useRest = m.useRest;
export const getQuery = m.getQuery;
export const getRest = m.getRest;

// components
export const Card = m.Card;
export const CardContent = m.CardContent;
export const Children = m.Children;
export const DynamicValue = m.DynamicValue;
export const Loading = m.Loading;
export const QuantitySelectorComponent = m.QuantitySelectorComponent;

// utils
export const decorateQueryResult = m.decorateQueryResult;