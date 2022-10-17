import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import Card from '../../../../common/Card';
import UsersTable from './UsersTable';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { getUsers } from '../core/action-creators';
import styles from './index.module.scss';

const UsersPage = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const error = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (error) {
      notification.error({
        message: 'Error',
        description: error,
      });
    }
  }, [error]);

  return (
    <Card
      className={styles.Container}
      title="List of users"
    >
      <UsersTable users={users} />
    </Card>
  );
};

export default UsersPage;
