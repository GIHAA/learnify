import { useRoutes } from 'react-router-dom';

// routes
import AdminRoutes from './AdminRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import UserRoutes from './UserRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([AdminRoutes, UserRoutes ,AuthenticationRoutes]);
}
