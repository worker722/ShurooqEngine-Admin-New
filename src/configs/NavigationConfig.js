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

const navigationConfig = [
  ...dashBoardNavTree,
  ...UserNavTree,
  ...ActivityNavTree,
]

export default navigationConfig;
