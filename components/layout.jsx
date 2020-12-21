import Head from 'next/head'
import Link from 'next/link'
import { Container, Navbar, NavbarBrand, Nav, NavItem } from 'shards-react';
import styles from './layout.module.scss'
import { destroyGameCookies } from '../services/cookiesService'

export default function Layout({ children, inGame }) {

  const quit = () => {
    destroyGameCookies()
  }

  return (
    <>
      <Head>
        <title>Unfancy Trivia</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" 
              content="Unfancy Trivia" />
      </Head>
      <Container>
        <Navbar>
          <NavbarBrand className={styles.navBrand}>
            Unfancy Trivia
          </NavbarBrand>
          { inGame &&
            <Nav>
              <NavItem>
                <Link href="/standings">
                  <a className="nav-link">Standings</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/">
                  <a className="nav-link" onClick={quit}>Quit Game</a>
                </Link>
              </NavItem>
            </Nav>
          }
        </Navbar>
        <main className={styles.pageContent}>{children}</main>
      </Container>
    </>
  )
}