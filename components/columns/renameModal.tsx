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
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { ColumnContext } from 'context/ColumnContext';
import { ColumnActions } from 'services/resources/model/column.model';
import { updateColumnName } from 'services/resources/request/column';
import { configValidationSchema } from 'utils/validationSchema';
import { SubmitButton, ModalForm as Form } from './sc';
import { ErrorInfo } from 'services/HttpService/types';

interface Props {
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
  columnId: string;
  columnName: string;
}

export const RenameColumnModal: React.FC<Props> = ({
  isOpen,
  setModalView,
  columnId,
  columnName,
}) => {
  const { dispatch: columnDispatch } = useContext(ColumnContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);
  const validationSchema = configValidationSchema('newName');
  const initialValues = { newName: columnName };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      updateColumnName({ newName: values.newName.trim(), columnId })
        .then((resp) => {
          columnDispatch({
            type: ColumnActions.PUT_RENAMED_COLUMN,
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
        Change column name
      </DialogTitle>
      <Form onSubmit={formik.handleSubmit} autoComplete="off">
        <TextField
          size="medium"
          margin="none"
          id="newName"
          name="newName"
          label="New column name"
          type="string"
          autoFocus
          defaultValue={columnName}
          onChange={formik.handleChange}
          error={formik.touched.newName && !!formik.errors.newName}
          helperText={formik.touched.newName && formik.errors.newName}
        />
        <DialogActions>
          <SubmitButton size="small" type="submit" variant="contained">
            Rename
          </SubmitButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
