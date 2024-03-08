import { useState } from 'react'
import Input from '../components/Input'
import KanaList from '../components/KanaList'
import { toHiragana, toKatakana } from 'wanakana'
import Link from 'next/link'
import Image from 'next/image'

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

export default function Home() {

  const [learnList, setLearnList] = useState(hiraganaArray.filter((item) => item !== null))
  const [tab, setTab] = useState("hiragana")
  const [tabVisible, setTabVisible] = useState(true)
  const [darkMode, setDarkMode] = useState(true)

  const changeTab = (tab) => {
    setTab(tab)
    const translateFunc = tab === "hiragana" ? toHiragana : toKatakana

    setLearnList(learnList.filter((item) => item !== null).map((item) => translateFunc(item)))
  }

  return (
    <main className={`flex flex-col min-h-screen py-2 ${darkMode && 'dark bg-black'}`}>
      <div className="flex w-full flex-col items-center px-10 text-center dark:bg-black">
        <div>
          <h1 className="text-6xl font-bold mt-20 dark:text-white">
            Learn<span className='text-red-700'>Kana</span>
          </h1>
        </div>
        <Input learnList={learnList} />
      </div>

      <div className="fixed top-0 right-0 m-4">
        <button onClick={() => setDarkMode(!darkMode)} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 m-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        </button>
      </div>

      <aside className='fixed z-40 top-0 left-0 flex'>
        <div className={'h-screen overflow-y-auto border-r-2 dark:border-gray-800 bg-zinc-50 dark:bg-black transition-transform ' + (tabVisible ? 'translate-x-0' : '-translate-x-full')}>
          <div className='sticky z-50 top-0 items-center bg-zinc-50 dark:bg-black'>
            <ul className="flex-grow flex justify-between text-sm font-medium text-center text-gray-500 dark:text-gray-400">
              <li onClick={() => changeTab("hiragana")} className={"flex-grow cursor-pointer p-4 border-b-2 text-xl " + (tab === "hiragana" ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-gray-800")}>
                <span className={"w-5 h-5 mr-2 " + (tab === "hiragana" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300")}>ん</span>Hiragana
              </li>
              <li onClick={() => changeTab("katakana")} className={"flex-grow cursor-pointer p-4 border-b-2 text-xl " + (tab === "katakana" ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-gray-800")}>
                <span className={"w-5 h-5 mr-2 " + (tab === "katakana" ? "text-blue-600 dark:text-blue-500" : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300")}>ン</span>Katakana
              </li>
            </ul>
          </div>
          <div className="justify-center">
            <KanaList title={tab === "hiragana" ? "Hiragana" : "Katakana"} array={tab === "hiragana" ? hiraganaArray : katakanaArray} learnList={learnList} setLearnList={setLearnList} columns={5} defaultActive />
            <KanaList title="Dakuon" array={tab === "hiragana" ? hiraganaDakuonArray : katakanaDakuonArray} learnList={learnList} setLearnList={setLearnList} columns={5} />
            <KanaList title="Combo" array={tab === "hiragana" ? hiraganaComboArray : katakanaComboArray} learnList={learnList} setLearnList={setLearnList} columns={3} />
          </div>
        </div>
        <button onClick={() => setTabVisible(!tabVisible)} className={'w-10 h-10 rounded-full m-2 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 ' + (tabVisible ? '' : 'fixed left-0')}>
          {
            tabVisible ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
              :
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>

          }
        </button>
      </aside>

      <footer className="fixed bottom-0 flex justify-center items-center w-full h-24 border-t dark:text-white dark:border-gray-800">
        Created by Maxime Pires
        <Link className='ml-1 underline text-blue-500' href="https://github.com/maximepires4">Github</Link>
        <Link className='ml-1 underline text-blue-500' href="https://linkedin.com/maximepires">Linkedin</Link>
      </footer>
    </main>
  )
}