import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Suspense } from 'react';

import 'src/global.css';
// Remove if locales are not used
import 'src/locales/i18n';

import { RTL } from 'src/components/common/toggle-rtl/rtl';
import { SettingsDrawer } from 'src/components/common/settings/settings-drawer';
import { Toaster } from 'src/components/common/snack-bar/toaster';
import { SettingsConsumer, SettingsProvider } from 'src/contexts/settings';
import { useNprogress } from 'src/hooks/use-nprogress';
import { routes } from 'src/routes';
import { createTheme } from 'src/theme';
import './i18n/config';

export const App: FC = () => {
  useNprogress();

  const element = useRoutes(routes);

  return (
    <Suspense fallback="Loading...">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <SettingsConsumer>
            {(settings) => {
              // Prevent theme flicker when restoring custom settings from browser storage
              if (!settings.isInitialized) {
                // return null;
              }

              const theme = createTheme({
                colorPreset: settings.colorPreset,
                contrast: settings.contrast,
                direction: settings.direction,
                paletteMode: settings.paletteMode,
                responsiveFontSizes: settings.responsiveFontSizes,
              });

              return (
                <ThemeProvider theme={theme}>
                  <Helmet>
                    <meta
                      name="color-scheme"
                      content={settings.paletteMode}
                    />
                    <meta
                      name="theme-color"
                      content={theme.palette.neutral[900]}
                    />
                  </Helmet>
                  <RTL direction={settings.direction}>
                    <CssBaseline />
                    {element}
                    {/* <SettingsButton onClick={settings.handleDrawerOpen} /> */}
                    <SettingsDrawer
                      canReset={settings.isCustom}
                      onClose={settings.handleDrawerClose}
                      onReset={settings.handleReset}
                      onUpdate={settings.handleUpdate}
                      open={settings.openDrawer}
                      values={{
                        colorPreset: settings.colorPreset,
                        contrast: settings.contrast,
                        direction: settings.direction,
                        paletteMode: settings.paletteMode,
                        responsiveFontSizes: settings.responsiveFontSizes,
                        stretch: settings.stretch,
                        layout: settings.layout,
                        navColor: settings.navColor,
                      }}
                    />
                    <Toaster />
                  </RTL>
                </ThemeProvider>
              );
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </LocalizationProvider>
    </Suspense>
  );
};
