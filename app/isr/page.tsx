// app/isr/page.tsx

async function getProducts() {
    const res = await fetch('http://localhost:3000/api/products', {
      next: { revalidate: 10 }, // Revalidate every 10 seconds
    });
    return res.json();
  }
  
  export default async function ISRPage() {
    const products = await getProducts();
  
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">ISR Products</h2>
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
  