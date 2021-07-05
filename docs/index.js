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

function Counter (props) {
    var { min, max } = props
    var [count, setCount] = useState(3)

    function inc () {
        if ((parseInt(count) + 1) > max) return
        if (count < min) return setCount(min)
        setCount(count + 1)
    }

    function dec () {
        if ((parseInt(count) - 1) < min) return
        if (count > max) return setCount(max)
        setCount(count - 1)
    }

    function change (ev) {
        console.log('change', ev.target.value)
        setCount(ev.target.value)
    }

    return html`
        <${NumberInput} min=${2} max=${6} value=${count}
            onIncrease=${inc} onDecrease=${dec} onChange=${change} />
    `
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
            <p>min 2, max 6</p>
            <${Counter} min=${2} max=${6} />
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
