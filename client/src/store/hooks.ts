/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppSelector };
