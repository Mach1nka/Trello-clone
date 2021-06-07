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
import { descriptionTextValidation, cardNameValidation } from './utils';

interface Props {
  name: string;
  cardId: string;
  description: string;
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
}

const CardsDescription: React.FC<Props> = ({ name, description, isOpen, setModalView, cardId }) => {
  const dispatch = useDispatch();
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const [isDescriptionFocused, setssDescriptionFocused] = useState(false);
  const classes = useStyles();

  const formik = useFormik({
    initialValues: { newName: name },
    validationSchema: cardNameValidation,
    onSubmit: (values) => {
      dispatch(renameCard({ cardId, newName: values.newName }));
    }
  });

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={() => {
          setModalView(false);
        }}
      >
        <DialogTitle>
          {!isNameFocused ? (
            <Typography onClick={() => setIsNamedFocused(true)} className={classes.cardName}>
              {name}
            </Typography>
          ) : (
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
              <TextField
                id="newName"
                name="newName"
                autoFocus
                fullWidth
                inputProps={{ className: classes.cardName }}
                defaultValue={name}
                onChange={formik.handleChange}
                error={formik.touched.newName && !!formik.errors.newName}
                helperText={formik.touched.newName && formik.errors.newName}
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
          <Typography gutterBottom className={classes.descriptionText}>
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalView(false)}>close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardsDescription;
