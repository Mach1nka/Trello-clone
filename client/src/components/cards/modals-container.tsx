import React from 'react';
import { useAppSelector } from '../../store/hooks';
import RenameCardModal from './rename-card';
import ChangeCardPosition from './change-card-position';
import ChangeCardStatus from './change-card-status';
import CardDetails from './card-details';

const ModalsContainer: React.FC = () => {
  const { cardData, modalsStates } = useAppSelector((state) => state.modalsData);
  const selectedCard = useAppSelector(
    (state) =>
      cardData.cardId && state.cardsData[cardData.columnId].find((el) => el.id === cardData.cardId)
  );

  if (selectedCard) {
    return (
      <>
        <CardDetails
          isOpen={modalsStates.isDetailsModalVisible}
          name={selectedCard.name}
          description={selectedCard.description}
          cardId={cardData.cardId}
          columnId={cardData.columnId}
        />
        <ChangeCardStatus
          isOpen={modalsStates.isStatusModalVisible}
          cardId={cardData.cardId}
          columnId={cardData.columnId}
        />
        <RenameCardModal
          isOpen={modalsStates.isRenameModalVisible}
          cardName={selectedCard.name}
          cardId={cardData.cardId}
        />
        <ChangeCardPosition
          isOpen={modalsStates.isPositionModalVisible}
          position={selectedCard.position}
          cardId={cardData.cardId}
          columnId={cardData.columnId}
        />
      </>
    );
  }

  return (
    <CardDetails
      isOpen={modalsStates.isDetailsModalVisible}
      name={cardData.name}
      description={cardData.description}
      cardId={cardData.cardId}
      columnId={cardData.columnId}
    />
  );
};

export default ModalsContainer;
