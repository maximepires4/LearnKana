import { useEffect, useState } from 'react'
import { toRomaji } from 'wanakana'

export default function Input({ kana, callback, reset }) {
    const [answer, setAnswer] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()
        const input = e.target.kanaInput.value

        if (!input && answer !== false)
            return
        else if (!input) {
            setAnswer(null)
            return callback(null)
        }

        const romaji = toRomaji(kana)

        setAnswer(input === romaji)
        callback(input === romaji)

        e.target.kanaInput.value = ''
    }

    useEffect(() => {
        document.getElementById('kanaInput').focus()
    }, [kana])

    useEffect(() => {
        setAnswer(null)
    }, [reset])

    return (
        <div className='mt-6'>
            <div className="m-4">
                <div className="flex justify-center items-center w-44 h-44 border-2 rounded-lg border-sky-60 bg-sky-600 text-white">
                    {
                        kana ?
                            <div className={kana.length === 1 ? "text-9xl" : "text-7xl"}>
                                {kana}
                            </div>
                            :
                            <div className="text-6xl font-bold">WELL DONE</div>
                    }
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <div className="mb-6">
                    <input type="text" id="kanaInput" className={"text-sm rounded-lg block w-full p-2.5 dark:text-white " + (answer === null ? "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" : (answer ? "bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500" : "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"))} placeholder={kana ? "Type Romaji" : "Replay ?"} disabled={kana === null} />
                    <p className={"mt-2 text-sm " + (answer === true ? "text-green-600 dark:text-green-500" : (answer === false ? "text-red-600 dark:text-red-500" : "invisible"))}>
                        {
                            answer === true ?
                                <span className="font-medium">Well done!</span>
                                :
                                <span className="font-medium">Oooops...! Leave blank to skip</span>
                        }
                    </p>
                </div>
            </form>
        </div>
    )
}