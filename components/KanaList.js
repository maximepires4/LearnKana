import { use, useEffect, useState } from "react"
import KanaCard from "./KanaCard"

export default function KanaList({ title, array, learnList, setLearnList, columns, defaultActive }) {
    const [allActive, setAllActive] = useState(defaultActive ? true : false)
    const [checkbox, setCheckbox] = useState(defaultActive ? true : false)

    const changeLearnList = (kana, active) => {
        if (kana === null) return
        if (active) {
            setLearnList([...learnList, kana])
        } else {
            setLearnList(learnList.filter(item => item !== kana))
        }
    }

    const setAll = (active) => {
        setAllActive(active)

        if (active) {
            setLearnList(learnList.concat(array.filter(item => item !== null && !learnList.includes(item))))
        } else {
            setLearnList(learnList.filter(item => !array.includes(item)))
        }

    }

    useEffect(() => {
        setCheckbox(allActive)
    }, [allActive])

    useEffect(() => {
        if (array.every(item => item === null | learnList.includes(item))) {
            setCheckbox(true)
        } else {
            setCheckbox(false)
        }
    }, [learnList])

    return (
        <div className="flex flex-col mx-6 mb-4 pb-4 border-b-4 dark:border-gray-800">
            <div className="flex items-center justify-between my-6">
                <h1 className="text-2xl font-bold text-left dark:text-white">
                    {title}
                </h1>
                <input checked={checkbox} onChange={(event) => setAll(event.target.checked)} type="checkbox"
                    className="app my-auto w-6 h-6 cursor-pointer text-slate-500 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 focus:ring-transparent" />
            </div>
            {
                array.reduce((acc, item, index) => {
                    if (index % columns === 0) {
                        acc.push([item])
                    } else {
                        acc[acc.length - 1].push(item)
                    }
                    return acc
                }, []).map((grouped, index) => (
                    <div key={index} className='flex flex-wrap justify-center'>{
                        grouped.map((kana, index) => (
                            <div className="m-1" key={index}>
                                <KanaCard kana={kana} forceActive={allActive} callback={changeLearnList} />
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}