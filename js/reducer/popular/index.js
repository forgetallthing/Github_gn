import Types from '../../action/types'

const defaultState = {
}

/**
 * popular:{
 *   java:{
 *       items:[],
 *       isLoading:false
 *   }
 *   IOS:{
 *       items:[],
 *       isLoading:false
 *   }
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.POPULAR_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,//原始数据
                    projectModes: action.projectModes,//本次要展示的数据
                    hideLoadingMore: false,
                    isLoading: false,
                    pageIndex: action.pageIndex,
                },
            }
        case Types.POPULAR_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            }
        case Types.POPULAR_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                },
            }
        case Types.POPULAR_LOAD_MORE_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            }
        case Types.POPULAR_LOAD_MORE_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModes: action.projectModes,
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            }
        default:
            return state;
    }
}