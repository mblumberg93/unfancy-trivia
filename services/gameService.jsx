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