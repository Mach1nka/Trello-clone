import React, { useReducer, Context, createContext, Dispatch } from 'react';

import {
  ColumnActions,
  Column,
  ColumnData,
  replaceColumnName,
} from 'services/resources/model/column.model';

interface PutColumnsAction {
  type: ColumnActions.PUT_COLUMNS;
  payload: Column[];
}

interface PutCreatedColumnAction {
  type: ColumnActions.PUT_CREATED_COLUMN;
  payload: Column;
}

interface PutRenamedColumnAction {
  type: ColumnActions.PUT_RENAMED_COLUMN;
  payload: Column;
}

interface DeleteColumnsAction {
  type: ColumnActions.DELETE_COLUMNS_DATA;
}

type Action =
  | PutColumnsAction
  | PutCreatedColumnAction
  | PutRenamedColumnAction
  | DeleteColumnsAction;

interface ColumnContextValue {
  columns: Column[];
  dispatch: Dispatch<Action>;
}

const initialState: ColumnData = {
  columns: [],
};

function reducer(state: ColumnData, action: Action): ColumnData {
  switch (action.type) {
    case ColumnActions.PUT_COLUMNS:
      return {
        ...state,
        columns: action.payload,
      };
    case ColumnActions.PUT_CREATED_COLUMN:
      return {
        ...state,
        columns: [...state.columns, ...[action.payload]],
      };
    case ColumnActions.PUT_RENAMED_COLUMN:
      return {
        ...state,
        columns: replaceColumnName(state, action.payload),
      };
    case ColumnActions.DELETE_COLUMNS_DATA:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

export const ColumnContext: Context<ColumnContextValue> =
  createContext<ColumnContextValue>({ ...initialState, dispatch: () => {} });

const ColumnProvider: React.FC = ({ children }) => {
  const [columns, dispatch] = useReducer(reducer, initialState);

  return (
    <ColumnContext.Provider value={{ ...columns, dispatch }}>
      {children}
    </ColumnContext.Provider>
  );
};

export default ColumnProvider;
