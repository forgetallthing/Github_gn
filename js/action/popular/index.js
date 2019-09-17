import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

export function onRefreshPopular(storeName, url, pageSize) {
    return dispatch => {
        dispatch({ type: Types.POPULAR_REFRESH, storeName: storeName })
        let dataStore = new DataStore();
        //异步action与数据流
        dataStore.fetchData(url)
            .then(data => {
                handleData(dispatch, storeName, data, pageSize)
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
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray = [], callback) {
    return dispatch => {
        setTimeout(() => {
            if ((pageIndex - 1) * pageSize >= dataArray.length) {
                //已加载完全部数据
                if (typeof callback === 'function') {
                    callback('no more')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                //max:本次加载后显示的数据总条数
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length : pageSize * pageIndex;
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                })
            }
        }, 100);
    }
}

function handleData(dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data && data.data.items) {
        fixItems = data.data.items;
    }
    dispatch({
        type: Types.POPULAR_REFRESH_SUCCESS,
        items: fixItems,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),
        storeName,
        pageIndex: 1
    })
}