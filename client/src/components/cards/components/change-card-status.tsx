import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, MenuItem } from '@material-ui/core';

import { useAppSelector } from '../../../store/hooks';
import { changeCardStatus } from '../../../store/card/actions';
import { setModalsStates, setModalData } from '../../../store/modals/actions';
import { SubmitButton, ModalForm as Form } from '../sc';

interface Props {
  isOpen: boolean;
  columnId: string;
  cardId: string;
}

const ChangeCardStatus: React.FC<Props> = ({ isOpen, columnId, cardId }) => {
  const dispatch = useDispatch();
  const columnsArr = useAppSelector((state) =>
    state.boardColumns.columns.map((el) => ({ columnName: el.name, columnId: el.id }))
  );

  const { name, description } = useAppSelector((state) =>
    state.cardsData[columnId].find((el) => el.id === cardId)
  );

  const formHandler = useCallback((values: { newStatus: string }) => {
    if (values.newStatus !== columnId) {
      dispatch(
        changeCardStatus({
          cardId,
          newColumnId: values.newStatus,
          columnId
        })
      );
      dispatch(setModalData({ cardId, columnId: values.newStatus, name, description }));
    }
    dispatch(setModalsStates({ isStatusModalVisible: false }));
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={() => dispatch(setModalsStates({ isStatusModalVisible: false }))}
    >
      <DialogTitle style={{ textAlign: 'center' }}>Change card status</DialogTitle>
      <Formik initialValues={{ newStatus: columnId }} onSubmit={formHandler}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <TextField
              label="Column"
              name="newStatus"
              id="newStatus"
              select
              value={props.values.newStatus}
              onChange={props.handleChange}
            >
              {columnsArr.map((el) => (
                <MenuItem key={el.columnId} value={el.columnId}>
                  {el.columnName}
                </MenuItem>
              ))}
            </TextField>
            <DialogActions>
              <SubmitButton size="small" type="submit" variant="contained">
                Change
              </SubmitButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ChangeCardStatus;
