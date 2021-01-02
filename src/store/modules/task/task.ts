import { createAction, ActionType, createReducer } from 'typesafe-actions';

const ADD_TASK = 'task/ADD_TASK' as const;
const DELETE_TASK = 'task/DELETE_TASK' as const;
const MODIFY_TASK = 'task/MOIFY_TASK' as const;

type taskingState = 'none' | 'proceeding' | 'done'

type taskId = number;

type taskInfo = {
  id: taskId;
  content: string;
  date: Date;
  author: string;
  state: taskingState;
}

// action 

/**
 * task를 추가
 * @param taskInfo
 */
export const addtask = createAction(ADD_TASK)<taskInfo>();
/**
 * task를 삭제
 * @param taskId
 */ 
export const deletetask = createAction(DELETE_TASK)<taskId>();
/**
 * task정보를 수정
 * @param taskInfo
 */
export const modifytask = createAction(MODIFY_TASK)<taskInfo>();

const actions = { addtask, deletetask, modifytask };
type taskAction = ActionType<typeof actions>;

//state

type taskInfoState = {
  taskList: taskInfo[];
}

const initialState: taskInfoState = {
  taskList: []
};

//reducer

const task = createReducer<taskInfoState, taskAction>(initialState, {
  [ADD_TASK]: (state, action) => ({ taskList: [...state.taskList, action.payload] }),
  [DELETE_TASK]: (state, action) => ({taskList: state.taskList.filter(task => task.id !== action.payload)}),
  [MODIFY_TASK]: (state, action) => {
    const newTaskList = state.taskList.map(task => {
      if(task.id === action.payload.id) {
        task = action.payload
      }
      return task;
    })
    return ({taskList: newTaskList})
  }
});

export default task