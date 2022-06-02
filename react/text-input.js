import { html } from 'htm/react'

function TextInput (props) {
    var { name, displayName } = props
    var _props = {...props}
    delete _props.displayName

    return html`<div className="form-stuff">
        <div className="input-group ${name}">
            <input ...${_props} name="${name}" type=${props.type || 'text'}
                placeholder=" " required=${props.required}
                minLength=${props.minlength} maxLength=${props.maxlength}
                id="${name}"
            />
            <label htmlFor=${name}>${displayName}</label>
        </div>
    </div>`
}

module.exports = TextInput
