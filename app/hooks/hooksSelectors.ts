import {useDispatch, useSelector} from 'react-redux'
import type {AppDispatch, RootState} from '@/app/store'
import {createSelector} from "reselect";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const identity = <T>(input: T) => input;
export const createSelectorIdentity = <T>(inputSelector: (state: RootState) => T) => createSelector([inputSelector],identity)
