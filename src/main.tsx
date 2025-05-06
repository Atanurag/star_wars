import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from './components/protected/ProtectedRoute';
import RedirectToInitial from './components/initialRoute/RedirectToInitial';
import App from './App';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Detail from './pages/detail/Detail';
import InternalDetail from './pages/internalDetail/InternalDetail';


export const routes = [
	{
	  path: '/',
	  element: <App />,
	  children: [
		{
		  path: '/',
		  element: <RedirectToInitial />,
		},
		{
		  path: '/login',
		  element: <Login />,
		},
		{
		  path: '/home',
		  element: (
			<ProtectedRoute>
			  <Home />
			</ProtectedRoute>
		  ),
		},
		{
			path: '/detail-page/:category/:id',
			element: (
			  <ProtectedRoute>
				<Detail />
			  </ProtectedRoute>
			),
		  },
		  {
			path: '/detail-page/:category/:id/internal-detail/:category_type/:id_type',
			element: (
			  <ProtectedRoute>
				<InternalDetail />
			  </ProtectedRoute>
			),
		  },
		  
	  ],
	},
  ];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
			cacheTime: 1000 * 60 * 15
		}
	}
});
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>
);
