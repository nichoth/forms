import { html } from 'htm/preact'

function Button (props) {
    return html`<div class="form-stuff">
        ${props.isSpinning ?
            html`<button ...${props} class=${props.class || '' + ' spinning'}>
                <span class="btn-content">${props.children}</span>
            </button>` :
            html`<div >
                <button ...${props}>
                    ${props.children}
                </button>
            </div>`
        }
        </div>`
}

module.exports = Button
