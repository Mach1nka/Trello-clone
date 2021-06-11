import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { CardsContainer as Container } from './sc';
import { getCards } from '../../store/card/actions';
import Card from './card';

interface Props {
  columnId: string;
}

const CardsContainer: React.FC<Props> = ({ columnId }) => {
  const dispatch = useDispatch();
  const cardsData = useAppSelector((state) => state.cardsData[columnId]);

  useEffect(() => {
    dispatch(getCards(columnId));
  }, []);

  return (
    <Container>
      {cardsData?.map((el) => (
        <Card
          key={el.id}
          cardId={el.id}
          name={el.name}
          columnId={columnId}
          description={el.description}
        />
      ))}
    </Container>
  );
};
export default CardsContainer;
