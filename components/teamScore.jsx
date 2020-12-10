import { Container, Row, Col, FormInput } from "shards-react";
import styles from './teamScore.module.scss'

export default function TeamScore(props) {
  const handleScoreUpdate = (score) => {
    if (!props.onScoreUpdate) {
      return
    }
    props.onScoreUpdate(props.team, score)
  }

  return (
    <Container className={styles.teamScoreForm}>
      <Row className={styles.teamScoreRow}>
        <Col className={styles.scoreCol} sm="12" lg="3">
          {props.team}
        </Col>
        <Col className={styles.scoreCol} sm="12" lg="6">
          Answer: { props.answer ? props.answer : 'TBD' }
        </Col>
        <Col className={styles.scoreInput} sm="12" lg="3">
          <FormInput placeholder="Score" value={props.score} onChange={(e) => handleScoreUpdate(e.target.value)} />
        </Col>
      </Row>
    </Container>
  )
}