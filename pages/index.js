import Head from 'next/head'
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>PathoSearch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-10 text-center">
        <h1 className="text-6xl font-bold mt-20 text-blue-600">
          PathoSearch
        </h1>

        <SearchBar title="pathology" description="Get started by searching for your" dbName="pathologies" accentColor="blue"/>
        <SearchBar title="specialist" description="Or search for a" dbName="specialists" accentColor="green"/>
      </main>
    </div>
  )
}