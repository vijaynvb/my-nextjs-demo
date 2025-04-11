export default function DocsPage({ params }: { params: { slug?: string[] } }) {
  return <pre>{JSON.stringify(params.slug)}</pre>;
}

