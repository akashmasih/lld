import { useId, useReducer } from "react"
import FileTree from "../components/FileTree"

const initState = {
    nodes: {
        root: {
            name: 'root',
            id: 'root',
            parentId: null,
            type: 'folder'
        }
    },
    children: {
        root: []
    },
    expanded: {

    }
}
const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_FILE': {
            const { name, parentId, type } = payload
            const id = useId()
            const copyState = { ...state }
            if (type === 'folder') {
                copyState.children[id] = []
            }
            if (parentId && copyState.children[parentId]) {
                copyState.children[parentId].push(id)
            }
            copyState.nodes[id] = {
                name,
                parentId,
                type,
                id
            }
            return {
                ...copyState
            }
        }
        case 'DELETE': {
            const { key, parentId } = payload
            const copyState = { ...state }
            delete copyState.nodes[key]
            const removed = copyState.children[parentId].filter(item => item !== key)
            copyState.children[parentId] = removed

            return {
                ...copyState
            }
        }
        case 'EDIT': {

        }
        case 'EXPAND': {
            const { key } = payload
            const copyState = { ...state }
            copyState.expanded[key] = !state?.expanded[key]
            return {
                ...copyState
            }
        }
    }
}
export function FileExplorer() {
    const [state, dispatch] = useReducer(reducer, initState)


    return (
        <main>
            <FileTree parseInt='root' dispatch={dispatch} state={state} />
        </main>

    )

}