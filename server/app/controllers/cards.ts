import { Request, Response } from 'express';
import Card, { CardsInDB } from '../models/card';

const getCards = async (req: Request, res: Response): Promise<void> => {
  const { columnId } = req.params;
  try {
    const cardsArr = await Card.find({ columnId });
    if (cardsArr.length) {
      const preparedArr = cardsArr.map((el) => ({
        id: el._id,
        name: el.name,
        description: el.description,
        position: el.position,
        columnId: el.columnId
      }));
      res.status(200).json({ columnId, cards: preparedArr });
    } else {
      res.status(404).json({ message: 'cards have not been found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const createNewCard = async (req: Request, res: Response): Promise<void> => {
  const { columnId, description, position, name } = req.body;
  const newCard = new Card({
    columnId,
    name,
    description,
    position: Number(position)
  });
  try {
    await newCard.save();
    const cardsData = await Card.find({ columnId });
    if (cardsData.length) {
      const bulkArr: any[] = [];
      cardsData.sort((a, b) => a.position - b.position);
      const elementsWithUpdatedPos = cardsData.map((el, idx) => ({
        _id: el._id,
        name: el.name,
        description: el.description,
        position: idx,
        columnId: el.columnId
      }));
      elementsWithUpdatedPos.forEach((el) => {
        bulkArr.push({
          updateOne: {
            filter: { _id: el._id },
            update: { position: el.position }
          }
        });
      });
      await Card.bulkWrite(bulkArr);
    }
    const createdCard = (await Card.findById(newCard._id)) as CardsInDB;
    res.status(201).json({
      id: createdCard._id,
      columnId: createdCard.columnId,
      name: createdCard.name,
      description: createdCard.description,
      position: createdCard.position
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateCardName = async (req: Request, res: Response): Promise<void> => {
  const { cardId, newName } = req.body;
  try {
    await Card.findByIdAndUpdate(cardId, { name: newName }, { new: true }, (_err, data) => {
      if (!data) {
        res.status(404).json({ message: 'the card has not been found' });
      } else {
        res.status(200).json({
          id: data._id,
          columnId: data.columnId,
          name: data.name,
          description: data.description,
          position: data.position
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateCardDescription = async (req: Request, res: Response): Promise<void> => {
  const { cardId, newDescription } = req.body;
  try {
    await Card.findByIdAndUpdate(
      cardId,
      { description: newDescription },
      { new: true },
      (_err, data) => {
        if (!data) {
          res.status(404).json({ message: 'the card has not been found' });
        } else {
          res.status(200).json({
            id: data._id,
            columnId: data.columnId,
            name: data.name,
            description: data.description,
            position: data.position
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateCardPosition = async (req: Request, res: Response): Promise<void> => {
  const { columnId, newPosition, cardId } = req.body;
  try {
    await Card.find({ columnId }, async (_err, data) => {
      if (data) {
        const bulkArr: any[] = [];
        const indexOldEl = data.findIndex((el) => el._id.toString() === cardId) as number;
        const editableEl = data.find((el) => el._id.toString() === cardId) as CardsInDB;

        if (editableEl.position < newPosition) {
          data.splice(+newPosition + 1, 0, editableEl);
          data.splice(indexOldEl, 1);
        } else {
          data.splice(+newPosition, 0, editableEl);
          data.splice(indexOldEl + 1, 1);
        }

        const elementsWithUpdatedPos = data.map((el, idx) => ({
          id: el._id,
          columnId: el.columnId,
          name: el.name,
          description: el.description,
          position: idx
        }));

        elementsWithUpdatedPos.forEach((el) => {
          bulkArr.push({
            updateOne: {
              filter: { _id: el.id },
              update: { position: el.position }
            }
          });
        });
        await Card.bulkWrite(bulkArr);

        res.status(200).json({ columnId, cards: elementsWithUpdatedPos });
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
  const { columnId, newColumnId, cardId, newPosition } = req.body;
  try {
    if (typeof newPosition === 'number') {
      await Card.findByIdAndUpdate(cardId, { columnId: newColumnId, position: newPosition });
    } else {
      await Card.findByIdAndUpdate(cardId, { columnId: newColumnId });
    }

    await Card.find({ columnId }, async (_err, data) => {
      if (data) {
        const bulkArr: any[] = [];
        const elementsWithUpdatedPos = data.map((el, idx) => ({
          _id: el._id,
          columnId: el.columnId,
          name: el.name,
          description: el.description,
          position: idx
        }));

        elementsWithUpdatedPos.forEach((el) => {
          bulkArr.push({
            updateOne: {
              filter: { _id: el._id },
              update: { position: el.position }
            }
          });
        });
        await Card.bulkWrite(bulkArr);
      }
    });

    await Card.find({ columnId: newColumnId }, async (_err, data) => {
      if (data) {
        const bulkArr: any[] = [];
        data.sort((a, b) => a.position - b.position);
        const elementsWithUpdatedPos = data.map((el, idx) => ({
          _id: el._id,
          columnId: el.columnId,
          name: el.name,
          description: el.description,
          position: idx
        }));

        elementsWithUpdatedPos.forEach((el) => {
          bulkArr.push({
            updateOne: {
              filter: { _id: el._id },
              update: { position: el.position }
            }
          });
        });
        await Card.bulkWrite(bulkArr);
        res.status(204).end();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteCard = async (req: Request, res: Response): Promise<void> => {
  const { cardId, columnId } = req.body;
  try {
    await Card.findByIdAndDelete(cardId);
    await Card.find({ columnId }, async (_err, data) => {
      if (data) {
        const bulkArr: any[] = [];
        const elementsWithUpdatedPos = data.map((el, idx) => ({
          _id: el._id,
          columnId: el.columnId,
          name: el.name,
          description: el.description,
          position: idx
        }));
        elementsWithUpdatedPos.forEach((el) => {
          bulkArr.push({
            updateOne: {
              filter: { _id: el._id },
              update: { position: el.position }
            }
          });
        });
        await Card.bulkWrite(bulkArr);
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
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  changeCardStatus,
  deleteCard
};
