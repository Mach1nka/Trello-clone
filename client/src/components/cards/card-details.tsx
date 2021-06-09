import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography
} from '@material-ui/core';
import { changeCardDescription, renameCard } from '../../store/card/actions';
import { useStyles } from './constants';
import { configValidationSchema } from './utils';

interface Props {
  name: string;
  cardId: string;
  description: string;
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
}

const CardDetails: React.FC<Props> = ({ name, description, isOpen, setModalView, cardId }) => {
  const dispatch = useDispatch();
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { name, description },
    validationSchema: configValidationSchema,
    onSubmit: (values) => {
      if (values.name !== name) {
        dispatch(renameCard({ cardId, newName: values.name }));
      }
      if (values.description !== description) {
        dispatch(changeCardDescription({ cardId, newDescription: values.description }));
      }
    }
  });

  return (
    <>
      <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={() => setModalView(false)}>
        <DialogTitle>
          {!isNameFocused ? (
            <Typography onClick={() => setIsNamedFocused(true)} className={classes.cardName}>
              {name}
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
                  multiline
                  variant="filled"
                  inputProps={{ className: classes.descriptionTextarea }}
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
                {description}
              </Typography>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalView(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardDetails;
