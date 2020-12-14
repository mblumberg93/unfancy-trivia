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

  if (action.type == 'ADD_TEAM') {
    let newTeam = action.payload
    if (state.teams.includes(newTeam)) {
      return state
    }
    let teams = state.teams
    teams.push(newTeam)
    let currentAnswers = state.currentAnswers
    let newAnswer = { id: null, question: state.currentQuestion, team: newTeam, answer: 'TBD', score: '' }
    currentAnswers.push(newAnswer)
    return Object.assign({}, state, { teams: teams, currentAnswers: currentAnswers })
  }

  if (action.type === 'ADD_ANSWER') {
    let answer = action.payload
    if (answer.question !== state.currentQuestion) {
      return state
    }
    let index = state.currentAnswers.findIndex(ans => ans.team == answer.team)
    if (index >= 0 && state.currentAnswers[index].answer == answer.answer) {
      return state
    }
    let newAnswers = state.currentAnswers
    if (index == -1) {
      answer.score = ''
      currentAnswers.push(answer)
    } else {
      newAnswers[index].id = answer.id
      newAnswers[index].answer = answer.answer
    }
    return Object.assign({}, state, { currentAnswers: newAnswers })
  }

  if (action.type == 'UPDATE_SCORE') {
    let answer = action.payload
    let newAnswers = state.currentAnswers
    let index = newAnswers.findIndex(ans => ans.team == answer.team)
    newAnswers[index].score = answer.score
    return Object.assign({}, state, { currentAnswers: newAnswers })
  }

  if (action.type === 'RESET_ANSWERS') {
    let question = action.payload
    let newAnswers = state.teams.map((team) => { 
      return { id: null, question: question, team: team, answer: 'TBD', score: '' }
    })
    return Object.assign({}, state, { currentAnswers: newAnswers })
  }

  return state
}

export default rootReducer;