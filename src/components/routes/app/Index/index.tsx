import { ReactElement } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Button, Layout } from 'antd';
import LeftMenu from '../../../common/SideMenu';
import styles from './index.module.scss';
import CustomHeader from '../../../common/Header';

const AppIndex = (): ReactElement => {
  const { pathname } = useLocation();
  const title = pathname.split('/').pop();

  return (
    <Layout>
      <LeftMenu pathname={pathname} />
      <Layout>
        <Layout.Header
          className={styles.Header}
        >
          <CustomHeader title={title!} />
        </Layout.Header>
        <Layout.Content>
          <div>
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AppIndex;
