// import { html } from 'htm/preact'

function createPencil (html) {
    return function PencilButton (props) {
        var cl = props.class || props.className
        return html`<button ...${props}
            className="edit-pencil${cl ? (' ' + cl) : ''}"
        >
            ✏
        </button>`
    }
}

module.exports = createPencil
