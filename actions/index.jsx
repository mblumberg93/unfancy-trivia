export function updateState(payload) {
    return { type: 'UPDATE_STATE', payload }
}

export function addTeam(payload) {
    return { type: 'ADD_TEAM', payload }
}

export function addAnswer(payload) {
    return { type: 'ADD_ANSWER', payload }
}

export function updateScore(payload) {
    return { type: 'UPDATE_SCORE', payload }
}

export function resetAnswers(payload) {
    return { type: 'RESET_ANSWERS', payload }
}