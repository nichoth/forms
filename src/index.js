import { html } from 'htm/preact'

function TextInput (props) {
    var { name, displayName } = props
    return html`<div class="input-group">
        <input name="${name}" type="text" placeholder=" "
            required minlength=${props.minlength} maxlength=${props.maxlength}
            id="${name}"
        />
        <label for="first-name">${displayName}</label>
    </div>`
}

module.exports = { TextInput }
