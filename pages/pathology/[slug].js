import Head from "next/head";
import { useState } from "react";
import parse from 'html-react-parser'
import supabase from "../../lib/supabase";
import Modal from "../../components/Modal";

const modal = [
    {
        title: "Ostéodensitométrie",
        content:
            "<b>Faire pratiquer :</b>" +
            "<ul className='list-disc'>" +
            "<li className='ml-5'>Ostéodensitométrie</li>" +
            "</ul>" +
            "Contexte de...<br />" +
            "<br/>" +
            "Centres disponibles :" +
            "<ul className='list-disc'>" +
            "<li className='ml-5'>Radiologie Bagatelle (<a className='text-blue-700' href='mailto:radiologie@bagatelle.fr'><u>radiologie@bagatelle.fr</u></a>)</li>" +
            "<li className='ml-5'>Rhumatologie Pellegrin (<a className='text-blue-700' href='mailto:sec.rhumato@chu-bordeaux.fr'><u>sec.rhumato@chu-bordeaux.fr</u></a>)</li>" +
            "</ul>"
    },
    {
        title: "Radiorachis",
        content:
            "<b>Faire pratiquer :</b>" +
            "<ul className='list-disc'>" +
            "    <li className='ml-5'>Radiographie du rachis lombaire</li>" +
            "</ul>" +
            "Recherche de fracture tassement vertébral"
    },
    {
        title: "Hémogramme...",
        content:
            "<b>Faire pratiquer dans un laboratoire d'analyses médicales, à jeun :</b>" +
            "<ul  className='list-disc'>" +
            "<li className='ml-5'>NFS, Plaquettes</li>" +
            "<li className='ml-5'>Electrophorèse des protéines sériques</li>" +
            "<li className='ml-5'>CRP</li>" +
            "<li className='ml-5'>Créatinine plasmatique avec calcul de la clairance CKD-EPI ou MDRD</li>" +
            "<li className='ml-5'>Dosage de la 25 OH VIT D ( D2 + D3), PTH</li>" +
            "<li className='ml-5'>ASAT, ALAT, PAL, GGT</li>" +
            "<li className='ml-5'>Phosphore sanguin</li>" +
            "<li className='ml-5'>Calcémie+Albumine avec calcul de la calcémie corrigée</li>" +
            "<li className='ml-5'>TSH</li>" +
            "</ul>"
    },
    {
        title: "Mesure hygénodiététiques...",
        content: "<b>Calcium / Vit D3 - 500 mg / 400 UI - comprimés - voie orale</b><br/>Un comprimé par jour<br/><br/><b>Uvedose 50 000 UI - voie orale</b><br/>Une ampoule par mois​"
    },
    {
        title: "Traitement de l'ostéoporose",
        content:
            "<b>Acide alendronique - 70 mg - comprimés - voie orale</b><br/>" +
            "1 comprimé par semaine, à jour fixe<br/>" +
            "Afin de réduire le risque de lésion de l'œsophage, prendre le traitement :<br/>" +
            "<ul className='list-disc'>" +
            "<li className='ml-5'>Au lever, à jeun, au moins 30 minutes avant la première prise alimentaire de la journée</li>" +
            "<li className='ml-5'>Ne pas s'allonger dans les 30 minutes suivant la prise, ni avant la prise alimentaire suivante</li>" +
            "<li className='ml-5'>Avec un grand verre d'eau plate peu minéralisée (eau du robinet par exemple)</li>" +
            "</ul>" +
            "<br/>" +
            "<b>Risédronate - 75 mg - comprimés - voie orale</b><br/>" +
            "1 comprimé le 1er jour du mois et 1 comprimé le 2ème jour du mois.<br/>" +
            "Afin de réduire le risque de lésion de l'œsophage, prendre le traitement :<br/>" +
            "<ul className='list-disc'>" +
            "<li className='ml-5'>Au lever, à jeun, au moins 30 minutes avant la première prise alimentaire de la journée</li>" +
            "<li className='ml-5'>Ne pas s'allonger dans les 30 minutes suivant la prise, ni avant la prise alimentaire suivante.</li>" +
            "<li className='ml-5'>Avec un grand verre d'eau plate peu minéralisée (eau du robinet par exemple)</li>" +
            "</ul>" +
            "<br/>" +
            "<b>Acide zolédronique - 5 mg - solution pour perfusion - voie intraveineuse</b><br/>" +
            "1 perfusion annuelle par une infirmière, à domicile.<br/>" +
            "À savoir :<br/>" +
            "<ul className='list-disc'>" +
            "<li className='ml-5'>Ce traitement va vous être administré par voie intraveineuse par une infirmière (sur 15 minutes)</li>" +
            "<li className='ml-5'>Hydratez vous avant et après la perfusion (au moins deux verres avant et après)</li>" +
            "<li className='ml-5'>1 kit de perfusion<br/></li>" +
            "</ul>" +
            "<br/>" +
            "<b>Paracétamol - 1000 mg - comprimés - voie orale :</b><br/>" +
            "1 cp toutes les 6 heures pendant 24h après la perfusion d'Acide Zolédronique.<br/>"
    },
]

export default function Card({ item }) {
    const [message, setMessage] = useState(null)

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>{item.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex w-full flex-1 flex-col items-center px-10 text-center">
                <h1 className="text-6xl font-bold my-20">
                    {item.name}
                </h1>

                <img src="/1.jpg" useMap="#image-map" />

                <map name="image-map">
                    <area data-bs-toggle="modal" data-bs-target="#modal" onClick={() => setMessage(modal[0])} className="cursor-pointer" alt="1" title="1" coords="5,332,87,275,167,332,87,390" shape="poly" />
                    <area data-bs-toggle="modal" data-bs-target="#modal" onClick={() => setMessage(modal[1])} className="cursor-pointer" alt="2" title="2" coords="208,245,255,209,301,245,254,278" shape="poly" />
                    <area data-bs-toggle="modal" data-bs-target="#modal" onClick={() => setMessage(modal[2])} className="cursor-pointer" alt="3" title="3" coords="330,392,286,477,328,563,431,564,475,478,432,392" shape="poly" />
                    <area data-bs-toggle="modal" data-bs-target="#modal" onClick={() => setMessage(modal[3])} className="cursor-pointer" alt="4" title="4" coords="2,537,99,638" shape="rect" />
                    <area data-bs-toggle="modal" data-bs-target="#modal" onClick={() => setMessage(modal[4])} className="cursor-pointer" alt="5" title="5" coords="240,594,324,626" shape="rect" />
                </map>

                {
                    message &&
                    <Modal message={message} callback={() => { setMessage(null); console.log("test"); }}></Modal>
                }
            </main>
        </div>
    )
}

export async function getStaticProps(ctx) {
    const { data, error } = await supabase.from('pathologies').select('*').eq('id', ctx.params.slug).single()

    if (error) {
        console.log(error)
    }

    return {
        props: {
            item: data
        }
    }
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from('pathologies').select('*')

    if (error) {
        console.log(error)
        return {}
    }

    return {
        paths: data.map(item => `/pathology/${item.id}`),
        fallback: false
    }
}