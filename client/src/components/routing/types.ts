import { RouteProps, RouteComponentProps } from 'react-router-dom';

export interface PrivateRouteState {
  token: string;
}

export interface PrivateRouteProps extends RouteProps {
  exact: boolean;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
