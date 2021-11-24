import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, MenuItem } from '@material-ui/core';

import { useAppSelector } from '../../../store/hooks';
import { changeCardPosition } from '../../../store/card/actions';
import { setModalsStates } from '../../../store/modals/actions';
import { SubmitButton, ModalForm as Form } from '../sc';

interface Props {
  isOpen: boolean;
  columnId: string;
  cardId: string;
  position: number;
}

const ChangeCardPosition: React.FC<Props> = ({ isOpen, columnId, cardId, position }) => {
  const dispatch = useDispatch();
  const positionArr = useAppSelector((state) => state.cardsData[columnId].map((el) => el.position));

  const formHandler = useCallback(
    (values: { newPosition: number }) => {
      if (values.newPosition !== position) {
        dispatch(
          changeCardPosition({
            cardId,
            newPosition: values.newPosition,
            columnId
          })
        );
      }
      dispatch(setModalsStates({ isPositionModalVisible: false }));
    },
    [position]
  );

  const onClose = useCallback(
    () => dispatch(setModalsStates({ isPositionModalVisible: false })),
    []
  );

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Change card position</DialogTitle>
      <Formik initialValues={{ newPosition: position }} onSubmit={formHandler}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <TextField
              label="Position"
              name="newPosition"
              id="newPosition"
              select
              value={props.values.newPosition}
              onChange={props.handleChange}
            >
              {positionArr.map((el) => (
                <MenuItem key={el} value={el}>
                  {el + 1}
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

export default ChangeCardPosition;
