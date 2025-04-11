// app/api/products/route.ts

export async function GET() {
    const products = [
      { id: 1, name: 'Laptop', price: 999 },
      { id: 2, name: 'Phone', price: 599 },
      { id: 3, name: 'Tablet', price: 399 },
    ];
  
    return Response.json(products);
  }
  