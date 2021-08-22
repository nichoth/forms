function createButton (html) {
    return function Button (props) {
        var _props = {...props}
        delete _props.isSpinning

        var cl = (props.class || props.className || '')

        return html`<span className="form-stuff">
            ${props.isSpinning ?
                html`<button ...${_props} className=${cl + ' spinning'}
                    disabled=${true}
                >
                    <span className="btn-content">${props.children}</span>
                </button>` :
                html`<button ...${_props}>
                    <span className="btn-content">${props.children}</span>
                </button>`
            }
        </span>`
    }
}

module.exports = createButton
