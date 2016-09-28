import types from '../../types'
import initState from './initState'

function getStateByPath(currPath, menus){
  let navpath = [], path = currPath, key='', curr={};
  const items = menus;
  if(items.length && path){
    items.forEach(v=>{
      if(v.path === path){
        key = v.key; curr = v;
        return false;
      }else{
        if(v.child && v.child.length){
          v.child.forEach(k => {
            if(k.path === path){
              key = k.key; curr = v;
              return false;
            }
          })
        }
      }
    });
  }

  return  { open:key, current:curr, items: menus };
}

export default function menu(state = initState, action = {}){
  let newState = {};
  switch (action.type) {
    case `${types.GET_ALL_MENU}_SUCCESS`:
      newState = getStateByPath(action.params.path, action.payload);
      return state.merge(newState);
    case types.UPDATE_NAVPATH:
      newState = getStateByPath(action.payload.path, state.items);
      return state.merge(newState)
    default:
      return state;
  }
}
