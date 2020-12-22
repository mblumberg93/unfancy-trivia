import { useRouter } from 'next/router'
import Layout from '../components/layout'
import { Button } from 'shards-react'
import { parseCookies } from 'nookies'

export default function Gameplay({ cookies }) {
    const router = useRouter()

    const goBack = () => {
        if (!cookies.gameId) {
            router.push('/')
        } else if (cookies.isHost === true || cookies.isHost === 'true') {
            router.push('/host')
        } else {
            router.push('/competitor')
        }
    }

    return (
        <Layout inGame={cookies.gameId}>
            <h5>How to play the game as a Competitor</h5>
            <p>First, you will need a valid "Game ID" provided by your Host.</p>
            <p>Once you receive that, fill out the "Game ID" text box with the ID and then fill out the "Team Name" text box with your desired team name (tip: try to make this unique to distinguish yourself from your other Competitors).</p>
            <p>When you click "Join!" you will be directed to the "Competitor Screen" where you should see a welcome banner displaying the name of the game and the current question number, as well as a small form for your answer.</p>
            <p>To play the game simply fill out the answer form when prompted by your Host and click "Submit.</p>
            <p>When your Host moves on to a new question, the current question in the banner will change and your answer form will be cleared.</p>
            <p>You may check the current standings at any time by clicking "Standings" at the top of your screen.</p>
            <h5>How to play the game as a Host</h5>
            <p>To begin, enter the name of your trivia game in the Host "Game Name" text box and click "Create".</p>
            <p>After that you will be directed to the "Host Screen" where you will see a banner displaying the name of the game and the Game ID, as well as the current question.</p>
            <p>Send the Game ID to the competitors and as they join the game their names will appear in a list under the current question.</p>
            <p>Ask your trivia question via your preferred video conferencing application and monitor the answers next to the teams as the Competitors respond.</p>
            <p>Once you are ready to score the question assign points in the text box next to each team's answer.</p>
            <p>When you are done scoring an answer click "Next Question" and repeat the process.</p>
            <p>As with the Competitors, you may check the current standings at any time by clicking "Standings" at the top of your screen.</p>
            <Button theme="light" onClick={goBack}>Back</Button>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const cookies = parseCookies(context)
    return { props: { cookies } }
}