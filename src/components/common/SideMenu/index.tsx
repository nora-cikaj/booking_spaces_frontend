import React, { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faChartBar,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import Avatar from '../Avatar';
import routes from '../../../constants/routes';
import menuItems from '../../../constants/menu';
import styles from './index.module.scss';

const { Sider } = Layout;
type SideMenuProps = {
  pathname: string,
}

type MenuItem = {
  label: React.ReactNode,
  key: string,
  icon: React.ReactNode,
  to: string,
}

const getItem = ({ item, pathname }: { item: MenuItem, pathname: string }) => {
  const isCurrent = (pathname === item.to);

  return (
    <Link
      to={item.to}
      key={item.key}
      className={styles.Link}
    >
      <Menu.Item
        eventKey={item.key}
        key={item.key}
        icon={item.icon}
        className={isCurrent ? 'ant-menu-item-selected' : ''}
      >
        {item.label}
      </Menu.Item>
    </Link>
  );
};

const items: MenuItem[] = [
  {
    label: 'Option 1',
    key: '1',
    to: '/1',
    icon: <FontAwesomeIcon className={styles.icon} icon={faMoneyBillWave} />,
  },
  {
    label: 'Option 2',
    key: '2',
    to: '/2',
    icon: <FontAwesomeIcon className={styles.icon} icon={faMoneyBillWave} />,
  },
  {
    label: 'Option 3',
    key: '3',
    to: '/3',
    icon: <FontAwesomeIcon className={styles.icon} icon={faMoneyBillWave} />,
  },
];

function SideMenu(props: SideMenuProps): ReactElement {
  // Dummy user, the user will be fetched from the redux
  const user = {
    avatar: 'https://fenix.group/wp-content/uploads/2017/12/Home-Header_background2d.jpg',
    name: 'Leonora',
  };
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider
      className={styles.LeftMenuContainer}
      collapsed={collapsed}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      <div className={styles.Logo}>
        <span className={`${styles.LogoIcon} ${collapsed && styles.collapsed}`}>
          <FontAwesomeIcon icon={faChartBar} />
        </span>
        <span className={`${styles.LogoText} ${collapsed && styles.collapsed}`}>
          Menu
        </span>
      </div>

      <hr className={styles.BreakLine} />

      <Link to={routes.USER}>
        <div className={styles.User}>
          <span className={`${styles.UserIcon} ${collapsed && styles.collapsed}`}>
            <Avatar avatar={user.avatar} />
          </span>
          <span className={`${styles.UserText} ${collapsed && styles.collapsed}`}>
            {user.name}
          </span>
        </div>
      </Link>

      <hr className={styles.BreakLine} />

      <div>
        <Menu>
          {items.map((item) => getItem({ item, pathname: props.pathname }))}
        </Menu>
      </div>

      <Link to={routes.LOG_OUT}>
        <div className={styles.Logout}>
          <span className={`${styles.LogoutIcon} ${collapsed && styles.collapsed}`}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </span>
          <span className={`${styles.LogoutText} ${collapsed && styles.collapsed}`}>
            {menuItems.LOG_OUT}
          </span>
        </div>
      </Link>
    </Sider>
  );
}

export default SideMenu;
