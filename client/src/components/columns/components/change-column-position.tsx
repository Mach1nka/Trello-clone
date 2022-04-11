import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, MenuItem } from '@material-ui/core';

import { useAppSelector } from '../../../store/hooks';
import { changeColumnPosition } from '../../../store/actions/column';
import { SubmitButton, ModalForm as Form } from '../sc';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  boardId: string;
  position: number;
}

const ChangeColumnPosition: React.FC<Props> = ({
  isOpen,
  setModalView,
  columnId,
  boardId,
  position
}) => {
  const dispatch = useDispatch();
  const positionArr = useAppSelector((state) =>
    state.boardColumns.columns.map((el) => el.position)
  );

  const formHandler = useCallback(
    (values: { newPosition: number }) => {
      if (values.newPosition !== position) {
        dispatch(
          changeColumnPosition({
            boardId,
            newPosition: values.newPosition,
            columnId
          })
        );
      }
      setModalView(false);
    },
    [position]
  );

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Change column position</DialogTitle>
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

export default ChangeColumnPosition;
