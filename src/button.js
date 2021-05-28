import { html } from 'htm/preact'

function Button (props) {
    if (props.isResolving) {
        return html`<button ...${props}>
            ${props.children}
        </button>`
    }

    return html`<button ...${props}>
        ${props.children}
    </button>`
}

module.exports = Button
