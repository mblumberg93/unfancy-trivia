export const initialState = { 
  isHost: null,
  gameName: null,
  gameId: null,
  teamName: null,
  currentQuestion: null,
  teams: [],
  currentAnswers: []
}

function rootReducer(state = initialState, action) {
  if (action.type === 'UPDATE_STATE') {
    return Object.assign({}, state, action.payload)
  }
  return state
}

export default rootReducer;