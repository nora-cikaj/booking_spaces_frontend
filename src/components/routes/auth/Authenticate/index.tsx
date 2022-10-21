import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Spinner from '../../../common/Spinner';
import { login } from '../LogIn/core/action-creators';
import { AppDispatch, RootState } from '../../../../redux/store';
import routes from '../../../../constants/routes';

const Authenticate = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    dispatch(login());
  }, []);
  if (user) {
    return <Navigate to={`${routes.APP}/${routes.APP.DASHBOARD}`} replace />;
  }

  if (error) {
    return <Navigate to={`${routes.AUTH.LOG_IN}`} replace />;
  }

  return <Spinner loading />;
};

export default Authenticate;
