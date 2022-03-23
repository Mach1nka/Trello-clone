import { columnRepository, boardRepository } from '../database/repositories';
import { BoardColumn as Column } from '../entities/column';
import { Board } from '../entities/board';
import BadRequest from '../../utils/errors/bad-request';
import NotFound from '../../utils/errors/not-found';
import repositionColumn from '../../utils/reposition-column';
import {
  ParamsForGetting,
  BodyForCreating,
  BodyForRenaming,
  BodyForReposition,
  BodyForDeleting
} from '../../types/columns/interfaces';

const getColumnsService = async (data: ParamsForGetting): Promise<Column[]> => {
  const { boardId } = data;
  const columns: Column[] = await columnRepository().find({
    where: { board: { id: boardId } }
  });

  return columns;
};

const createColumnService = async (data: BodyForCreating): Promise<Column> => {
  const { name, boardId } = data;
  const board: Board | undefined = await boardRepository().findOne(boardId);

  if (!board) {
    throw new NotFound('The Board does not exist');
  }

  const numberOfColumns = await columnRepository().count({
    relations: ['board'],
    where: { board: { id: boardId } }
  });

  const createdBoard = await columnRepository().save({
    board,
    name,
    position: numberOfColumns
  });

  return createdBoard;
};

const updateNameService = async (data: BodyForRenaming): Promise<Column> => {
  const { columnId, newName } = data;
  const column: Column | undefined = await columnRepository().findOne(columnId, {
    relations: ['board']
  });

  if (!column) {
    throw new NotFound('Column does not exist');
  }

  const updatedColumn: Column = await columnRepository().save({ ...column, name: newName });

  return updatedColumn;
};

const updatePositionService = async (data: BodyForReposition): Promise<Column[]> => {
  const { columnId, boardId, newPosition } = data;
  const columns: Column[] = await columnRepository().find({
    where: { board: { id: boardId } },
    order: { position: 'ASC' }
  });

  let indexOldEl: number | null = null;

  const editableEl = columns.find((el: Column, idx) => {
    if (el.id === columnId) {
      indexOldEl = idx;
      return el;
    }
    return undefined;
  });

  if (!editableEl || !indexOldEl) {
    throw new BadRequest();
  }

  const repositionedColumns: Column[] = repositionColumn(
    columns,
    editableEl,
    newPosition,
    indexOldEl
  );

  const updatedColumns: Column[] = await columnRepository().save(repositionedColumns);

  return updatedColumns;
};

const deleteService = async (reqBody: BodyForDeleting): Promise<void> => {
  const { columnId, boardId } = reqBody;
  await columnRepository().delete(columnId);

  const columns: Column[] = await columnRepository().find({
    where: { board: { id: boardId } },
    order: { position: 'ASC' }
  });

  const repositionedColumns: Column[] = columns.map((el, idx) => ({
    ...el,
    position: idx
  }));

  await columnRepository().save(repositionedColumns);
};

export {
  getColumnsService,
  createColumnService,
  updateNameService,
  updatePositionService,
  deleteService
};
