var { TextInput, NumberInput, Button, EditableField, PencilButton } =
    require('../react')
import { html } from 'htm/react';
// eslint-disable-next-line
// import React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom'

function submit (ev) {
    ev.preventDefault()
    console.log('submit')
    console.log('value', ev.target.elements['foo'].value)
}

function Demo () {
    var [resolving, setResolving] = useState(false)

    function doSomething (ev) {
        ev.preventDefault()
        setResolving(true)
        // 3 second delay
        setTimeout(() => setResolving(false), 3000)
    }

    return html`<form onSubmit=${submit}>
        <div>
            testing the pencil button
            <${PencilButton} onClick=${ev => {
                ev.preventDefault()
                console.log('click', ev)
            }} />
        </div>

        <div>
            <${TextInput} required=${true} name="foo"
                displayName="foo" required=${true}
            />
        </div>

        <div>
            <${Button} onClick=${doSomething} type="submit"
                isSpinning=${resolving}
            >
                submit
            <//>
            <${Button} type="reset">reset<//>
        </div>
    </form>`
}

ReactDOM.render(html`<${Demo} />`, document.getElementById('content'));
