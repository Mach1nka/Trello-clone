import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useAppSelector } from '../../store/hooks';
import { changeCardDescription, renameCard, deleteCard } from '../../store/card/actions';
import { setModalsStates, resetModalData } from '../../store/data-for-modals/actions';
import { useStyles } from './constants';
import { configValidationSchema } from './utils';

interface Props {
  name: string;
  cardId: string;
  columnId: string;
  description: string;
  isOpen: boolean;
}

const CardDetails: React.FC<Props> = ({ name, description, isOpen, cardId, columnId }) => {
  const dispatch = useDispatch();
  const columnName = useAppSelector(
    (state) => state.boardColumns.columns.find((el) => el.id === columnId)?.name
  );
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { name, description },
    validationSchema: configValidationSchema,
    onSubmit: (values) => {
      if (values.name !== formik.initialValues.name) {
        dispatch(renameCard({ cardId, newName: values.name }));
      }
      if (values.description !== formik.initialValues.description) {
        dispatch(changeCardDescription({ cardId, newDescription: values.description }));
      }
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isOpen}
      onClose={() => dispatch(setModalsStates({ isDetailsModalVisible: false }))}
    >
      <DialogTitle>
        {!isNameFocused ? (
          <Typography onClick={() => setIsNamedFocused(true)} className={classes.cardName}>
            {formik.values.name || name}
          </Typography>
        ) : (
          <form autoComplete="off" onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              name="name"
              autoFocus
              fullWidth
              inputProps={{ className: classes.cardName }}
              defaultValue={name}
              onChange={formik.handleChange}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={() => {
                setIsNamedFocused(false);
                formik.submitForm();
              }}
            />
          </form>
        )}
        <Typography variant="body2">
          It is in column
          <Button
            onClick={() => dispatch(setModalsStates({ isStatusModalVisible: true }))}
            classes={{ text: classes.columnNameButton }}
          >
            {columnName}
          </Button>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="button">Description</Typography>
        <div>
          {isDescriptionFocused || !description ? (
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <TextField
                id="description"
                name="description"
                autoFocus={isDescriptionFocused}
                fullWidth
                placeholder={!description ? 'Add description' : ''}
                inputProps={{ className: classes.descriptionTextarea }}
                InputProps={{ inputComponent: 'textarea' }}
                variant="filled"
                defaultValue={description}
                onChange={formik.handleChange}
                error={formik.touched.description && !!formik.errors.description}
                helperText={formik.touched.description && formik.errors.description}
                onBlur={() => {
                  setIsDescriptionFocused(false);
                  formik.submitForm();
                }}
              />
            </form>
          ) : (
            <Typography
              className={classes.descriptionText}
              onClick={() => setIsDescriptionFocused(true)}
            >
              {formik.values.description || description}
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions classes={{ root: classes.dialogActions }}>
        <IconButton
          onClick={() => {
            dispatch(deleteCard({ columnId, cardId }));
            dispatch(resetModalData());
          }}
        >
          <DeleteIcon color="secondary" />
        </IconButton>
        <Button
          onClick={() => {
            dispatch(setModalsStates({ isDetailsModalVisible: false }));
            dispatch(resetModalData());
          }}
        >
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardDetails;
