import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useFetchUsers from '../../../utils/fetch-user-hook';
import { shareBoard } from '../../store/board/actions';
import { ShareModalForm as Form } from './sc';
import { useStyles } from './constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
}

const ShareBoardModal: React.FC<Props> = ({ isOpen, setModalView, boardId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const users = useFetchUsers();

  const formHandler = (values: { userId: string }) => {
    dispatch(shareBoard({ boardId, userId: values.userId }));
    setModalView(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClick={(evt) => evt.stopPropagation()}
      onClose={() => setModalView(false)}
    >
      <DialogTitle className={classes.dialogTitle}>Share board</DialogTitle>
      <Formik initialValues={{ userId: '' }} onSubmit={formHandler}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Autocomplete
              classes={{ root: classes.autocompleteRoot }}
              options={users}
              id="userId"
              onChange={(_e, value) => props.setFieldValue('userId', value?.id)}
              getOptionLabel={(option) => option.login}
              renderInput={(params) => (
                <TextField {...params} label="Choose user" variant="outlined" />
              )}
            />
            <DialogActions>
              <Button type="submit" color="secondary" variant="contained">
                Share
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ShareBoardModal;
