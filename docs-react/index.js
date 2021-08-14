var { TextInput, NumberInput, Button, EditableField, createPencil } =
    require('../src/forms')
// import { render } from 'preact';
import { html } from 'htm/react';
import React, { useState } from 'react';
import ReactDOM from 'react-dom'

function submit (ev) {
    ev.preventDefault()
    console.log('submit')
    console.log('value', ev.target.elements['test-input'].value)
}

var PencilButton = createPencil(html)

function Demo () {
    return html`<form onSubmit=${submit}>
        <div>
            testing the pencil button
            <${PencilButton} onClick=${ev => {
                ev.preventDefault()
                console.log('click', ev)
            }} />
        </div>
    </form>`
}

ReactDOM.render(html`<${Demo} />`, document.getElementById('content'));
