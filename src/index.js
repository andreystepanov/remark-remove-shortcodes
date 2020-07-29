import visit from 'unist-util-visit'

const pattern = /\[\/?[0-9-a-z-_]+.*\]/g
const patternWihContent = /\[[0-9-a-z-_]+.*\](.*)?\[\/?[0-9-a-z-_]+.*\]/g

export default function removeShortcodes() {
  return transform
}

function transform(tree) {
  visit(tree, 'text', ontext)

  return tree
}

function ontext(node, index, parent) {
  const { value } = node

  if (
    parent.type === 'paragraph' &&
    value &&
    (pattern.test(value) || patternWihContent.test(value))
  ) {
    node.value = value
      .replace(patternWihContent, '$1')
      .replace(pattern, '')
      .trim()
  }
}
