import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './components/ErrorBoundary.jsx'

// When the API rejects a request with 401 the session is no longer valid —
// drop the stored token so the app returns to a logged-out state.
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && localStorage.getItem('token')) {
      localStorage.removeItem('token')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <BrowserRouter>
      <AppContextProvider>
        <ToastContainer position="bottom-right" />
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </ErrorBoundary>,
)
