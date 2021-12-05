import { Dispatch, SetStateAction, useCallback, useContext } from 'react';
import { useFormik } from 'formik';
import {
  Dialog,
  TextField,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';

import { CardContext } from 'context/CardContext';
import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { createCard } from 'services/resources/request/card';
import { CardActions } from 'services/resources/model/card.model';
import { ErrorInfo } from 'services/HttpService/types';
import { CreateCardForm as Form, SubmitButton } from '../sc';
import { configValidationSchema } from '../utils';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
}

export const CreateCardModal: React.FC<Props> = ({
  isOpen,
  setModalView,
  columnId,
}) => {
  const { dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const validationSchema = configValidationSchema;
  const initialValues = { name: '', description: '' };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      createCard({
        name: values.name.trim(),
        columnId,
        description: values.description.trim(),
      })
        .then((resp) =>
          cardDispatch({
            type: CardActions.PUT_CREATED_CARD,
            payload: resp.data,
          })
        )
        .catch((err: ErrorInfo) => {
          alertDispatch({
            type: AlertActions.ADD,
            payload: {
              id: `${Date.now()}`,
              message: err.message,
              status: AlertStatusData.ERROR,
            },
          });
        })
        .finally(() => onClose());
    },
  });

  const onClose = useCallback(() => {
    setModalView(false);
    formik.resetForm();
  }, []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>Create new card</DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="normal"
          variant="outlined"
          id="name"
          name="name"
          label="Card name"
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
          label="Card description"
          type="string"
          onChange={formik.handleChange}
          error={formik.touched.description && !!formik.errors.description}
          helperText={formik.touched.description && formik.errors.description}
        />
        <DialogActions style={{ padding: '10px 0' }}>
          <SubmitButton size="small" type="submit" variant="contained">
            Create
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
