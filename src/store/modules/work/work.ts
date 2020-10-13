import { createAction, ActionType, createReducer } from 'typesafe-actions';

const ADD_WORK = 'work/ADD_WORK' as const;
const DELETE_WORK = 'work/DELETE_WORK' as const;
const MODIFY_WORK = 'work/MOIFY_WORK' as const;

type workingState = 'none' | 'proceeding' | 'done'

type workId = number;

type workInfo = {
  id: workId;
  content: string;
  date: Date;
  author: string;
  state: workingState;
}

// action 

/**
 * work를 추가
 * @param workInfo
 */
export const addWork = createAction(ADD_WORK)<workInfo>();
/**
 * work를 삭제
 * @param workId
 */ 
export const deleteWork = createAction(DELETE_WORK)<workId>();
/**
 * work정보를 수정
 * @param workInfo
 */
export const modifyWork = createAction(MODIFY_WORK)<workInfo>();

const actions = { addWork, deleteWork, modifyWork };
type WorkAction = ActionType<typeof actions>;

//state

type WorkInfoState = {
  workList: workInfo[];
}

const initialState: WorkInfoState = {
  workList: []
};

//reducer

const work = createReducer<WorkInfoState, WorkAction>(initialState, {
  [ADD_WORK]: (state, action) => ({ workList: [...state.workList, action.payload] }),
  [DELETE_WORK]: (state, action) => ({workList: state.workList.filter(work => work.id !== action.payload)}),
  [MODIFY_WORK]: (state, action) => {
    const newWorkList = state.workList.map(work => {
      if(work.id === action.payload.id) {
        work = action.payload
      }
      return work;
    })
    return ({workList: newWorkList})
  }
});

export default work