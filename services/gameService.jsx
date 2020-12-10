import firebase from '../services/firebase'

export const firebaseDB = firebase.database();

export const createGame = (gameCode, gameName, callback) => {
    firebaseDB.ref('games/' + gameCode).set({
        gameName: gameName,
        currentQuestion: 1,
        players: [],
        answers: []
    }, () => {
        callback()
    });
}

export const joinGame = (gameCode, userName, callback) => {
    firebaseDB.ref('games/' + gameCode + '/players').once('value', (snapshot) => {
        let userNames = []
        if (snapshot.val()) {
            userNames = Object.entries(snapshot.val()).map(pair => pair[1])
        }
        console.log(userNames)
        if (userNames.includes(userName)) {
            getCurrentGameState(gameCode, callback)
        } else {
            firebaseDB.ref('games/' + gameCode + '/players').push(userName).then(() => {
                getCurrentGameState(gameCode, callback)
            })
        }
    });
}

export const getCurrentGameState = (gameCode, callback) => {
    firebaseDB.ref('games/' + gameCode).once('value', (snapshot) => {
        callback(snapshot.val())
    })
}