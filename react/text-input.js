import { html } from 'htm/react'
import * as React from 'react'

function TextInput (props) {
    var { name, displayName } = props
    var _props = {...props}
    delete _props.displayName

    return html`<div className="form-stuff">
        <div className="input-group ${name}">
            <input ...${_props} name="${name}" type=${props.type || 'text'}
                placeholder=" " required=${props.required}
                minLength=${props.minlength || props.minLength}
                maxLength=${props.maxlength || props.maxLength}
                id="${name}"
            />
            <label htmlFor=${name}>${displayName}</label>
        </div>
    </div>`
}

module.exports = TextInput
