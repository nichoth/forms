import { html } from 'htm/preact'

// function TextInput (props) {
//     var { name, displayName } = props

//     return html`<div class="form-stuff">
//         <div class="input-group ${name}">
//             <input name="${name}" type="text" placeholder=" "
//                 required=${props.required} minlength=${props.minlength}
//                 maxlength=${props.maxlength} id="${name}"
//             />
//             <label for=${name}>${displayName}</label>
//         </div>
//     </div>`
// }

function create (html) {
    return function TextInput (props) {
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
}

module.exports = create(html)
module.exports.create = create
