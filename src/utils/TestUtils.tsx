import { FC } from 'react';
import { StylesProvider, StylesOptions } from '@material-ui/styles';

const generateClassName: StylesOptions['generateClassName'] = (
  rule,
  sheet,
): string => `${sheet!.options.classNamePrefix}-${rule.key}`;

/**
 * Provides consistent classname generation for MaterialUI components to avoid inconsistent snapshots.
 */
export const FixMuiClassnames: FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      {children}
    </StylesProvider>
  );
};
