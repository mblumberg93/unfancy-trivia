import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { getStandings } from '../services/gameService'
import { Button } from 'shards-react'
import { parseCookies } from 'nookies'

export default function Standings({ cookies, standings }) {
    const router = useRouter()

    const goBack = () => {
        if (cookies.isHost === true || cookies.isHost === 'true') {
            router.push('/host')
        } else {
            router.push('/competitor')
        }
    }

    return (
        <Layout>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                { standings.map((standing) => 
                    <tr key={standing.team}>
                        <td>{standing.team}</td>
                        <td>{standing.score}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <Button theme="light" onClick={goBack}>Back</Button>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let standings = []
    const cookies = parseCookies(context)
    if (cookies.gameId) {
        standings = await getStandings(cookies.gameId)
    }
    return { props: { cookies, standings } }
}