import { html } from 'htm/react'

function TextInput (props) {
    var { name, displayName } = props

    return html`<div className="form-stuff">
        <div className="input-group ${name}">
            <input name="${name}" type="text" placeholder=" "
                required=${props.required} minLength=${props.minlength ||
                    props.minLength}
                maxLength=${props.maxlength || props.maxLength}
                id="${name}"
            />
            <label htmlFor=${name}>${displayName}</label>
        </div>
    </div>`
}

module.exports = TextInput
