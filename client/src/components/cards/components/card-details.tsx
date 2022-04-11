import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { useAppSelector } from '../../../store/hooks';
import { changeCardDescription, renameCard, deleteCard } from '../../../store/actions/card';
import { setModalsStates, resetModalData } from '../../../store/actions/modal';
import { configValidationSchema } from '../utils';
import { CardSC as SC } from '../sc';

interface Props {
  name: string;
  cardId: string;
  columnId: string;
  description: string;
  isOpen: boolean;
}

const CardDetails: React.FC<Props> = ({ name, description, isOpen, cardId, columnId }) => {
  const dispatch = useDispatch();
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const columnName = useAppSelector(
    (state) => state.boardColumns.columns.find((el) => el.id === columnId)?.name
  );

  const formik = useFormik({
    initialValues: { name, description },
    enableReinitialize: true,
    validationSchema: configValidationSchema,
    onSubmit: (values) => {
      if (values.name !== formik.initialValues.name) {
        dispatch(renameCard({ cardId, newName: values.name }));
      }
      if (values.description !== formik.initialValues.description) {
        dispatch(changeCardDescription({ cardId, newDescription: values.description.trim() }));
      }
    }
  });

  const hideDetailsModal = useCallback(() => {
    dispatch(setModalsStates({ isDetailsModalVisible: false }));
    dispatch(resetModalData());
  }, []);

  const blurName = useCallback(() => {
    setIsNamedFocused(false);
    formik.submitForm();
  }, []);

  const blurDescription = useCallback(() => {
    setIsDescriptionFocused(false);
    formik.submitForm();
  }, []);

  const focusName = useCallback(() => setIsNamedFocused(true), []);

  const focusDescription = useCallback(() => setIsDescriptionFocused(true), []);

  const handleDeleteCard = useCallback(() => {
    dispatch(deleteCard({ columnId, cardId }));
    dispatch(resetModalData());
  }, [cardId]);

  const showStatusModal = useCallback(
    () => dispatch(setModalsStates({ isStatusModalVisible: true })),
    []
  );

  return (
    <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={hideDetailsModal}>
      <DialogTitle>
        {!isNameFocused ? (
          <SC.Name onClick={focusName}>{formik.values.name}</SC.Name>
        ) : (
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <SC.NameField
              id="name"
              name="name"
              autoFocus
              fullWidth
              defaultValue={name}
              onChange={formik.handleChange}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={blurName}
            />
          </form>
        )}
        <Typography variant="body2">
          It is in column
          <SC.ColumnNameButton onClick={showStatusModal}>{columnName}</SC.ColumnNameButton>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="button">Description</Typography>
        <div>
          {isDescriptionFocused || !description ? (
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <SC.DescriptionField
                id="description"
                name="description"
                autoFocus={isDescriptionFocused}
                fullWidth
                placeholder={!description ? 'Add description' : ''}
                InputProps={{ inputComponent: 'textarea' }}
                variant="filled"
                defaultValue={description}
                onChange={formik.handleChange}
                error={formik.touched.description && !!formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                onBlur={blurDescription}
              />
            </form>
          ) : (
            <SC.DescriptionText onClick={focusDescription}>
              {formik.values.description}
            </SC.DescriptionText>
          )}
        </div>
      </DialogContent>
      <SC.DialogActions>
        <IconButton aria-label="delete card" onClick={handleDeleteCard}>
          <DeleteIcon color="error" />
        </IconButton>
        <Button onClick={hideDetailsModal}>close</Button>
      </SC.DialogActions>
    </Dialog>
  );
};

export default CardDetails;
