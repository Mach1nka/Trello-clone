import { useContext } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

import { AlertSC as SC } from './sc';
import { AlertContext } from 'context/AlertContext';
import { AlertData, AlertActions } from 'context/AlertContext';

export const InformationAlerts: React.FC = () => {
  const {alerts, dispatch} = useContext(AlertContext);

  return (
    <>
    {alerts && (
        <SC.AlertWrapper>
        {alerts?.map((item: AlertData) => (
            <SC.Alert
            key={item.id}
            severity={item.status}
            onClose={() => dispatch({type: AlertActions.REMOVE, payload: item })}
            >
            {item.title && <AlertTitle>{item.title}</AlertTitle>}
            {item.message}
            </SC.Alert>
        ))}
        </SC.AlertWrapper>
    )}
    </>
);
  };
