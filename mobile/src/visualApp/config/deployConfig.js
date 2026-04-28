const THEME_PRESETS = {
  cruzverde: {
    companyName: 'Cruz Verde',
    logoUri: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Cruz_verde.svg',
    colors: {
      primary: '#14975C',
      secondary: '#0E7A4A',
      accent: '#1DB06C',
      danger: '#D64545',
      background: '#F4FBF7',
      surface: '#FFFFFF',
      text: '#12251B',
      muted: '#6E8278'
    }
  },
  geocom: {
    companyName: 'GEOCOM',
    logoUri: 'https://www.geocom.com.uy/wp-content/uploads/2020/09/logo-geocom.png',
    colors: {
      primary: '#1D4E89',
      secondary: '#173D6B',
      accent: '#2C7BE5',
      danger: '#D64545',
      background: '#F4F8FF',
      surface: '#FFFFFF',
      text: '#0F172A',
      muted: '#64748B'
    }
  },
  maicao: {
    companyName: 'Maicao',
    logoUri: 'https://www.maicao.cl/cdn/shop/files/logo-maicao.png',
    colors: {
      primary: '#D73A8C',
      secondary: '#B82F77',
      accent: '#EF4AA1',
      danger: '#D64545',
      background: '#FFF5FA',
      surface: '#FFFFFF',
      text: '#3B0E2D',
      muted: '#8A5E77'
    }
  },
  provefarma: {
    companyName: 'Provefarma',
    logoUri: 'https://dummyimage.com/220x80/0d6efd/ffffff&text=PROVEFARMA',
    colors: {
      primary: '#0D6EFD',
      secondary: '#0A58CA',
      accent: '#3D8BFD',
      danger: '#D64545',
      background: '#F4F8FF',
      surface: '#FFFFFF',
      text: '#0F172A',
      muted: '#64748B'
    }
  },
  supersana: {
    companyName: 'Super Sana',
    logoUri: 'https://dummyimage.com/220x80/0d6efd/ffffff&text=SUPER+SANA',
    colors: {
      primary: '#0D6EFD',
      secondary: '#0A58CA',
      accent: '#3D8BFD',
      danger: '#D64545',
      background: '#F4F8FF',
      surface: '#FFFFFF',
      text: '#0F172A',
      muted: '#64748B'
    }
  }
};

const activeThemeKey = 'geocom';
const selected = THEME_PRESETS[activeThemeKey] || THEME_PRESETS.cruzverde;

export const deployConfig = {
  activeThemeKey,
  companyName: selected.companyName,
  logoUri: selected.logoUri,
  theme: {
    colors: selected.colors
  }
};

export { THEME_PRESETS };
