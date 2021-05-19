# forms

See a [demo](https://nichoth.github.io/forms/)

Form components that use `preact`

The preact components simplify the creation of `labels` & `id` attributes, and
form validation is done solely through css.

## install

```
npm i -S @nichoth/forms
```

## use

### css
`my-stylesheet.scss`:
```css
@use "node_modules/@nichoth/forms/src/style";
```

### with browserify
```js
var { TextInput } = require('@nichoth/forms')
```

### no browserify
```html
<script src="/path/to/@nichoth/forms/dist/bundle.js"></script>
<script>
    var { TextInput } = window.forms
    // ...
</script>
```

## example

`index.js`:
```js
var { TextInput } = require('@nichoth/forms')
import { render } from 'preact';
import { html } from 'htm/preact';

function Demo () {
    return html`<form>
        <${TextInput} name="test-input" displayName="test input"
            minlength="3" maxlength="6" />
    </form>`
}

render(html`<${Demo} />`, document.getElementById('content'));
```

output:
```html
<form>
    <div class="input-group">
        <input name="test-input" type="text" placeholder=" " required
            minlength="3" maxlength="6" id="test-input">
        <label for="test-input">test input</label>
    </div>
</form>
```

---------------------------------

## read

https://css-tricks.com/form-validation-ux-html-css/


https://daverupert.com/2017/11/happier-html5-forms/

> Eventually, I discovered the simplest solution by hooking into the input’s invalid event. Just before the submit event, the browser performs a form.checkValidity() check which checks all the inputs. All inputs with invalid data fire the invalid event to say “Hey, I have invalid data!” It’s here that we can apply the error class we need.


https://css-tricks.com/form-validation-part-1-constraint-validation-html/

