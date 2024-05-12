// assets
import { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers} from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const adminMenu = {
  id: 'cus-side',
  type: 'group',
  children: [
    {
      id: 'course-management',
      title: 'Course Management',
      type: 'item',
      url: '/admin/course-management',
      icon: icons.IconCertificate,
      breadcrumbs: false
    },
    {
      id: 'course-management',
      title: 'Course Management',
      type: 'item',
      url: '/admin/course-management',
      icon: icons.IconCertificate,
      breadcrumbs: false
    }
  ]
};

export default adminMenu;
