import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button, MenuItem } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { ModalForm as Form } from '../boards-page/sc';
import { changeColumnPosition } from '../../store/column/actions';
import { useStyles } from '../boards-page/constants';

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
  const classes = useStyles();
  const positionArr = useAppSelector((state) =>
    state.boardColumns.columns.map((el) => el.position)
  );

  const formHandler = (values: { newPosition: number }) => {
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
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Change column position</DialogTitle>
      <Formik initialValues={{ newPosition: position }} onSubmit={(values) => formHandler(values)}>
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
              <Button size="small" type="submit" color="secondary" variant="contained">
                Change
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ChangeColumnPosition;
