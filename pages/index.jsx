import { useState } from "react"
import { useDispatch } from 'react-redux'
import { updateState } from '../actions'
import { Card, CardTitle, CardBody, Form, FormInput, FormGroup, Button } from 'shards-react'
import styles from '../styles/Home.module.scss'
import Layout from '../components/layout'
import { createGame, joinGame } from '../services/gameService'
import { useRouter } from 'next/router'
import { setGameCookies } from '../services/cookiesService'

export default function Home() {
  const [gameId, setGameId] = useState('')
  const [teamName, setTeamName] = useState('')
  const [gameName, setGameName] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()
  const updateGameState = updates => dispatch(updateState(updates))

  const handleJoin = () => {
    let appState = {
      isHost: false,
      gameId: gameId,
      teamName: teamName
    }
    updateGameState(appState)
    setGameCookies([['isHost', false],['gameId', gameId],['teamName', teamName]])
    joinGame(gameId, teamName, navigateToCompetitor)
  }

  const navigateToCompetitor = (gameState) => {
    let appState = {
      currentQuestion: gameState.currentQuestion,
      gameName: gameState.gameName
    }
    updateGameState(appState)
    router.push('/competitor')
  }

  const handleCreate = () => {
    let gameCode = generateGameCode();
    let appState = {
      isHost: true,
      gameName: gameName,
      gameId: gameCode,
      currentQuestion: 1
    }
    updateGameState(appState)
    setGameCookies([['isHost', true],['gameId', gameCode]])
    createGame(gameCode, gameName, navigateToHost)
  }

  const navigateToHost = () => {
    router.push('/host')
  }

  const generateGameCode = () => {
    return Math.random().toString(36).substr(2, 5)
  }

  return (
    <Layout inGame={false}>
      <div className={styles.welcomeHeader}>
        <h4>Welcome to the simple, no frills, no BS trivia game!</h4>
        <h5>To get started either join an existing game as a competitor or create an existing game as a host.</h5>
      </div>
      <Card className={styles.startForm}>
        <CardBody>
          <CardTitle>Competitor</CardTitle>
          <Form>
            <FormGroup>
              <label htmlFor="gameId">Game ID</label>
              <FormInput id="gameId" onChange={(e) => setGameId(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <label htmlFor="teamName">Team Name</label>
              <FormInput id="teamName" onChange={(e) => setTeamName(e.target.value)} />
            </FormGroup>
            <Button theme="info" onClick={handleJoin}>Join!</Button>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Host</CardTitle>
          <Form>
            <FormGroup>
              <label htmlFor="gameName">Game Name</label>
              <FormInput id="gameName" onChange={(e) => setGameName(e.target.value)} />
            </FormGroup>
            <Button theme="success" onClick={handleCreate}>Create!</Button>
          </Form>
        </CardBody>
      </Card>
    </Layout>
  )
}