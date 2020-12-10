import { useState } from "react"
import { useDispatch } from 'react-redux'
import { updateState } from '../actions'
import { Card, CardTitle, CardBody, Form, FormInput, FormGroup, Button } from "shards-react"
import styles from '../styles/Home.module.scss'
import Layout from '../components/layout'
import { createGame, joinGame } from '../services/gameService'

export default function Home() {
  const [gameId, setGameId] = useState('');
  const [userName, setUserName] = useState('');
  const [gameName, setGameName] = useState('');
  const dispatch = useDispatch();

  const updateGameState = updates => dispatch(updateState(updates))

  const handleJoin = () => {
    let appState = {
      isHost: false,
      gameId: gameId,
      userName: userName
    }
    updateGameState(appState)
    // TODO: Update state and go to first question
    joinGame(gameId, userName, (gameState) => { console.log(gameState) })
  }

  const handleCreate = () => {
    let gameCode = generateGameCode();
    let appState = {
      isHost: true,
      gameName: gameName,
      gameId: gameCode
    }
    updateGameState(appState)
    // TODO: Update state and go to first question
    createGame(gameCode, gameName, () => { console.log(gameCode) })
  }

  const generateGameCode = () => {
    return Math.random().toString(36).substr(2, 5)
  }

  return (
    <Layout>
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
              <label htmlFor="userName">User Name</label>
              <FormInput id="userName" onChange={(e) => setUserName(e.target.value)} />
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