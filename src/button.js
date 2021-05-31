import { html } from 'htm/preact'

function Button (props) {
    return html`<span class="form-stuff">
        ${props.isSpinning ?
            html`<button ...${props} class=${props.class || '' + ' spinning'}
                disabled=${true}
            >
                <span class="btn-content">${props.children}</span>
            </button>` :
            html`<div >
                <button ...${props}>
                    ${props.children}
                </button>
            </div>`
        }
        </span>`
}

module.exports = Button

