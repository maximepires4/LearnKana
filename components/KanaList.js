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

    useEffect(() => {
        setCheckbox(allActive)
    }, [allActive])

    useEffect(() => {
        console.log(checkbox)
    }, [checkbox])

    useEffect(() => {
        if (array.every(item => learnList.includes(item))) {
            setCheckbox(true)
        } else {
            setCheckbox(false)
            console.log("devrait s'éteindre")
        }
    }, [learnList])

    return (
        <div className="flex flex-col mx-6 pb-4 border-b-4">
            <div className="flex items-center justify-between my-6">
                <h1 className="text-2xl font-bold text-left">
                    {title}
                </h1>
                <input defaultChecked={checkbox} onClick={() => setAllActive(!allActive)} type="checkbox" className="my-auto w-8 h-8 cursor-pointer text-slate-500 bg-white border-2 border-slate-500 focus:outline-none focus:ring-transparent "/>
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
                                <KanaCard kana={kana} forceActive={allActive} callback={changeLearnList}/>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    )
}