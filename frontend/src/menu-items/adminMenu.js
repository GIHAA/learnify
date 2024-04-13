// assets
import { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers} from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const adminMenu = {
  id: 'course-management',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'course-management',
      title: 'Course Management',
      type: 'item',
      url: '/dashboard/course-management',
      icon: icons.IconCertificate,
      breadcrumbs: false
    },
    {
      id: 'user-management',
      title: 'User Management',
      type: 'item',
      url: '/dashboard/user-management',
      icon: icons.IconUsers,
      breadcrumbs: false
    },
    
  ]
};

export default adminMenu;
