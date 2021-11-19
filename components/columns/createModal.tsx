import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
} from 'react';
import { useFormik } from 'formik';
import {
  Dialog,
  TextField,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';

import {
  AlertContext,
  AlertActions,
  AlertStatusData,
} from 'context/AlertContext';
import { ColumnContext } from 'context/ColumnContext';
import { ColumnActions } from 'services/resources/model/column.model';
import { createColumn } from 'services/resources/request/column';
import { configValidationSchema } from 'utils/validationSchema';
import { SubmitButton, ModalForm as Form } from './sc';
import { ErrorInfo } from 'services/HttpService/types';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  boardId: string;
  newPosition: number;
}

export const CreateColumnModal: React.FC<Props> = ({
  isOpen,
  setModalView,
  boardId,
  newPosition,
}) => {
  const { dispatch: columnDispatch } = useContext(ColumnContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const validationSchema = configValidationSchema('name');
  const initialValues = { name: '' };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      createColumn({
        name: values.name.trim(),
        boardId,
        position: newPosition,
      })
        .then((resp) => {
          columnDispatch({
            type: ColumnActions.PUT_CREATED_COLUMN,
            payload: resp.data,
          });
        })
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
        .finally(() => setModalView(false));
    },
  });

  const onClose = useCallback(() => setModalView(false), []);

  return (
    <Dialog fullWidth maxWidth="xs" open={isOpen} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center' }}>
        Create new column
      </DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="name"
          name="name"
          label="Column name"
          type="string"
          autoFocus
          onChange={formik.handleChange}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
        <DialogActions>
          <SubmitButton size="small" type="submit" variant="contained">
            Create
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
