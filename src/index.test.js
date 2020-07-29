import removeShortcodes from './'
import unified from 'unified'
import rehype from 'rehype-parse'
import rehype2remark from 'rehype-remark'
import stringify from 'remark-stringify'

const parse = data =>
  unified()
    .use(rehype)
    .use(rehype2remark, {
      handlers: {
        comment: () => {},
      },
    })
    .use(removeShortcodes)
    .use(stringify, {
      emphasis: '*',
      strong: '*',
      bullet: '-',
      fences: true,
    })
    .processSync(data)
    .toString()

test('defined', () => {
  expect(removeShortcodes).toBeDefined()
  expect(typeof removeShortcodes).toBe('function')
})

// prettier-ignore
const data = `
  <main>
    <p>Some text</p>
    <p>[shortcode attr="1"]Shortcode content[/shortcode] and rest of the text...</p>
    <p>[shortcode attr="2"]Shortcode content 2[shortcode] and rest of the text...</p>
    <p>[shortcode_2 attr="false"/] Text after shortcode</p>
    <p>Text before shortcode [shortcode_3 attr="true"]</p>
    <p>Another content...</p>
  </main>
`

test('removes all WordPress shortcodes', () => {
  const md = parse(data)
  // console.log(md)
  expect(md).toMatchSnapshot()
})
