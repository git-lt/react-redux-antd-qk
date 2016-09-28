import { Record, Map } from 'immutable'

const InitState = Record({
  list: [],
  count: 0,
  loading: false,
  status: '',
  current: new Map(),
  errmsg: ''
})

let state = new InitState;

state = state.set('list', [{a:1},{b:2}]);
state = state.set('loading', false);
state = state.set('count', 100);
state = state.set('errmsg', '');
state = state.set('status',20);

debugger;
console.log(state.get('count'));
