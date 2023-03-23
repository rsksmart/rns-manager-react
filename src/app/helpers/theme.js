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
        console.warn('THEME: Failed to load custom font.');
      });
  }
};

export default theme;
