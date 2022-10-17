import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import routes from '../../../constants/routes';
import { RootState } from '../../../redux/store';

type ProtectedRouteProps = {
  children: ReactElement,
};

const ProtectedRoute = (props: ProtectedRouteProps): ReactElement => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to={routes.AUTHENTICATE} replace />;
  }

  return props.children;
};

export default ProtectedRoute;
