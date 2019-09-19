import Types from '../../action/types'

const defaultState = {
}

/**
 * trending:{
 *   java:{
 *       projectModels:[],
 *       isLoading:false
 *   }
 *   IOS:{
 *       projectModels:[],
 *       isLoading:false
 *   }...
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.TRENDING_REFRESH_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items,//原始数据
                    projectModels: action.projectModels,//本次要展示的数据
                    hideLoadingMore: false,
                    isLoading: false,
                    pageIndex: action.pageIndex,
                },
            }
        case Types.TRENDING_REFRESH://下拉刷新
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                },
            }
        case Types.TRENDING_REFRESH_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                },
            }
        case Types.TRENDING_LOAD_MORE_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                },
            }
        case Types.TRENDING_LOAD_MORE_FAIL://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                },
            }
        case Types.TRENDING_FLUSH_FAVORITE://下拉刷新失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                },
            }
        default:
            return state;
    }
}