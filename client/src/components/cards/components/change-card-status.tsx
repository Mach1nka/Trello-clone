import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button, MenuItem } from '@material-ui/core';

import { useAppSelector } from '../../../store/hooks';
import { ModalForm as Form } from '../../boards-page/sc';
import { changeCardStatus } from '../../../store/card/actions';
import { setModalsStates, setModalData } from '../../../store/modals/actions';
import { useStyles } from '../../boards-page/constants';

interface Props {
  isOpen: boolean;
  columnId: string;
  cardId: string;
}

const ChangeCardStatus: React.FC<Props> = ({ isOpen, columnId, cardId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const columnsArr = useAppSelector((state) =>
    state.boardColumns.columns.map((el) => ({ columnName: el.name, columnId: el.id }))
  );

  const { name, description } = useAppSelector((state) =>
    state.cardsData[columnId].find((el) => el.id === cardId)
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
      dispatch(setModalData({ cardId, columnId: values.newStatus, name, description }));
    }
    dispatch(setModalsStates({ isStatusModalVisible: false }));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={() => dispatch(setModalsStates({ isStatusModalVisible: false }))}
    >
      <DialogTitle className={classes.dialogTitle}>Change card status</DialogTitle>
      <Formik initialValues={{ newStatus: columnId }} onSubmit={(values) => formHandler(values)}>
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
              <Button
                size="small"
                type="submit"
                classes={{ root: classes.submitButton }}
                variant="contained"
              >
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
