import { deployConfig } from '../config/deployConfig';

const base = {
  white: '#FFFFFF',
  black: '#000000',
};

export const colors = {
  ...base,
  ...deployConfig.theme.colors,
};
