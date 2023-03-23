import themeConfig from '../../theme.json';

import defaultLogo from '../../assets/img/logo.svg';
import defaultSpacer from '../../assets/img/home/bottom-background.svg';

function valueOrDefault(prop, defaultProp) {
  if (prop && prop.trim() !== '') return prop;
  return defaultProp;
}

const theme = {
  logo: valueOrDefault(themeConfig.logo, defaultLogo),
  images: {
    homeSpacer: valueOrDefault(themeConfig.images.homeSpacer, defaultSpacer),
  },
};

export const setupCssTheme = () => {
  document.documentElement.style.setProperty('--background-home-spacer', `url("${theme.images.homeSpacer}")`);
};

export default theme;
