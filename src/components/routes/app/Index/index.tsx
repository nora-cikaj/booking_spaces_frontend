import { ReactElement } from 'react';
import { Layout } from 'antd';
import LeftMenu from '../../../common/SideMenu';
import styles from './index.module.scss';

const AppIndex = (): ReactElement => {
  const { pathname } = window.location;

  return (
    <Layout>
      <LeftMenu pathname={pathname} />
    </Layout>
  );
};

export default AppIndex;
