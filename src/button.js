import { html } from 'htm/preact'

function Button (props) {
    if (props.isSpinning) {
        return html`<button ...${props} class=${props.class || '' + ' spinning'}>
            <span class="btn-content">${props.children}</span>
        </button>`
    }

    return html`<button ...${props}>
        ${props.children}
    </button>`
}

module.exports = Button
