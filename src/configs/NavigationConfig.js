import { 
  DashboardOutlined, 
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  StopOutlined,
  DotChartOutlined,
  MailOutlined,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  CommentOutlined,
  RobotOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  FileUnknownOutlined,
  ProfileOutlined,
  UserOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'dashboards',
  path: `${APP_PREFIX_PATH}/dashboards`,
  title: 'sidenav.dashboard',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'dashboards',
      path: `${APP_PREFIX_PATH}/dashboards`,
      title: 'sidenav.dashboard',
      icon: FundOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const UserNavTree = [{
  key: 'add-user',
  path: `${APP_PREFIX_PATH}/add-user`,
  title: 'sidenav.manageuser',
  icon: UserOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'add-user',
      path: `${APP_PREFIX_PATH}/add-user/list`,
      title: 'sidenav.manageuser',
      icon: UserOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const ActivityNavTree = [{
  key: 'activities',
  path: `${APP_PREFIX_PATH}/activities`,
  title: 'sidenav.activities',
  icon: EnvironmentOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'activities',
      path: `${APP_PREFIX_PATH}/activities/list`,
      title: 'sidenav.activities',
      icon: EnvironmentOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const VendorNavTree = [{
  key: 'vendors',
  path: `${APP_PREFIX_PATH}/vendors`,
  title: 'sidenav.vendors',
  icon: BulbOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'vendors',
      path: `${APP_PREFIX_PATH}/vendors/list`,
      title: 'sidenav.vendors',
      icon: BulbOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const VendorMealNavTree = [{
  key: 'vendor-meals',
  path: `${APP_PREFIX_PATH}/vendor-meals`,
  title: 'sidenav.vendor-meals',
  icon: LayoutOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'vendor-meals',
      path: `${APP_PREFIX_PATH}/vendor-meals/list`,
      title: 'sidenav.vendor-meals',
      icon: LayoutOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const VendorTransportsNavTree = [{
  key: 'vendor-transports',
  path: `${APP_PREFIX_PATH}/vendor-transports`,
  title: 'sidenav.vendor-transports',
  icon: BookOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'vendor-transports',
      path: `${APP_PREFIX_PATH}/vendor-transports/list`,
      title: 'sidenav.vendor-transports',
      icon: BookOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]

const VendorAmenitiesNavTree = [{
  key: 'vendor-amenities',
  path: `${APP_PREFIX_PATH}/vendor-amenities`,
  title: 'sidenav.vendor-amenities',
  icon: ProfileOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'vendor-amenities',
      path: `${APP_PREFIX_PATH}/vendor-amenities/list`,
      title: 'sidenav.vendor-amenities',
      icon: ProfileOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]


const navigationConfig = [
  ...dashBoardNavTree,
  ...UserNavTree,
  ...ActivityNavTree,
  ...VendorNavTree,
  ...VendorMealNavTree,
  ...VendorTransportsNavTree,
  ...VendorAmenitiesNavTree,
]

export default navigationConfig;
