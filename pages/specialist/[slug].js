import supabase from "../../lib/supabase"

export default function CardSpecialist({item}){
    return (
        <div>{item.name} - {item.information}</div>
    )
}

export async function getStaticProps(ctx) {
    const { data, error } = await supabase.from('specialists').select('*').eq('id', ctx.params.slug).single()

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
    const { data, error } = await supabase.from('specialists').select('*')

    if (error) {
        console.log(error)
        return {}
    }

    return {
        paths: data.map(item => `/specialist/${item.id}`),
        fallback: false
    }
}