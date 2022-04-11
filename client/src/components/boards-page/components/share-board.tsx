import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Dialog, DialogTitle, DialogActions, TextField } from '@material-ui/core';

import { useAppSelector } from '../../../store/hooks';
import useFetchUsers from '../../../../utils/fetch-user-hook';
import { shareBoard } from '../../../store/actions/board';
import { setModalsStates, setBoardIdForModal } from '../../../store/actions/modal';
import { ShareModalForm as Form, BoardSC as SC, SubmitButton } from '../sc';

const ShareBoardModal: React.FC = () => {
  const dispatch = useDispatch();
  const [searchUserLogin, setUserLogin] = useState('');
  const users = useFetchUsers(searchUserLogin);

  const { isShareModalVisible } = useAppSelector((state) => state.modalsData.modalsStates);
  const { boardId } = useAppSelector((state) => state.modalsData.dataForModals);

  const formHandler = useCallback(
    (values: { userId: string }) => {
      setUserLogin('');
      dispatch(shareBoard({ boardId, userId: values.userId }));
      dispatch(setModalsStates({ isShareModalVisible: false }));
    },
    [boardId]
  );

  const onClose = useCallback(() => {
    setUserLogin('');
    dispatch(setBoardIdForModal({ boardId: '' }));
    dispatch(setModalsStates({ isShareModalVisible: false }));
  }, []);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isShareModalVisible}
      onClick={(evt) => evt.stopPropagation()}
      onClose={onClose}
    >
      <DialogTitle style={{ textAlign: 'center' }}>Share board</DialogTitle>
      <Formik initialValues={{ userId: '' }} onSubmit={formHandler}>
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <SC.Autocomplete
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
              <SubmitButton type="submit" variant="contained">
                Share
              </SubmitButton>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default ShareBoardModal;
