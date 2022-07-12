import { ReactElement } from 'react';
import { Layout } from 'antd';
import LeftMenu from '../../../common/SideMenu';
import Table from '../../../common/Table';
import Card from '../../../common/Card';
import styles from './index.module.scss';

const AppIndex = (): ReactElement => {
  const { pathname } = window.location;

  return (
    <Layout>
      <LeftMenu pathname={pathname} />
      <Card
        style={{ width: '100%' }}
      >
        <div>
          Hello
        </div>
      </Card>
    </Layout>
  );
};

export default AppIndex;
