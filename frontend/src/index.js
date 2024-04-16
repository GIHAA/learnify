import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import config from './config';

//firebase
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import "firebase/firestore";
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
getStorage(app);

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);


