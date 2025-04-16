import React, { useState } from 'react';
import products from './products.json';

const initialFormState = { id: '', name: '', description: '', quantity: '', price: '', mfgDate: '' };

const CrudProduct = () => {
  const [productList, setProductList] = useState(products);
  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleProduct = (action, id) => {
    if (action === 'add') {
      setProductList([...productList, form]);
    } else if (action === 'update') {
      setProductList(productList.map(product => product.id === id ? form : product));
    } else if (action === 'delete') {
      setProductList(productList.filter(product => product.id !== id));
    }
    setForm(initialFormState);
  };

  return (
    <div>
      <h1>Product Management</h1>
      <form>
        <input type="text" name="id" value={form.id} onChange={handleChange} placeholder="Product ID" />
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" />
        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Product Description" />
        <input type="text" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" />
        <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="Price" />
        <input type="date" name="mfgDate" value={form.mfgDate} onChange={handleChange} placeholder="Manufacturing Date" />
        <button type="button" onClick={() => handleProduct('add')}>Add Product</button>
        <button type="button" onClick={() => handleProduct('update', form.id)}>Update Product</button>
      </form>
      <div>
        {productList.map(product => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: {product.price}</p>
            <p>Mfg Date: {product.mfgDate}</p>
            <button onClick={() => setForm(product)}>Edit</button>
            <button onClick={() => handleProduct('delete', product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrudProduct;
