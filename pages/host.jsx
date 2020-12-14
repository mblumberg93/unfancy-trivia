import Layout from '../components/layout'
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../services/firebase'
import { useRouter } from 'next/router'
import { updateState, addTeam, addAnswer, updateScore, resetAnswers } from '../actions'
import TeamScore from '../components/teamScore'
import { Button } from 'shards-react'
import { updateAnswer, updateCurrentQuestion } from '../services/gameService'

export default function Host() {
    const firebaseDB = firebase.database()
    const appState = useSelector(state => state)
    const router = useRouter()
    const dispatch = useDispatch()
    const updateGameState = updates => dispatch(updateState(updates))
    const addGameTeam = team => dispatch(addTeam(team))
    const addGameAnswer = answer => dispatch(addAnswer(answer))
    const updateGameScore = answer => dispatch(updateScore(answer))
    const resetGameAnswers = question => dispatch(resetAnswers(question))

    useEffect(() => {
        if (!appState.gameId) {
            router.push('/')
            return
        }
        const teamsRef = firebaseDB.ref('games/' + appState.gameId + '/teams');
        const teamsListener = teamsRef.on('child_added', (snapshot, _) => {
            addGameTeam(snapshot.val())
        })
        const answersRef = firebaseDB.ref('games/' + appState.gameId + '/answers')
        const answersListener = answersRef.on('child_added', (snapshot, _) => {
            let answer = snapshot.val()
            answer.id = snapshot.key
            addGameAnswer(answer)
        })
        return () => {
            teamsRef.off('child_added', teamsListener)
            answersRef.off('child_added', answersListener)
        }
    })

    const handleScoreUpdate = (team, score) => {
        if (!isNumeric(score)) {
            score = ''
        }
        let answer = appState.currentAnswers.filter(ans => ans.team == team)[0]
        if (!answer) {
            return
        }
        if (answer.score == score) {
            return
        }
        answer.score = score
        updateAnswer(appState.gameId, answer, updateGameScore)
    }

    const isNumeric = (str) => {
        if (typeof str != "string") return false
        return !isNaN(str) && !isNaN(parseFloat(str))
    }

    const nextQuestion = () => {
        let currentQuestion = appState.currentQuestion
        currentQuestion += 1
        let gameState = { currentQuestion: currentQuestion }
        updateGameState(gameState)
        updateCurrentQuestion(appState.gameId, currentQuestion)
        resetGameAnswers(currentQuestion)
    }

    const getRandomKey = (team) => {
        return team + (Math.floor(Math.random() * 100000))
    }

    return (
        <Layout>
            <div className="game-info">
                <h5>You are hosting {appState.gameName}</h5>
                <h5>The Game ID is {appState.gameId}</h5>
            </div>
            <h4 className="question-header">Question #{appState.currentQuestion}</h4>
            { appState.currentAnswers.map((answer) =>
                <TeamScore key={getRandomKey(answer.team)} team={answer.team} answer={answer.answer}
                           score={answer.score} onScoreUpdate={handleScoreUpdate}></TeamScore>
            )}
            <Button onClick={nextQuestion}>Next Question</Button>
        </Layout>
    )
}