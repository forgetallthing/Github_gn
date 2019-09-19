import Types from '../types';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import { handleData, _projectModels } from '../ActionUtil'

export function onRefreshTrending(storeName, url, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({ type: Types.TRENDING_REFRESH, storeName: storeName })
        let dataStore = new DataStore();
        //异步action与数据流
        dataStore.fetchData(url, FLAG_STORAGE.flag_trending)
            .then(data => {
                handleData(Types.TRENDING_REFRESH_SUCCESS, dispatch, storeName, data, pageSize, favoriteDao)
            })
            .catch(e => {
                console.log(e)
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    storeName,
                    e
                })
            })
    }
}

//下拉加载更多
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], favoriteDao, callback) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                //已加载完全部数据
                if (typeof callback === 'function') {
                    callback('no more')
                }
                _projectModels(dataArray, favoriteDao, projectModels => {
                    dispatch({
                        type: Types.TRENDING_LOAD_MORE_FAIL,
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
                        type: Types.TRENDING_LOAD_MORE_SUCCESS,
                        storeName,
                        pageIndex,
                        projectModels: projectModels,
                    })
                })
            }
        }, 100);
    }
}
