import { AuthorizationStatus, NameSpace } from '../../const';

import type { State } from '../../types/state';
import type { UserInfo } from '../../types/user-data';

export const getAuthorizationStatus = ({[NameSpace.UserProcess]: USER_PROCESS}: State): AuthorizationStatus => USER_PROCESS.authorizationStatus;
export const getUserInfo = ({[NameSpace.UserProcess]: USER_PROCESS}: State): UserInfo | null => USER_PROCESS.userInfo;
