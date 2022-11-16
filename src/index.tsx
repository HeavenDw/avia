import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './components/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ru from 'date-fns/locale/ru';

//Datepicker localization
import { registerLocale, setDefaultLocale } from 'react-datepicker';
registerLocale('ru', ru);
setDefaultLocale('ru');

//Add app routing
const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
