import { html } from 'htm/preact'

function NumberInput (props) {
    var { name, min, max, onChange, value, onIncrease, onDecrease } = props

    return html`<div class="input-group-number">
        <input type="number" inputmode="numeric"
            pattern="[0-9]*"
            max="${max}"
            min=${min}
            onchange=${onChange}
            value=${value}
            name=${name}
        />
        <div class="number-nav">
            <div class="number-button number-up">
                <button onclick="${ev => {
                    ev.preventDefault()
                    onIncrease(ev)
                } }">+</button>
            </div>

            <div class="number-button number-down">
                <button onclick="${ev => {
                    ev.preventDefault()
                    onDecrease(ev)
                } }">-</button>
            </div>
        </div>
    </div>`
}

module.exports = NumberInput
