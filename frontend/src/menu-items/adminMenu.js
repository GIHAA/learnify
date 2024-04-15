// assets
import { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers} from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const adminMenu = {
  id: 'admin-side',
  type: 'group',
  children: [
    {
      id: 'Dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'course-management',
      title: 'Course Management',
      type: 'item',
      url: '/admin/course-management',
      icon: icons.IconCertificate,
      breadcrumbs: false
    },
    {
      id: 'user-management',
      title: 'User Management',
      type: 'item',
      url: '/admin/user-management',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    
  ]
};

export default adminMenu;
