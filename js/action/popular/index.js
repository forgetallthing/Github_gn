import Types from '../types';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import { handleData, _projectModels } from '../ActionUtil'

export function onRefreshPopular(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({ type: Types.POPULAR_REFRESH, storeName: storeName })
        let dataStore = new DataStore();
        //异步action与数据流
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular)
            .then(data => {
                handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao)
            })
            .catch(e => {
                console.log(e)
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    storeName,
                    e
                })
            })
    }
}

//下拉加载更多
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                //已加载完全部数据
                if (typeof callback === 'function') {
                    callback('no more')
                }
                _projectModels(dataArray, favoriteDao, projectModels => {
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_FAIL,
                        error: 'no more',
                        storeName,
                        pageIndex: --pageIndex,
                        projectModels: projectModels
                    })
                })

            } else {
                //max:本次加载后显示的数据总条数
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                _projectModels(dataArray.slice(0, max), favoriteDao, projectModels => {
                    dispatch({
                        type: Types.POPULAR_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels: projectModels,
                    })
                })
            }
        }, 100);
    }
}

/**
 * 刷新收藏状态
 * @param storeName
 * @param pageIndex 第几页
 * @param pageSize 每页展示条数
 * @param dataArray 原始数据
 * @param favoriteDao
 * @returns {function(*)}
 */
export function onFlushPopularFavorite(storeName, pageIndex, pageSize, dataArray = [], favoriteDao) {
    return dispatch => {
        //本次和载入的最大数量
        let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
        _projectModels(dataArray.slice(0, max), favoriteDao, data => {
            dispatch({
                type: Types.FLUSH_POPULAR_FAVORITE,
                storeName,
                pageIndex,
                projectModels: data,
            })
        })
    }
}
