import Layout from '../components/layout'
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../services/firebase'
import { ListGroup, ListGroupItem } from "shards-react";
import { useRouter } from 'next/router'
import { updateState } from '../actions'
import styles from '../styles/Host.module.scss'
import TeamScore from '../components/teamScore'

export default function Host() {
    const [answers, setAnswers] = useState([])
    const firebaseDB = firebase.database()
    const appState = useSelector(state => state)
    const router = useRouter()
    const dispatch = useDispatch()
    const updateGameState = updates => dispatch(updateState(updates))

    useEffect(() => {
        if (!appState.gameId) {
            router.push('/')
            return
        }
        firebaseDB.ref('games/' + appState.gameId + '/teams').on("child_added", (snapshot, _) => {
            addTeam(snapshot.val())
        })
    })

    // TODO: Call when going to next question
    const buildDefaultAnswers = () => {
        let answers = appState.teams.map((team) => { return defaultAnswer(team) })
        let gameState = {
            currentAnswers: answers
        }
        updateGameState(gameState)
    }

    const defaultAnswer = (team) => {
        return { team: team, answer: null, score: '' }
    }

    const addTeam = (team) => {
        let teams = appState.teams
        if (teams.includes(team)) {
            return
        }
        teams.push(team)
        let currentAnswers = appState.currentAnswers
        let answer = defaultAnswer(team)
        currentAnswers.push(answer)
        let gameState = {
            teams: teams,
            currentAnswers: currentAnswers
        }
        updateGameState(gameState)
    }

    const updateScore = (team, score) => {
        if (!isNumeric(score)) {
            score = ''
        }
        let currentAnswers = appState.currentAnswers
        let index = currentAnswers.findIndex(answer => answer.team == team)
        currentAnswers[index].score = score
        let gameState = { currentAnswers: currentAnswers }
        updateGameState(gameState)
    }

    function isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) && !isNaN(parseFloat(str))
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
                           score={answer.score} onScoreUpdate={updateScore}></TeamScore>
            )}
        </Layout>
    )
}