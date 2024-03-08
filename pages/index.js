import Head from 'next/head'
import { useEffect, useState } from 'react'
import Input from '../components/Input'
import KanaList from '../components/KanaList'

const hiraganaArray = [
  'あ', 'い', 'う', 'え', 'お',
  'か', 'き', 'く', 'け', 'こ',
  'さ', 'し', 'す', 'せ', 'そ',
  'た', 'ち', 'つ', 'て', 'と',
  'な', 'に', 'ぬ', 'ね', 'の',
  'は', 'ひ', 'ふ', 'へ', 'ほ',
  'ま', 'み', 'む', 'め', 'も',
  'や', null, 'ゆ', null, 'よ',
  'ら', 'り', 'る', 'れ', 'ろ',
  'わ', 'ゐ', null, 'ゑ', 'を',
  'ん', null, null, null, null
]

const hiraganaDakuonArray = [
  'が', 'ぎ', 'ぐ', 'げ', 'ご',
  'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
  'だ', 'ぢ', 'づ', 'で', 'ど',
  'ば', 'び', 'ぶ', 'べ', 'ぼ',
  'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ'
]

const hiraganaComboArray = [
  'きゃ', 'きゅ', 'きょ',
  'ぎゃ', 'ぎゅ', 'ぎょ',
  'しゃ', 'しゅ', 'しょ',
  'じゃ', 'じゅ', 'じょ',
  'ちゃ', 'ちゅ', 'ちょ',
  'にゃ', 'にゅ', 'にょ',
  'ひゃ', 'ひゅ', 'ひょ',
  'びゃ', 'びゅ', 'びょ',
  'ぴゃ', 'ぴゅ', 'ぴょ',
  'みゃ', 'みゅ', 'みょ',
  'りゃ', 'りゅ', 'りょ'
]

/*
const hiraganaSmall = [
  'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ',
  'ゃ', 'ゅ', 'ょ'
]
*/

const katakanaArray = [
  'ア', 'イ', 'ウ', 'エ', 'オ',
  'カ', 'キ', 'ク', 'ケ', 'コ',
  'サ', 'シ', 'ス', 'セ', 'ソ',
  'タ', 'チ', 'ツ', 'テ', 'ト',
  'ナ', 'ニ', 'ヌ', 'ネ', 'ノ',
  'ハ', 'ヒ', 'フ', 'ヘ', 'ホ',
  'マ', 'ミ', 'ム', 'メ', 'モ',
  'ヤ', null, 'ユ', null, 'ヨ',
  'ラ', 'リ', 'ル', 'レ', 'ロ',
  'ワ', 'ヰ', null, 'ヱ', 'ヲ',
  'ン', null, null, null, null
]

const katakanaDakuonArray = [
  'ガ', 'ギ', 'グ', 'ゲ', 'ゴ',
  'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ',
  'ダ', 'ヂ', 'ヅ', 'デ', 'ド',
  'バ', 'ビ', 'ブ', 'ベ', 'ボ',
  'パ', 'ピ', 'プ', 'ペ', 'ポ',
]

const katakanaComboArray = [
  'キャ', 'キュ', 'キョ',
  'ギャ', 'ギュ', 'ギョ',
  'シャ', 'シュ', 'ショ',
  'ジャ', 'ジュ', 'ジョ',
  'チャ', 'チュ', 'チョ',
  'ニャ', 'ニュ', 'ニョ',
  'ヒャ', 'ヒュ', 'ヒョ',
  'ビャ', 'ビュ', 'ビョ',
  'ピャ', 'ピュ', 'ピョ',
  'ミャ', 'ミュ', 'ミョ',
  'リャ', 'リュ', 'リョ'
]

/*
const katakanaSmall = [
  //'ァ', 'ィ', 'ゥ', 'ェ', 'ォ',
  'ャ', 'ュ', 'ョ'
]
*/

const katakanaOther = [
  'ー'
]

export default function Home({ defaultKana }) {

  const [kana, setKana] = useState(defaultKana)
  const [learnList, setLearnList] = useState(hiraganaArray.filter((item) => item !== null))
  const [tab, setTab] = useState("hiragana")
  const [reset, setReset] = useState(false)

  //useEffect(() => {
  //  setLearnList(array)
  //  setReset(!reset)
  //}, [tab])

  useEffect(() => {
    if (learnList.length === 0)
      setKana(null)
    else
      setKana(learnList[Math.floor(Math.random() * learnList.length)])

    console.log(learnList)
  }, [learnList])

  const learnMode = (answer) => {
    if (answer) setLearnList(learnList.filter((item) => item !== kana))
    else if (answer === null) {
      setKana(learnList.filter((item) => item !== kana)[Math.floor(Math.random() * learnList.length)])
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>LearnKana</title>
        <link rel="icon" href="/logo.svg" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-10 text-center">
        <div>
          <h1 className="text-6xl font-bold mt-20">
            Learn<span className='text-red-700'>Kana</span>
          </h1>
        </div>

        <Input kana={kana} callback={learnMode} reset={reset} />

        <aside className='fixed top-0 left-0 z-40 h-screen overflow-y-auto border-r-2 bg-slate-50 sm:translate-x-0'>
          <div className='flex'>
            <ul className="flex-grow flex justify-between text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li onClick={() => setTab("hiragana")} className={"flex-grow cursor-pointer p-4 border-b-2 " + (tab === "hiragana" ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")}>
                <span className={"w-5 h-5 mr-2 " + (tab === "hiragana" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300")}>ん</span>Hiragana
              </li>
              <li onClick={() => setTab("katakana")} className={"flex-grow cursor-pointer p-4 border-b-2 " + (tab === "katakana" ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300")}>
                <span className={"w-5 h-5 mr-2 " + (tab === "katakana" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300")}>ン</span>Katakana
              </li>
            </ul>
          </div>
          <div className="justify-center">
            <KanaList title={tab === "hiragana" ? "Hiragana" : "Katakana"} array={tab === "hiragana" ? hiraganaArray : katakanaArray} learnList={learnList} setLearnList={setLearnList} columns={5} defaultActive />
            <KanaList title="Dakuon" array={tab === "hiragana" ? hiraganaDakuonArray : katakanaDakuonArray} learnList={learnList} setLearnList={setLearnList} columns={5} />
            <KanaList title="Combo" array={tab === "hiragana" ? hiraganaComboArray : katakanaComboArray} learnList={learnList} setLearnList={setLearnList} columns={3} />
          </div>
        </aside>
      </main>
    </div>
  )
}

export async function getStaticProps() {

  return {
    props: {
      defaultKana: hiraganaArray.filter((item) => item !== null)[Math.floor(Math.random() * hiraganaArray.filter((item) => item !== null).length)]
    }
  }
}