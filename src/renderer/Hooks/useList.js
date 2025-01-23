import React, { useCallback, useEffect, useReducer } from 'react';

const { api } = window;

const reducer = (state, {type, payload}) => {

  switch (type) {
    case 'set':
      return {
        items: payload.data,
        error: payload.error,
        loading: false
      }
      break;
    case 'update':
      return {
        items: payload.items,
        loading: false
      }
      break;
    case 'error':
      return {
        loading: false,
        error: payload
      }
      break;
    default:
      throw new Error("Action not supported");
      break;
  }
}

export const useList = (listName, update = false) => {

  const [state, dispatch] = useReducer(reducer, {loading: true, items: null, error: null})

  const handleListChange = useCallback((changedList, items) => {
    
    if(listName === changedList) {
      dispatch({type: 'update', payload: {items}});
    }

  }, [state, listName])

  useEffect(() => {

    const load = async () => {

      try {
        const res = await api.getList(listName)
        dispatch({type: 'set', payload: res})
      } catch(e) {
        dispatch({type: 'error', payload: e.error || "Cannot read list items"})
      }
    }

    load()

  }, [listName])

  useEffect(() => {

    if(update){
      api.onListChange(handleListChange)
    }

    return () => {
      if(update) {
        api.removeListChange(handleListChange)
      }
    }

  }, [update, listName])

  return state;

}