var { TextInput } = require('../src/forms')
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
        minlength="3" maxlength="6" />
        <button type="submit">submit!</button>
    </form>`
}

render(html`<${Demo} />`, document.getElementById('content'));
