import { useEffect, useState } from 'react'
import { toRomaji } from 'wanakana'

export default function KanaCard({ kana, forceActive, callback }) {
    const [active, setActive] = useState(forceActive)

    useEffect(() => {
        setActive(forceActive)
    }, [forceActive])

    const activate = () => {
        callback(kana, !active)
        setActive(!active)
    }

    if(kana === null) {
        return (
            <div className="w-16 h-16 rounded-lg bg-slate-300 dark:bg-zinc-900"></div>
        )
    }

    return (
        <div className={`w-16 h-16 rounded-lg border-2 text-lg cursor-pointer text-center ${active ? "bg-white border dark:bg-slate-800 dark:border-slate-800" : "bg-slate-300 border-slate-300 dark:bg-black dark:border-gray-800"}`} onClick={activate}>
            {
                kana &&
                <div className="px-4 py-1 dark:text-white">
                    {kana}<br />
                    <span className="text-slate-400 dark:text-slate-300">{toRomaji(kana)}</span>
                </div>
            }
        </div>
    )
}