import { use, useEffect, useState } from 'react'
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
            <div className="w-16 h-16 rounded-lg bg-slate-300"></div>
        )
    }

    return (
        <div className={"w-16 h-16 rounded-lg border-2 text-lg bg-white cursor-pointer " + (active ? "border-slate-600" : "bg-slate-100 border-slate-200")} onClick={activate}>
            {
                kana &&
                <div className="px-4 py-1">
                    {kana}<br />
                    <span className="text-slate-500">{toRomaji(kana)}</span>
                </div>
            }
        </div>
    )
}