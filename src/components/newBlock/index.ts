import { EditingUserInfo } from '../../store/modules/bklog/utils';
import BlockEditor from './BlockEditor';

export interface ReturnConnectStoreHook {
  updated: boolean;
  editionUserList?: EditingUserInfo[];
};

export default BlockEditor;