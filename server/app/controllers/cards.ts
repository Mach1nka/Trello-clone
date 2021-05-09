import { Request, Response } from 'express';
import Card from '../models/card';

interface CardInDB {
  _id: string;
  description: string;
  column: string;
  position: number;
  __v: number;
}

const getCards = async (req: Request, res: Response): Promise<void> => {
  const { columnId } = req.params;
  try {
    const cards = await Card.find({ column: columnId });
    const filteredCardsObj = cards.length
      ? cards.map((el: CardInDB) => ({
          id: el._id,
          description: el.description,
          column: el.column,
          position: el.position
        }))
      : cards;
    res.status(200).json(filteredCardsObj);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const createNewCard = async (req: Request, res: Response): Promise<void> => {
  const { columnId, description, position } = req.body;
  try {
    const card = new Card({
      column: columnId,
      description,
      position
    });
    await card.save((_err: TypeError, model: CardInDB) => {
      res.status(201).json({ description, id: model._id, column: columnId, position });
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateCardDescription = async (req: Request, res: Response): Promise<void> => {
  const { cardId, newDescription } = req.body;
  try {
    const { id, description } = await Card.findOneAndUpdate(
      { _id: cardId },
      { description: newDescription },
      { new: true }
    );
    res.status(200).json({ id, description });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateCardPosition = async (req: Request, res: Response): Promise<void> => {
  const { cardId, newPosition } = req.body;
  try {
    const { id, position } = await Card.findOneAndUpdate(
      { _id: cardId },
      { position: newPosition },
      { new: true }
    );
    res.status(200).json({ id, position });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteCard = async (req: Request, res: Response): Promise<void> => {
  const { columnId, cardId } = req.body;
  try {
    await Card.findOneAndDelete({ _id: columnId, column: cardId });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getCards, createNewCard, updateCardDescription, updateCardPosition, deleteCard };
