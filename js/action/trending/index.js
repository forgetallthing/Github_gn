import Types from '../types';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import { handleData } from '../ActionUtil'

export function onRefreshTrending(storeName, url, pageSize) {
    return dispatch => {
        dispatch({ type: Types.TRENDING_REFRESH, storeName: storeName })
        let dataStore = new DataStore();
        //异步action与数据流
        dataStore.fetchData(url,FLAG_STORAGE.flag_trending)
            .then(data => {
                handleData(Types.TRENDING_REFRESH_SUCCESS,dispatch, storeName, data, pageSize)
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
export function onLoadMoreTrending(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                //已加载完全部数据
                if (typeof callback === 'function') {
                    callback('no more')
                }
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                //max:本次加载后显示的数据总条数
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                })
            }
        }, 100);
    }
}

