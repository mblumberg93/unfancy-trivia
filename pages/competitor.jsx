import Layout from '../components/layout'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import firebase from '../services/firebase'
import { useRouter } from 'next/router'
import { updateState } from '../actions'
import { Button, Container, FormInput, Form, FormGroup } from 'shards-react'
import { addAnswer, cookiesToGameState } from '../services/gameService'
import { parseCookies } from 'nookies'

export default function Competitor({ cookies }) {
    const [answer, setAnswer] = useState('')
    const firebaseDB = firebase.database()
    const appState = useSelector(state => state)
    const router = useRouter()
    const dispatch = useDispatch()
    const updateGameState = updates => dispatch(updateState(updates))

    useEffect(() => {
        if (!appState.gameId && !cookies.gameId) {
            router.push('/')
            return
        }
        let gameId = appState.gameId ? appState.gameId : cookies.gameId
        const gameRef = firebaseDB.ref('games/' + gameId)
        const gameListener = gameRef.on('value', (snapshot) => {
            let currentQuestion = snapshot.val().currentQuestion
            if (currentQuestion == appState.currentQuestion) {
                return
            }
            let gameState = {
                currentQuestion: currentQuestion
            }
            updateGameState(gameState)
            setAnswer('')
        })
        if (!appState.gameId) {
            cookiesToGameState(cookies, updateGameState)
        }
        return () => {
            gameRef.off('value', gameListener)
        }
    })

    const handleSubmit = () => {
        let newAnswer = {
            question: appState.currentQuestion,
            team: appState.teamName,
            answer: answer,
            score: ''
        }
        addAnswer(appState.gameId, newAnswer) 
    }

    return (
        <Layout inGame={true}>
            <div className="game-info">
                <h5>Welcome {appState.teamName}!</h5>
                <h5>You are playing {appState.gameName}</h5>
                <h4 className="question-header">Question #{appState.currentQuestion}</h4>
            </div>
            <Container>
                <Form>
                    <FormGroup>
                        <FormInput placeholder="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                    </FormGroup>
                    <Button onClick={handleSubmit}>Submit</Button>
                </Form>
            </Container>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const cookies = parseCookies(context)
    return { props: { cookies } }
  }