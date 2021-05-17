import { Request, Response } from 'express';
import Card, { CardData, CardsInDB } from '../models/card';

const getCards = async (req: Request, res: Response): Promise<void> => {
  const { columnId } = req.params;
  try {
    const cardsContainer = await Card.findOne({ columnId });
    if (cardsContainer) {
      res.status(200).json({ id: cardsContainer._id, cards: cardsContainer.cards });
    } else {
      res.status(404).json({ message: 'card have not been found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const createNewCard = async (req: Request, res: Response): Promise<void> => {
  const { columnId, description, position } = req.body;
  const newCard: { description: string; position: number } = {
    description,
    position: Number(position)
  };
  try {
    const isCardCreated = await Card.exists({ columnId });
    if (isCardCreated) {
      await Card.findOneAndUpdate(
        { columnId },
        { $addToSet: { cards: newCard } },
        { new: true, lean: true },
        (_err, model) => {
          const createdCard = model?.cards.pop() as CardData;
          res.status(201).json({ _id: createdCard._id, ...newCard });
        }
      );
    } else {
      const card = new Card({
        columnId,
        cards: [newCard]
      });
      await card.save((_err, model) => {
        res.status(201).json({ id: model._id, cards: model.cards });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateCardDescription = async (req: Request, res: Response): Promise<void> => {
  const { cardsContainerId, cardId, newDescription } = req.body;
  try {
    await Card.findById(cardsContainerId).exec(async (_err, data) => {
      if (data) {
        const updatedCards = data.cards.map((el) =>
          el._id.toString() === cardId
            ? { _id: el._id, description: newDescription, position: el.position }
            : el
        );
        await Card.findByIdAndUpdate(cardsContainerId, { cards: updatedCards });
        const renamedCard = updatedCards.find((el) => el._id.toString() === cardId);
        res.status(200).json(renamedCard);
      } else {
        res.status(404).json({ message: 'the card has not been found' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateCardPosition = async (req: Request, res: Response): Promise<void> => {
  const { cardId, cardsContainerId, newPosition } = req.body;
  try {
    await Card.findById(cardsContainerId).exec(async (_err, data) => {
      if (data) {
        const cardsArr = data.cards;
        const indexOldEl = cardsArr.findIndex((el) => el._id.toString() === cardId) as number;
        const editableEl = cardsArr.find((el) => el._id.toString() === cardId) as CardData;

        if (editableEl.position < newPosition) {
          cardsArr.splice(+newPosition + 1, 0, editableEl);
          cardsArr.splice(indexOldEl, 1);
        } else {
          cardsArr.splice(+newPosition, 0, editableEl);
          cardsArr.splice(indexOldEl + 1, 1);
        }

        const updatedCards = cardsArr.map((el, idx) => ({
          _id: el._id,
          description: el.description,
          position: idx
        }));
        const { id, cards } = (await Card.findByIdAndUpdate(
          cardsContainerId,
          { cards: updatedCards },
          { new: true }
        )) as CardsInDB;
        res.status(200).json({ id, cards });
      } else {
        res.status(404).json({ message: 'the card has not been found' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteCard = async (req: Request, res: Response): Promise<void> => {
  const { cardsContainerId, cardId } = req.body;
  try {
    await Card.findById(cardsContainerId).exec(async (_err, data) => {
      if (data) {
        const sortedCards = data.cards.filter((el) => el._id.toString() !== cardId);
        await Card.findByIdAndUpdate(cardsContainerId, { cards: sortedCards });
        res.status(204).end();
      } else {
        res.status(204).end();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getCards, createNewCard, updateCardDescription, updateCardPosition, deleteCard };
