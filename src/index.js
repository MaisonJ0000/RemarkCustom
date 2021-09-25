import { visit } from 'unist-util-visit';

function customPlugin() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        const data = node.data || (node.data = {})
        data.hName = node.name;
        data.hProperties = node.attributes;
      }
    })
  }
}

export default customPlugin;
