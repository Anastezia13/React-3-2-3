import type { Launch } from '../api';

interface State {
  launches: Launch[];
  loading: boolean;
  error: boolean;
}

type Action =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Launch[] }
  | { type: 'FETCH_ERROR' };

export const initialState: State = {
  launches: [],
  loading: false,
  error: false,
};

export function launchReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: false };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, launches: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
}