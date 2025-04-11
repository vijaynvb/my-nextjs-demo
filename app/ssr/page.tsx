// app/ssr/page.tsx

async function getProducts() {
    const res = await fetch('http://localhost:3000/api/products', { cache: 'no-store' });
    return res.json();
  }
  
  export default async function SSRPage() {
    const products = await getProducts();
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">SSR Products</h2>
        <ul>
          {products.map((product: any) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  