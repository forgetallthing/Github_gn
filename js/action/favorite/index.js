import Types from '../types';
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DataStore';
import { handleData, _projectModels } from '../ActionUtil'
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';

export function onLoadFavoriteData(flag, isShowLoading, pageSize, favoriteDao) {
    return dispatch => {
        dispatch({ type: Types.FAVORITE_LOAD_DATA, storeName: flag })
        let dataStore = new DataStore();
        new FavoriteDao(flag).getAllItems()
            .then(items => {
                let resultData = [];
                for (let index = 0; index < items.length; index++) {
                    resultData.push(new ProjectModel(items[index], true))
                }
                dispatch({
                    type: Types.FAVORITE_LOAD_SUCCESS,
                    projectModels: resultData,
                    storeName: flag
                })
            }).catch(e => {
                console.log(e)
                dispatch({
                    type: Types.FAVORITE_LOAD_FAIL,
                    error: e,
                    storeName: flag
                })
            })
    }
}

