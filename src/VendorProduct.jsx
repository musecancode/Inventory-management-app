export default function VendorProducts({ products }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-500">No products added yet.</p>
      ) : (
        products.map((p) => (
          <div key={p.id} className="border-b py-2">
            <div>
              <strong>{p.title}</strong>
            </div>
            <div>
              ₹{p.price} — Stock: {p.stock}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
