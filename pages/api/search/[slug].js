import {db} from '../search'

export default function handler(req, res) {
    const pathology = db.filter( pathology => pathology.name.toLowerCase().includes(req.query.slug.toLowerCase()))
    if( !pathology ) return res.status(404).json(null)
    res.status(200).json(pathology)
}