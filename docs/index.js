var { TextInput, NumberInput, Button, EditableField, PencilButton } =
    require('../preact')
import { render } from 'preact';
import { html } from 'htm/preact';
import { useState } from 'preact/hooks';

function submit (ev) {
    ev.preventDefault()
    console.log('submit')
    console.log('value', ev.target.elements['test-input'].value)
    console.log('something else', ev.target.elements['something'].value)
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

function Editing () {
    function save (newValue) {
        console.log('save', newValue)
        // wait 1 second
        // you *must* return a promise here;
        //   it is used by the `EditableField` component to
        //   set the resolving state
        return new Promise(resolve => setTimeout(resolve, 1000))
    }

    return html`
        <${EditableField} value="example" onSave=${save} name="example" />
    `
}


function Demo () {
    var [formDemoState, setFormState] = useState({ isResolving: false })

    function formSubmit (ev) {
        ev.preventDefault()
        setFormState({ isResolving: true })
        var els = ev.target.elements
        console.log('els', els)
        setTimeout(() => {
            setFormState({ isResolving: false })
            console.log('done submitting')
        }, 3000)
    }

    return html`<form onsubmit=${submit}>
        <${TextInput} name="test-input" displayName="test input" value="bar"
            minlength="3" maxlength="6" required=${true}
        />

        <${TextInput} name="something" displayName="something else" value="foo"
            minlength="3" maxlength="6" required=${false}
        />

        <div class="number">
            <p>min 2, max 6</p>
            <${Counter} min=${2} max=${6} />
        </div>

        <div class="editing">
            <${Editing} />
        </div>

        <div class="btn">
            <${ClickingDemo} />
        </div>

        <div>
            testing the pencil button
            <${PencilButton} onClick=${ev => {
                ev.preventDefault()
                console.log('click', ev)
            }} />
        </div>
    </form>

    <form class="form-demo" onSubmit=${submit}>
        <${TextInput} name="more-stuff" displayName="more stuff"
            minlength="3" maxlength="6" required=${false}
        />

        <${Button} type="submit"
            isSpinning=${formDemoState.isResolving}
        >
            Submit the form
        </${Button}>
    </div>`
}

render(html`<${Demo} />`, document.getElementById('content'));
