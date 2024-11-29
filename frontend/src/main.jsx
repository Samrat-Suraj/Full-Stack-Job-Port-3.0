import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { Toaster } from 'sonner'
let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <Toaster />
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
