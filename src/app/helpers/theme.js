import { hexToCSSFilter } from 'hex-to-css-filter';
import themeConfig from '../../theme.json';

import defaultLogo from '../../assets/img/logo.svg';
import defaultSpacer from '../../assets/img/home/bottom-background.svg';

const defaultFont = "'Rubik', sans-serif";

function valueOrDefault(prop, defaultProp) {
  if (prop && prop.trim() !== '') return prop;
  return defaultProp;
}

const theme = {
  logo: valueOrDefault(themeConfig.logo, defaultLogo),
  images: {
    homeSpacer: valueOrDefault(themeConfig.images.homeSpacer, defaultSpacer),
  },
  font: {
    family: valueOrDefault(themeConfig.font.family, defaultFont),
    src: valueOrDefault(themeConfig.font.src, ''),
  },
  colors: {
    primary: {
      dark: valueOrDefault(themeConfig.colors.primary.dark, '#0082b3'),
      main: valueOrDefault(themeConfig.colors.primary.main, '#008CFF'),
      light: valueOrDefault(themeConfig.colors.primary.light, '#BFEEFF'),
      transparent: valueOrDefault(themeConfig.colors.primary.transparent, 'rgba(0, 143, 247, .8)'),
    },
    secondary: {
      dark: valueOrDefault(themeConfig.colors.secondary.dark, '#666666'),
      main: valueOrDefault(themeConfig.colors.secondary.main, '#919191'),
      light: valueOrDefault(themeConfig.colors.secondary.light, '#E5E5E5'),
    },
  },
};

export const setupCssTheme = () => {
  document.documentElement.style.setProperty('--primary-font', theme.font.family);
  document.documentElement.style.setProperty('--background-home-spacer', `url("${theme.images.homeSpacer}")`);

  // Load font
  if (theme.font.src !== '') {
    const font = new FontFace(theme.font.family, `url(${theme.font.src})`);
    font.load()
      .then((loadedFF) => {
        document.fonts.add(loadedFF);
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.warn('THEME: Failed to load custom font.');
      });
  }
  document.documentElement.style.setProperty('--primary-color', theme.colors.primary.main);
  document.documentElement.style.setProperty('--primary-color-dark', theme.colors.primary.dark);
  document.documentElement.style.setProperty('--primary-color-light', theme.colors.primary.light);
  document.documentElement.style.setProperty('--primary-color-transparent', theme.colors.primary.transparent);
  document.documentElement.style.setProperty('--secondary-color', theme.colors.secondary.main);
  document.documentElement.style.setProperty('--secondary-color-dark', theme.colors.secondary.dark);
  document.documentElement.style.setProperty('--secondary-color-light', theme.colors.secondary.light);
  document.documentElement.style.setProperty('--secondary-color-transparent', theme.colors.secondary.transparent);

  document.documentElement.style.setProperty('--primary-color-filter', hexToCSSFilter(theme.colors.primary.main).filter.slice(0, -1));
  document.documentElement.style.setProperty('--secondary-color-filter', hexToCSSFilter(theme.colors.secondary.main).filter.slice(0, -1));
};

export default theme;
