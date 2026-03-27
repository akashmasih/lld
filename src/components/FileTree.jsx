
export default function FileTree({ state, parseInt, dispatch }) {
    const { child } = state.children[parseInt] ?? []


    return (
        <main>
            {
                child.map(key => {
                    const node = state.nodes[key]
                    // if (node?.type === "folder")
                    //     return (

                    // )
                })
            }
        </main>
    )
}