import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';;
import theme from '@theme';
import { store } from '@ducks';
import KymRouter from '@modules/Router';
import KymPage from '@modules/Page';
import GlobalFooter from '@modules/GlobalFooter';
import GlobalHeader from '@modules/GlobalHeader';

import './App.css';
import LoadableFoodGroupHandler from '@modules/FoodGroupHandler';

function App() {
  return (
    <Provider store={store}>
      <LoadableFoodGroupHandler />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <KymPage Header={<GlobalHeader />} Footer={<GlobalFooter />}>
            <KymRouter />
          </KymPage>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
