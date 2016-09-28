import api from '../../../api'
import types from '../../types'

export function getNewsByTag(index, length, tag) {
  return {
    type: types.GET_NEWS_BY_TAG,
    payload: {
      promise: api.news({index, length, tag})
    }
  }
}

export function delNewsById(id) {
  return {
    type: types.DEL_NEWS,
    payload: {
      promise: api.delNews({id})
    }
  }
}

export function updateNewsStatus(id, status){
  return {
    type: types.UPDATE_NEWS_STATUS,
    payload:{
      promise: api.updateNewsStatus({id, status})
    }
  }
}

export function createNews(news){
  return {
    type: types.CREATE_NEWS,
    payload:{
      promise: api.updateNewsStatus({...news})
    }
  }
}

export function updateNews(id, news){
  return {
    type: types.UPDATE_NEWS,
    payload:{
      promise: api.updateNewsStatus({id, ...status})
    }
  }
}
