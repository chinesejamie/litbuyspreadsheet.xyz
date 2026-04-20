interface SchemaScriptProps {
  schema: object | object[];
  id?: string;
}

export function SchemaScript({ schema, id = "schema" }: SchemaScriptProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return (
    <>
      {schemas.map((s, i) => (
        <script
          key={`${id}-${i}`}
          type="application/ld+json"
          id={`${id}-${i}`}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
