var { TextInput, NumberInput } = require('../src/forms')
import { render } from 'preact';
import { html } from 'htm/preact';

function submit (ev) {
    ev.preventDefault()
    console.log('submit')
    console.log('value', ev.target.elements['test-input'].value)
}

function Demo () {
    return html`<form onsubmit=${submit}>
        <${TextInput} name="test-input" displayName="test input"
            minlength="3" maxlength="6" required=${true}
        />

        <${TextInput} name="something" displayName="something else"
            minlength="3" maxlength="6" required=${false}
        />

        <div class="number">
            <${NumberInput} min=${2} max=${6} value=${3}
                onIncrease=${ev => console.log('increase')}
                onDecrease=${ev => console.log('decrease')}
                onChange=${ev => console.log('change', ev.target.value)}
            />
        </div>

        <div class="button">
            <button type="submit">submit!</button>
        </div>
    </form>`
}

render(html`<${Demo} />`, document.getElementById('content'));
