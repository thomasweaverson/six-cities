import store from '../store';
import { setError, clearError } from '../store/app-process/app-process';
export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearError());
};
