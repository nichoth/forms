var { TextInput, NumberInput, Button } = require('../src/forms')
import { render } from 'preact';
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

function submit (ev) {
    ev.preventDefault()
    console.log('submit')
    console.log('value', ev.target.elements['test-input'].value)
}

function click (ev) {
    ev.preventDefault()
    console.log('click', ev)
}

function ClickingDemo () {
    var [resolving, setResolving] = useState(false)

    function doSomething (ev) {
        ev.preventDefault()
        setResolving(true)
        // 3 second delay
        setTimeout(() => setResolving(false), 3000)
    }

     return html`<div class="clicking-demo">
        <${Button} type="submit" onClick=${doSomething} isSpinning=${resolving}>
            do something
        </${Button}>
    </div>`
}

// the 'form-stuff' class here is necessary
function Demo () {
    return html`<form class="form-stuff" onsubmit=${submit}>
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

        <div class="btn">
            <${ClickingDemo} />
        </div>

        <div class="button">
            <button type="submit">submit!</button>
        </div>
    </form>`
}

render(html`<${Demo} />`, document.getElementById('content'));
