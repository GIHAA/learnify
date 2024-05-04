// assets
import { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers ,IconBook} from '@tabler/icons-react';


// constant
const icons = { IconBrandChrome, IconHelp , IconDashboard , IconCertificate , IconUsers,IconBook};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const customerMenu = {
  id: 'customer-side',
  type: 'group',
  children: [
    {
      id: 'Dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'my-course',
      title: 'My Course',
      type: 'item',
      url: '/my-course',
      icon: icons.IconBook,
      breadcrumbs: false
    },
    
  ]
};

export default customerMenu;
