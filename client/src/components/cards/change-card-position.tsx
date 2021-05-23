import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button, MenuItem } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { ModalForm as Form } from '../boards-page/sc';
import { changeCardPosition } from '../../store/card/actions';
import { useStyles } from '../boards-page/constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  cardId: string;
  position: number;
}

const ChangeCardPosition: React.FC<Props> = ({
  isOpen,
  setModalView,
  columnId,
  cardId,
  position
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const positionArr = useAppSelector((state) =>
    state.cardData.cards[columnId].map((el) => el.position)
  );

  const formHandler = (values: { newPosition: number }) => {
    if (values.newPosition !== position) {
      dispatch(
        changeCardPosition({
          cardId,
          newPosition: values.newPosition,
          columnId
        })
      );
    }
    setModalView(false);
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Change card position</DialogTitle>
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

export default ChangeCardPosition;
