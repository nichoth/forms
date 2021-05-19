var { TextInput } = require('../src/forms')
import { render } from 'preact';
import { html } from 'htm/preact';

function Demo () {
    return html`<form>
        <${TextInput} name="test-input" displayName="test input"
        minlength="3" maxlength="6" />
    </form>`
}

render(html`<${Demo} />`, document.getElementById('content'));
