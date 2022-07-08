import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import shape from './shape';
import typography from './typography';
import useLocalStorage from '../hooks/useLocalStorage';
import * as React from 'react';


ThemeConfig.propTypes = {
  children: PropTypes.node
};

export const ThemeContext = React.createContext();

export default function ThemeConfig({ children }) {
  const [isLight, setIsLight] = useLocalStorage("isLight", true);

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? { ...palette.light, mode: 'light' } : { ...palette.dark, mode: 'dark' },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
      shape,
      typography
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ThemeContext.Provider value={{ isLight, setIsLight }}>
          {children}
        </ThemeContext.Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
