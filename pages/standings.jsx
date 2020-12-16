import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { useEffect, useState } from 'react'
import { getStandings } from '../services/gameService'
import { useSelector } from 'react-redux'
import { Button, ButtonGroup } from 'shards-react'

export default function Standings() {
    const [standings, setStandings] = useState([])
    const appState = useSelector(state => state)
    const router = useRouter()

    useEffect(() => {
        if (!appState.gameId) {
            router.push('/')
            return
        }
        refreshStandings()
    })

    const refreshStandings = () => {
        getStandings(appState.gameId, setStandings)
    }

    const goBack = () => {
        if (appState.isHost) {
            router.push('/host')
        } else {
            router.push('/competitor')
        }
    }

    return (
        <Layout>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                { standings.map((standing) => 
                    <tr>
                        <td>{standing.team}</td>
                        <td>{standing.score}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <ButtonGroup>
                <Button theme="warning" onClick={refreshStandings}>Refresh</Button>
                <Button theme="light" onClick={goBack}>Back</Button>
            </ButtonGroup>
        </Layout>
    )
}