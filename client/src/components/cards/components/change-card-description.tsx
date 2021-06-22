import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Dialog, TextField, DialogActions, DialogTitle, Button } from '@material-ui/core';
import { ModalForm as Form } from '../../boards-page/sc';
import { changeCardDescription } from '../../../store/card/actions';
import { useStyles } from '../../boards-page/constants';
import { descriptionTextValidation } from '../utils';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  cardId: string;
  cardDescription: string;
}

const ChangeCardDescriptionModal: React.FC<Props> = ({
  isOpen,
  setModalView,
  cardId,
  cardDescription
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { newDescription: cardDescription },
    validationSchema: descriptionTextValidation,
    onSubmit: (values) => {
      dispatch(changeCardDescription({ newDescription: values.newDescription, cardId }));
      setModalView(false);
    }
  });
  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={() => setModalView(false)}>
      <DialogTitle className={classes.dialogTitle}>Change card description</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="newDescription"
          name="newDescription"
          label="New card description"
          type="string"
          autoFocus
          defaultValue={cardDescription}
          onChange={formik.handleChange}
          error={formik.touched.newDescription && !!formik.errors.newDescription}
          helperText={formik.touched.newDescription && formik.errors.newDescription}
        />
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
    </Dialog>
  );
};

export default ChangeCardDescriptionModal;
