import Head from 'next/head'
import { Container, Navbar, NavbarBrand } from "shards-react";
import styles from './layout.module.scss'

export default function Layout({ children }) {
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
        </Navbar>
        <main className={styles.pageContent}>{children}</main>
      </Container>
    </>
  )
}