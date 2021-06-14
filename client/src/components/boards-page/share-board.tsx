import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useFetchUsers from '../../../utils/fetch-user-hook';
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

  const validationSchema = yup.object({
    user: yup.string().required('User is required')
  });

  const formik = useFormik({
    initialValues: { user: '' },
    validationSchema,
    onSubmit: (values) => {
      dispatch();
      setModalView(false);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClick={(evt) => evt.stopPropagation()}
      onClose={() => setModalView(false)}
    >
      <DialogTitle className={classes.dialogTitle}>Share board</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <Autocomplete
          classes={{ root: classes.autocompleteRoot }}
          options={users}
          id="user"
          onChange={(_e, value) => formik.setFieldValue('user', value?.id)}
          getOptionLabel={(option) => option.login}
          renderInput={(params) => (
            <TextField
              {...params}
              error={formik.touched.user && !!formik.errors.user}
              helperText={formik.touched.user && formik.errors.user}
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
    </Dialog>
  );
};

export default ShareBoardModal;
