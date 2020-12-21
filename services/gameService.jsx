import firebase from '../services/firebase'

export const firebaseDB = firebase.database()

export const createGame = (gameCode, gameName, callback) => {
    firebaseDB.ref('games/' + gameCode).set({
        gameName: gameName,
        currentQuestion: 1,
        teams: [],
        answers: []
    }, () => {
        callback()
    })
}

export const joinGame = (gameCode, teamName, callback) => {
    firebaseDB.ref('games/' + gameCode + '/teams').once('value', (snapshot) => {
        let teamNames = []
        if (snapshot.val()) {
            teamNames = Object.entries(snapshot.val()).map(pair => pair[1])
        }
        if (teamNames.includes(teamName)) {
            getCurrentGameState(gameCode, callback)
        } else {
            firebaseDB.ref('games/' + gameCode + '/teams').push(teamName).then(() => {
                getCurrentGameState(gameCode, callback)
            })
        }
    })
}

export const getCurrentGameState = (gameCode, callback) => {
    firebaseDB.ref('games/' + gameCode).once('value', (snapshot) => {
        callback(snapshot.val())
    })
}

//potentially use after refactoring
export const currentGameStateToRedux = (gameCode, cookies, callback) => {
    getCurrentGameState(gameCode, (gameState) => {
        let reduxState = {
            isHost: cookies.isHost === true || cookies.isHost === 'true',
            gameName: gameState.gameName,
            gameId: gameCode,
            teamName: cookies.teamName,
            currentQuestion: gameState.currentQuestion,
            teams: gameState.teams
        }
        callback(reduxState)
    })
}

export const addAnswer = (gameCode, answer, callback) => {
    firebaseDB.ref('games/' + gameCode + '/answers').push({ 
        question: answer.question, 
        team: answer.team, 
        answer: answer.answer,
        score: answer.score
    }, () => {
        if (callback) callback()
    })
}

export const updateAnswer = (gameCode, answer, callback) => {
    firebaseDB.ref('games/' + gameCode + '/answers/' + answer.id).update({ 
        question: answer.question, 
        team: answer.team, 
        answer: answer.answer,
        score: answer.score
    }, () => {
        if (callback) callback(answer)
    })
}

export const updateCurrentQuestion = (gameCode, currentQuestion, callback) => {
    firebaseDB.ref('games/' + gameCode).update({ 
        currentQuestion: currentQuestion
    }, () => {
        if (callback) callback()
    })
}

export const getStandings = async (gameCode) => {
    let snapshot = await firebaseDB.ref('games/' + gameCode).once('value')
    let gameState = snapshot.val()
    if (!gameState) {
        return []
    }
    let teams = gameState.teams
    let answers = gameState.answers
    let standings = []
    if (teams) {
        Object.values(teams).map((team) => {
            standings.push({ team: team, score: 0 })
        })
    }
    if (answers) {
        Object.values(answers).forEach((answer) => {
            let index = standings.findIndex(standing => standing.team == answer.team)
            standings[index].score += parseFloat(answer.score) 
        })
    }
    return standings.sort((a, b) =>  parseFloat(b.score) - parseFloat(a.score))
}