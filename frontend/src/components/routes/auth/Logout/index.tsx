import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../../../redux/store';
import Spinner from '../../../common/Spinner';
import { logout } from '../LogIn/core/action-creators';

const LogOut = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout(navigate));
  }, []);

  return <Spinner loading />;
};

export default LogOut;
