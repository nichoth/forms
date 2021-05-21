import { html } from 'htm/preact'

function TextInput (props) {
    var { name, displayName } = props

    return html`<div class="input-group ${name}">
        <input name="${name}" type="text" placeholder=" "
            required=${props.required} minlength=${props.minlength}
            maxlength=${props.maxlength} id="${name}"
        />
        <label for=${name}>${displayName}</label>
    </div>`
}

module.exports = TextInput
