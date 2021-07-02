import React from 'react';

import { useAppSelector } from '../../../store/hooks';
import RenameCardModal from './rename-card';
import ChangeCardPosition from './change-card-position';
import ChangeCardStatus from './change-card-status';
import CardDetails from './card-details';

const ModalsContainer: React.FC = () => {
  const { dataForModals, modalsStates } = useAppSelector((state) => state.modalsData);
  const selectedCard = useAppSelector(
    (state) =>
      dataForModals.columnId &&
      state.cardsData[dataForModals.columnId].find((el) => el.id === dataForModals.cardId)
  );

  if (selectedCard) {
    return (
      <>
        <CardDetails
          isOpen={modalsStates.isDetailsModalVisible}
          name={selectedCard.name}
          description={selectedCard.description}
          cardId={dataForModals.cardId}
          columnId={dataForModals.columnId}
        />
        <ChangeCardStatus
          isOpen={modalsStates.isStatusModalVisible}
          cardId={dataForModals.cardId}
          columnId={dataForModals.columnId}
        />
        <RenameCardModal
          isOpen={modalsStates.isRenameModalVisible}
          cardName={selectedCard.name}
          cardId={dataForModals.cardId}
        />
        <ChangeCardPosition
          isOpen={modalsStates.isPositionModalVisible}
          position={selectedCard.position}
          cardId={dataForModals.cardId}
          columnId={dataForModals.columnId}
        />
      </>
    );
  }
  return (
    <CardDetails
      isOpen={modalsStates.isDetailsModalVisible}
      name={dataForModals.name}
      description={dataForModals.description}
      cardId={dataForModals.cardId}
      columnId={dataForModals.columnId}
    />
  );
};

export default ModalsContainer;
