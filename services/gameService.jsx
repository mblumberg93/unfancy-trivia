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

export const getStandings = (gameCode, callback) => {
    firebaseDB.ref('games/' + gameCode).once('value', (snapshot) => {
        let gameState = snapshot.val()
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
        standings = standings.sort((a, b) =>  parseFloat(b.score) - parseFloat(a.score))
        callback(standings)
    })
}