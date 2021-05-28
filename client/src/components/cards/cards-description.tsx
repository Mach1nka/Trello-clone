import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from './constants';
import ChangeCardDescriptionModal from './change-card-description';

interface Props {
  name: string;
  cardId: string;
  description: string;
  isOpen: boolean;
  setModalView: Dispatch<SetStateAction<boolean>>;
}

const CardsDescription: React.FC<Props> = ({ name, description, isOpen, setModalView, cardId }) => {
  const classes = useStyles();
  const [isOpenRenameModal, setRenameModalView] = useState(false);
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
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <Typography variant="button">
            Description
            <IconButton
              onClick={() => setRenameModalView(true)}
              size="small"
              style={{ alignSelf: 'flex-start', fontSize: '16px', marginLeft: '5px' }}
            >
              <EditIcon style={{ fontSize: 'inherit' }} />
            </IconButton>
          </Typography>
          <Typography gutterBottom className={classes.descriptionText} variant="body2">
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalView(false)}>close</Button>
        </DialogActions>
      </Dialog>
      <ChangeCardDescriptionModal
        isOpen={isOpenRenameModal}
        setModalView={setRenameModalView}
        cardId={cardId}
        cardDescription={description}
      />
    </>
  );
};

export default CardsDescription;
