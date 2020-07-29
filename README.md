# remark-remove-shortcodes

> [remark](https://github.com/remarkjs/remark) plugin to remove WordPress shortcodes from text

# Installation

```
npm install remark-remove-shortcodes --save
```

# Usage

Say we have the following file, `example.html`:

```html
<main>
  <p>Some text</p>
  <p>
    [shortcode attr="1"]Shortcode content[/shortcode] and rest of the text...
  </p>
  <p>
    [shortcode attr="2"]Shortcode content 2[shortcode] and rest of the text...
  </p>
  <p>[shortcode_2 attr="false"/] Text after shortcode</p>
  <p>Text before shortcode [shortcode_3 attr="true"]</p>
  <p>Another content...</p>
</main>
```

And our script, `example.js`, looks as follows:

```javascript
import unified from 'unified'
import rehype from 'rehype-parse'
import rehype2remark from 'rehype-remark'
import stringify from 'remark-stringify'
import vfile from 'to-vfile'
import removeShortcodes from 'remark-remove-shortcodes'

unified()
  .use(rehype)
  .use(rehype2remark, {
    handlers: {
      comment: () => {},
    },
  })
  .use(removeShortcodes)
  .use(stringify)
  .process(vfile.readSync('example.html'), function (err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
Some text

Shortcode content and rest of the text...

Shortcode content 2 and rest of the text...

Text after shortcode

Text before shortcode

Another content...
```
