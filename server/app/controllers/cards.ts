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
    const isCardContainerCreated = await Card.exists({ columnId });
    if (isCardContainerCreated) {
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
  const { cardsContainerId, newPosition, cardId } = req.body;
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

const changeCardStatus = async (req: Request, res: Response): Promise<void> => {
  const { cardsContainerId, idNewColumn, cardId } = req.body;
  try {
    const cardContainer = await Card.findById(cardsContainerId);
    const cardArr = cardContainer?.cards;
    const changingEl = cardArr?.find((el) => el._id.toString() === cardId);
    const sortedCards = cardArr?.filter((el) => el._id.toString() !== cardId);
    await Card.findByIdAndUpdate(cardsContainerId, { cards: sortedCards });

    const isNewCardContainerCreated = await Card.exists({ columnId: idNewColumn });
    if (changingEl) {
      if (isNewCardContainerCreated) {
        await Card.findOne({ columnId: idNewColumn }).exec(async (_err, data) => {
          if (data) {
            data.cards.push(changingEl);
            const updatedCards = data?.cards.map((el, idx) => ({
              _id: el._id,
              description: el.description,
              position: idx
            }));
            await Card.findOneAndUpdate({ columnId: idNewColumn }, { cards: updatedCards });
            res.status(201).json({ cards: updatedCards });
          } else {
            res.status(404).end();
          }
        });
      } else {
        const card = new Card({
          columnId: idNewColumn,
          cards: [{ description: changingEl.description, position: changingEl.position }]
        });
        await card.save((_err, model) => {
          console.log(_err);
          res.status(201).json({ id: model._id, cards: model.cards });
        });
      }
    } else {
      res.status(404).end();
    }
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
        const elementsWithUpdatedPos = sortedCards.map((el, idx) => ({
          _id: el._id,
          description: el.description,
          position: idx
        }));
        await Card.findByIdAndUpdate(cardsContainerId, { cards: elementsWithUpdatedPos });
      }
      res.status(204).end();
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export {
  getCards,
  createNewCard,
  updateCardDescription,
  updateCardPosition,
  changeCardStatus,
  deleteCard
};
