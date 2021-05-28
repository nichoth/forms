# forms
See a [demo](https://nichoth.github.io/forms/)

Form components that use `preact`

The preact components simplify the creation of `labels` & `id` attributes, and
form validation is done solely through css and html.

## install

```
npm i -S @nichoth/forms
```

## use

### css
`my-stylesheet.scss`:
```scss
@use "node_modules/@nichoth/forms/src/style/index";
// or individually
@use "node_modules/@nichoth/forms/src/style/number-input";
@use "node_modules/@nichoth/forms/src/style/text-input";
@use "node_modules/@nichoth/forms/src/style/button";
```

### with browserify
```js
var { TextInput, NumberInput } = require('@nichoth/forms')
```

### no browserify
```html
<script src="/path/to/@nichoth/forms/dist/bundle.js"></script>
<script>
    var { TextInput, NumberInput } = window.forms
    // ...
</script>
```

## example

`index.js`:
```js
var { TextInput, NumberInput, Button } = require('@nichoth/forms')
import { render } from 'preact';
import { html } from 'htm/preact';

function Demo () {
    var [resolving, setResolving] = useState(false)

    function doSomething (ev) {
        ev.preventDefault()
        setResolving(true)
        // 3 second delay
        setTimeout(() => setResolving(false), 3000)
    }

    return html`<form>
        <${TextInput} name="test-input" displayName="test input"
            minlength="3" maxlength="6" />

        <${NumberInput} name="test-number" min=${3} max=${6}
            value=${4}
            onIncrease=${ev => console.log('increase', ev)}
            onDecrease=${ev => console.log('decrease', ev)}
            name="foooo"
            onChange=${ev => console.log('change', ev)}
        />

        <${Button} type="submit" onClick=${doSomething}
            isSpinning=${resolving}
        >
            do something
        </${Button}>

        <div class="button">
            <button type="submit">submit!</button>
        </div>

    </form>`
}

render(html`<${Demo} />`, document.getElementById('content'));
```

---------------------------------

## read

https://css-tricks.com/form-validation-ux-html-css/


https://daverupert.com/2017/11/happier-html5-forms/

> Eventually, I discovered the simplest solution by hooking into the input’s invalid event. Just before the submit event, the browser performs a form.checkValidity() check which checks all the inputs. All inputs with invalid data fire the invalid event to say “Hey, I have invalid data!” It’s here that we can apply the error class we need.


https://css-tricks.com/form-validation-part-1-constraint-validation-html/

