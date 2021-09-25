import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkRehype from 'remark-rehype';
import stringify from 'rehype-stringify';
import remarkCustom from './index';

describe("unified test", () => {
  test('html', async () => {
    const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(stringify)
    .process('abc');

    expect(result.value).toStrictEqual('<p>abc</p>');
  });
  test('without custom', async () => {
    const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(stringify)
    .process(':::Custom{#readme className="customClass" prop1="abc" prop2="33"}');

    expect(result.value).toStrictEqual(
      '<p>:::Custom{#readme className="customClass" prop1="abc" prop2="33"}</p>'
    );
  });
  test('with custom', async () => {
    const result = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkCustom)
    .use(remarkRehype)
    .use(stringify)
    .process(':::Custom{#readme className="customClass" prop1="abc" prop2="33"}');

    expect(result.value).toStrictEqual(
      '<Custom id="readme" class="customClass" prop1="abc" prop2="33\"></Custom>'
    );
  });
});
