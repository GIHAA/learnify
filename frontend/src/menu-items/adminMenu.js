// assets
import { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers , IconMoodCheck } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

// constant
const icons = { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers , IconMoodCheck};

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
    },{
      id: 'approve-course',
      title: 'Approve Course',
      type: 'item',
      url: '/admin/approve-course',
      icon: icons.IconHelp,
      breadcrumbs: false
    },
    {
      id: 'feedback-management',
      title: 'Feedbacks',
      type: 'item',
      url: '/admin/feedback-management',
      icon: icons.IconMoodCheck,
      breadcrumbs: false
    },
    {
      id: 'user-management',
      title: 'User Management',
      type: 'item',
      url: '/admin/user-management',
      icon: icons.IconUsers,
      breadcrumbs: false
    }
  ]
};

export default adminMenu;
