import { visit } from 'unist-util-visit';

function customPlugin() {
  return (/** @type {unknown} */ tree) => {
    // @ts-ignore
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {})
        // @ts-ignore
        data.hName = node.name;
        // @ts-ignore
        data.hProperties = node.attributes;
      }
    })
  }
}

export default customPlugin;
