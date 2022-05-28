import React from 'react';
import { useSelector } from 'react-redux';
import { AlertTitle } from '@material-ui/lab';

import { selectMaintainData } from '../../store/selectors';
import { Alert } from '../../service/resources/models/maintain.model';
import { AlertSC as SC } from './sc';
import { useAppDispatch } from '../../store';
import { deleteAlert } from '../../store/slices/maintain';

const Alerts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { alerts } = useSelector(selectMaintainData);

  return (
    <SC.AlertWrapper>
      {alerts.map((el: Alert) => (
        <SC.Alert key={el.id} severity={el.status} onClose={() => dispatch(deleteAlert(el.id))}>
          {el.title && <AlertTitle>{el.title}</AlertTitle>}
          {el.message}
        </SC.Alert>
      ))}
    </SC.AlertWrapper>
  );
};

export default Alerts;
