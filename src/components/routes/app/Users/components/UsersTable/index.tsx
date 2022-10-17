import { ReactElement, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  faTrash, faEdit, faCheck, faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColumnsType } from 'antd/lib/table';
import PopConfirm from '../../../../../common/PopConfirm';
import Table from '../../../../../common/Table';
import Button from '../../../../../common/Button';
import Avatar from '../../../../../common/Avatar';
import capitalizeFirstLetter from '../../../../../../helpers/capitalizeFirstLetter';
import { colors } from '../../../../../../styles/abstracts/variables';
import { AppDispatch, RootState } from '../../../../../../redux/store';
import { DeleteUserPayload, UpdateUserPayload } from '../../core/types';
import User from '../../../../../../types/user';
import styles from './index.module.scss';
import { deleteSingleUser, updateUserPermissions } from '../../core/action-creators';
import CustomSpinner from '../../../../../common/Spinner';
import Switch from '../../../../../common/Switch';

type UserTableDataType = {
  avatar: ReactNode,
  key: string,
  name: string,
  lastName: string,
  email: string,
  admin: ReactNode,
  isAdmin: boolean,
}

type UsersTableProps = {
  users: User[],
}

const UsersTable = (props: UsersTableProps): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.user.isLoading);
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const authorized = loggedInUser?.admin;

  const handleUpdate = (data: UpdateUserPayload) => {
    dispatch(updateUserPermissions(data));
  };

  const handleDelete = (data: DeleteUserPayload) => {
    dispatch(deleteSingleUser(data));
  };
  const columns: ColumnsType<UserTableDataType> = [
    {
      title: '',
      dataIndex: 'avatar',
      key: 'avatar',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: UserTableDataType, b: UserTableDataType) => a.name.length - b.name.length,
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend',
    },
    {
      title: 'LastName',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a: UserTableDataType, b: UserTableDataType) => a.lastName.length - b.lastName.length,
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Admin',
      dataIndex: 'admin',
      key: 'admin',
      sorter: (a: UserTableDataType, b: UserTableDataType) => a.name.length - b.name.length,
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_: any, record: UserTableDataType) => (
        <div className={styles.actionButton}>
          <PopConfirm
            title="Delete"
            onConfirm={() => handleDelete({ id: record.key })}
            okText="Yes"
            cancelText="No"
          >
            <Button
              htmlType="button"
              buttonType="danger"
              outline
              icon={faTrash}
              style={{ padding: 0, height: '2rem' }}
            />
          </PopConfirm>
        </div>
      ),
    },
  ];
  const data = props.users.map((user) => ({
    key: user.id,
    rowKey: user.id,
    avatar: (<Avatar src={user.avatarUrl} key={user.id} />),
    name: capitalizeFirstLetter(user.name),
    lastName: capitalizeFirstLetter(user.lastName),
    email: user.email,
    isAdmin: user.admin,
    admin: (authorized
      ? (
        <div>
          <Switch
            name="admin"
            disabled={user.id === loggedInUser.id}
            value={user.admin}
            onChange={(checked) => {
              handleUpdate({ id: user.id, admin: checked });
            }}
          />
        </div>
      )
      : (
        <div style={{ textAlign: 'center', marginLeft: '-16px' }}>
          {user.admin
            ? (
              <FontAwesomeIcon
                icon={faCheck}
                color={colors.success}
              />
            )
            : (
              <FontAwesomeIcon
                icon={faXmark}
                color={colors.danger}
              />
            )}
        </div>
      )
    ),
  }));

  return (
    <div>
      {isLoading ? (
        <CustomSpinner loading={isLoading} />
      ) : (
        <Table
          columns={columns}
          data={data}
        />
      )}
    </div>
  );
};

export default UsersTable;
