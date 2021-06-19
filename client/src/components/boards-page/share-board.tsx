import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAppSelector } from '../../store/hooks';
import useFetchUsers from '../../../utils/fetch-user-hook';
import { shareBoard } from '../../store/board/actions';
import { setModalsStates, setModalData } from '../../store/data-for-modals/actions';
import { ShareModalForm as Form } from './sc';
import { useStyles } from './constants';

const ShareBoardModal: React.FC = () => {
  const dispatch = useDispatch();
  const [searchUserLogin, setUserLogin] = useState('');
  const { isShareModalVisible } = useAppSelector((state) => state.modalsData.modalsStates);
  const { boardId } = useAppSelector((state) => state.modalsData.dataForModals);
  const classes = useStyles();
  const users = useFetchUsers(searchUserLogin);

  const formHandler = (values: { userId: string }) => {
    setUserLogin('');
    dispatch(shareBoard({ boardId, userId: values.userId }));
    dispatch(setModalsStates({ isShareModalVisible: false }));
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isShareModalVisible}
      onClick={(evt) => evt.stopPropagation()}
      onClose={() => {
        setUserLogin('');
        dispatch(setModalData({ boardId: '' }));
        dispatch(setModalsStates({ isShareModalVisible: false }));
      }}
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
                <TextField
                  {...params}
                  onChange={(event) => setTimeout(() => setUserLogin(event.target.value), 500)}
                  label="Choose user"
                  variant="outlined"
                />
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
