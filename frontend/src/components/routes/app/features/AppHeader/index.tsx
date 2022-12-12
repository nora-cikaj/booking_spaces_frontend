import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Avatar, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import styles from './index.module.scss';

const AppHeader: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className={styles.menuHeader}>
      <img
        src="/images/logo_boothup.svg"
        alt="logo"
        className={styles.logoStyle}
      />
      <div className={styles.menuHeaderLeft}>
        <h1 className={styles.logoTitleStyle}>BoothUp | {user?.name} </h1>
        <Avatar
          className={styles.avatarStyle}
          src={
            <img
              src={user?.avatarUrl}
              alt="user"
              referrerPolicy="no-referrer"
            />
          }
        />
      </div>
      <div className={styles.menuHeaderRight}>
        <Button
          type="primary"
          className={styles.logoutButtonStyle}
          onClick={() => navigate('/logout')}
        >
          Logout
        </Button>
        <h1 className={styles.dateStringStyle}>
          {date.toLocaleDateString()} | {date.toLocaleTimeString()}
        </h1>
      </div>
    </div>
  );
};

export default AppHeader;
