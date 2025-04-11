export default function ProductPage({ params }: { params: { id: string } }) {
    return <h1>🛒 Product Details for: {params.id}</h1>;
  }
  