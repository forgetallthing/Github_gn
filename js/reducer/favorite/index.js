import Types from '../../action/types'

const defaultState = {
}

/**
 * favorite:{
 *   popular:{
 *       projectModels:[],
 *       isLoading:false
 *   }
 *   trending:{
 *       projectModels:[],
 *       isLoading:false
 *   }
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.FAVORITE_LOAD_DATA:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                },
            }
        case Types.FAVORITE_LOAD_SUCCESS://获取数据成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    isLoading: false,
                },
            }
        case Types.FAVORITE_LOAD_FAIL://获取数据失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                },
            }
        default:
            return state;
    }
}