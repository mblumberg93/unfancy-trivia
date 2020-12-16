import Head from 'next/head'
import Link from 'next/link'
import { Container, Navbar, NavbarBrand, Collapse, Nav, NavItem } from "shards-react";
import styles from './layout.module.scss'
import { useSelector } from 'react-redux'

export default function Layout({ children }) {
  const appState = useSelector(state => state)

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
          { appState.gameId &&
              <Nav navbar>
                <NavItem>
                  <Link href="/standings">
                    <a className="nav-link">Standings</a>
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