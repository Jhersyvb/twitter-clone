import Head from 'next/head'
import Feed from '../components/Feed'
import Sidebar from '../components/Sidebar'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Login from '../components/Login'
import Modal from '../components/Modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Widgets from '../components/Widgets'

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  if (!session) return <Login providers={providers} />

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  let trendingResults = []
  let followResults = []
 
  try {
    const trendingResponse = await fetch('https://api.npoint.io/a4f07cae8bdb42a28f8a')
    trendingResults = await trendingResponse.json()
  } catch (error) {
    console.error(`Could not get Trending news: ${error}`)
  }

  try {
    const followResponse = await fetch('https://api.npoint.io/c7675164c604a84140d7')
    followResults = await followResponse.json()
  } catch (error) {
    console.error(`Could not get Following: ${error}`)
  }

  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  }
}
