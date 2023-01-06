export const db = [{
    name: 'Covid-19',
    information: 'Coronavirus'
},{
    name: 'SARS-Cov-2',
    information: 'Coronavirus'
}, {
    name: 'Tonsillitis',
    information: 'Infectious'
}, {
    name: 'Yellow fever',
    information: 'Infectious'
}]

export default function handler(req, res) {
    res.status(200).json(db)
}