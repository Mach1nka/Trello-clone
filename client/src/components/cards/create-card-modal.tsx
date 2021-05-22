import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { ModalForm as Form } from './sc';
import { createCard } from '../../store/card/actions';
import { configValidationSchema } from './utils';
import { useStyles } from '../boards-page/constants';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
}

const CreateCardModal: React.FC<Props> = ({ isOpen, setModalView, columnId }) => {
  const dispatch = useDispatch();
  const positionOfNewCard = useAppSelector((state) =>
    state.cardData.cards[columnId] ? state.cardData.cards[columnId].length : 0
  );
  const validationSchema = configValidationSchema;
  const classes = useStyles();
  const initialValues = { name: '', description: '' };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        createCard({
          name: values.name,
          columnId,
          description: values.description,
          position: positionOfNewCard
        })
      );
      setModalView(false);
    }
  });
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Create new card</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="normal"
          variant="outlined"
          id="name"
          name="name"
          label="Column name"
          type="string"
          autoFocus
          onChange={formik.handleChange}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          size="medium"
          margin="normal"
          variant="outlined"
          id="description"
          name="description"
          label="Column description"
          type="string"
          onChange={formik.handleChange}
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
        />
        <DialogActions style={{ padding: '10px 0' }}>
          <Button size="small" type="submit" color="secondary" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default CreateCardModal;
