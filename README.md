# forms

Stuff for making forms

## example

`index.js` --
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

`style.scss` --

```css
@use "node_modules/@nichoth/forms/src/style";
```
