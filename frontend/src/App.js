import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
// import ResponsiveAppBar from 'ui-component/header/ResponsiveAppBar';
import { Toaster } from 'react-hot-toast';

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
       
        <NavigationScroll>
        {/* <ResponsiveAppBar> */}
          <Routes />
          {/* </ResponsiveAppBar> */}
        </NavigationScroll>
  
      </ThemeProvider>
      <Toaster position="top-right" />
    </StyledEngineProvider>
  );
};

export default App;
