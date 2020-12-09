import styles from '../styles/Home.module.scss'
import Layout from '../components/layout'
import { Card, CardTitle, CardBody, Form, FormInput, FormGroup, Button } from "shards-react";

export default function Home() {
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
              <label htmlFor="gameID">Game ID</label>
              <FormInput id="gameID" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="username">User Name</label>
              <FormInput id="username" />
            </FormGroup>
            <Button theme="info">Join!</Button>
          </Form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Host</CardTitle>
          <Form>
            <FormGroup>
              <label htmlFor="gameName">Game Name</label>
              <FormInput id="gameName" />
            </FormGroup>
            <Button theme="success">Create!</Button>
          </Form>
        </CardBody>
      </Card>
    </Layout>
  )
}
