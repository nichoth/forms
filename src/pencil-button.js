import { html } from 'htm/preact'

function PencilButton (props) {
    var cl = props.class || props.className
    return html`<button ...${props}
        class="edit-pencil${cl ? (' ' + cl) : ''}"
    >
        ✏
    </button>`
}

module.exports = PencilButton
