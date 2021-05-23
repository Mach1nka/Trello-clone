import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button, MenuItem } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { ModalForm as Form } from '../boards-page/sc';
import { changeCardStatus, getCards } from '../../store/card/actions';
import { useStyles } from '../boards-page/constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  cardId: string;
}

const ChangeCardStatus: React.FC<Props> = ({ isOpen, setModalView, columnId, cardId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const columnsArr = useAppSelector((state) =>
    state.boardColumns.columns.map((el) => ({ columnName: el.name, columnId: el.id }))
  );

  const formHandler = (values: { newStatus: string }) => {
    if (values.newStatus !== columnId) {
      dispatch(
        changeCardStatus({
          cardId,
          newColumnId: values.newStatus,
          columnId
        })
      );
      dispatch(getCards(values.newStatus));
    }
    setModalView(false);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Change card position</DialogTitle>
      <Formik initialValues={{ newStatus: columnId }} onSubmit={(values) => formHandler(values)}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <TextField
              label="Position"
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

export default ChangeCardStatus;
