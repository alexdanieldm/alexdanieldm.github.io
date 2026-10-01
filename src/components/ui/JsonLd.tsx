/**
 * @fileoverview What a page is, said in the vocabulary search engines read:
 * schema.org, as JSON-LD.
 *
 * Every `<` is written as its escape, so nothing in the data, a title or a
 * description, can close the script early. JSON leaves `</script>` alone, and
 * the HTML parser has no idea it is inside a string.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
