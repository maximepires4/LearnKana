import { useEffect, useState } from 'react'
import { toRomaji } from 'wanakana'

export default function Input({ learnList }) {
    const [answer, setAnswer] = useState(null)
    const [gameList, setGameList] = useState(learnList)
    const [animate, setAnimate] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        const input = e.target.kanaInput.value

        if (!input && answer !== false)
            return
        else if (!input) {
            setAnswer(null)
            setGameList([...gameList.filter((item, index) => index !== 0), gameList[0]])
            return
        }

        const romaji = toRomaji(gameList[0])
        const result = input === romaji

        setAnswer(result)

        if (result) {
            setAnimate('animate-pulse')
            setGameList(gameList.filter((item, index) => index !== 0))
        } else {
            setAnimate('animate-wiggle')
        }

        e.target.kanaInput.value = ''
    }

    const resetGameList = () => {
        if(gameList.length === 0)
            setGameList(learnList.filter((item) => item !== null).sort(() => Math.random() - 0.5))
    }

    useEffect(() => {
        setGameList(learnList.filter((item) => item !== null).sort(() => Math.random() - 0.5))
        setAnswer(null)
    }, [learnList])

    useEffect(() => {
        if (gameList.length > 0)
            document.getElementById('kanaInput').focus()
        else
            document.getElementById('kanaInput').blur()
    }, [gameList])

    useEffect(() => {
        console.log("animate", animate)
    }, [animate])

    return (
        <div className='mt-6'>
            <div className="m-4">
                <div className={`flex justify-center items-center w-44 h-44 rounded-lg border-sky-60 bg-sky-600 text-white ${animate !== false && animate}`}
                onAnimationEnd={() => setAnimate(false)}>
                    {
                        gameList.length > 0 ?
                            <div className={gameList[0].length === 1 ? "text-9xl" : "text-7xl"}>
                                {gameList[0]}
                            </div>
                            :
                            <div className="text-9xl">
                                🎉
                            </div>
                    }
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <div className="mb-6">
                    <input 
                    type="text" 
                    id="kanaInput" 
                    className={"text-sm rounded-lg block w-full p-2.5 dark:text-white " + (answer === null ? "bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" : (answer ? "bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500" : "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500")) + (gameList.length === 0 ? " cursor-pointer" : "")} 
                    placeholder={gameList.length > 0 ? "Type Romaji" : "Click to replay"}
                    onClick={() => resetGameList()}/>
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