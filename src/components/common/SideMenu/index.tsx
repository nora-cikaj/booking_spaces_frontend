import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, MenuProps } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faDoorClosed,
  faChartBar,
  faArrowRightFromBracket,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import Avatar from '../Avatar';
import routes from '../../../constants/routes';
import menuItems from '../../../constants/menu';
import { RootState } from '../../../redux/store';
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
  const isCurrent = (pathname.split('/').pop() === item.to);

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
    label: 'Users',
    key: `${routes.USERS}`,
    to: `${routes.USERS}`,
    icon: <FontAwesomeIcon className={styles.icon} icon={faUsers} />,
  },
  {
    label: 'Spaces',
    key: `${routes.SPACES}`,
    to: `${routes.SPACES}`,
    icon: <FontAwesomeIcon className={styles.icon} icon={faDoorClosed} />,
  },
  {
    label: 'Option 3',
    key: '3',
    to: '3',
    icon: <FontAwesomeIcon className={styles.icon} icon={faMoneyBillWave} />,
  },
];

const SideMenu = (props: SideMenuProps): ReactElement => {
  const user = useSelector((state: RootState) => { return state.auth.user; });
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
          MeetUp
        </span>
      </div>

      <hr className={styles.BreakLine} />

      <div className={styles.User}>
        <span className={`${styles.UserIcon} ${collapsed && styles.collapsed}`}>
          <Avatar src={user?.avatarUrl} />
        </span>
        <span className={`${styles.UserText} ${collapsed && styles.collapsed}`}>
          {user?.name}
        </span>
      </div>

      <hr className={styles.BreakLine} />

      <div>
        <Menu>
          {items.map((item) => getItem({ item, pathname: props.pathname }))}
        </Menu>
      </div>

      <a href={routes.LOG_OUT}>
        <div className={styles.Logout}>
          <span className={`${styles.LogoutIcon} ${collapsed && styles.collapsed}`}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </span>
          <span className={`${styles.LogoutText} ${collapsed && styles.collapsed}`}>
            {menuItems.LOG_OUT}
          </span>
        </div>
      </a>
    </Sider>
  );
};

export default SideMenu;
