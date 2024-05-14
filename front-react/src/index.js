import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import "./styles/reset.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/common.css"
import { Provider } from 'react-redux';
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <PersistGate persistor={persistor}>
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>

      </Provider>
    </QueryClientProvider>

  </PersistGate>


)
