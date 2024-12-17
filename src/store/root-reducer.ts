import { combineReducers } from '@reduxjs/toolkit';

import { appData } from './app-data/app-data';
import { appProcess } from './app-process/app-process';
import { userProcess } from './user-process/user-process';

import { NameSpace } from '../const';

export const rootReducer = combineReducers({
  [NameSpace.AppData]: appData.reducer,
  [NameSpace.AppProcess]: appProcess.reducer,
  [NameSpace.UserProcess]: userProcess.reducer,
});
