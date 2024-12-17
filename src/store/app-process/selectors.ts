import { NameSpace } from '../../const';

import type { State } from '../../types/state';
import { City, Offer, SortType } from '../../types/types';

export const getCity = ({[NameSpace.AppProcess]: APP_PROCESS}: State): City => APP_PROCESS.city;

export const getActiveOffer = ({[NameSpace.AppProcess]: APP_PROCESS}: State): Offer | null => APP_PROCESS.activeOffer;

export const getActiveSortType = ({[NameSpace.AppProcess]: APP_PROCESS}: State): SortType => APP_PROCESS.activeSortType;
