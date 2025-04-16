import React from 'react';
/*
const products = [
  { pid: 'P001', pname: 'Product 1', price: 10, pcategory: 'Category 1', pquantity: 100, manufacturingDate: '2023-01-01' },
  { pid: 'P002', pname: 'Product 2', price: 20, pcategory: 'Category 2', pquantity: 200, manufacturingDate: '2023-02-15' },
  { pid: 'P003', pname: 'Product 3', price: 30, pcategory: 'Category 3', pquantity: 300, manufacturingDate: '2023-03-10' },
  { pid: 'P004', pname: 'Product 4', price: 40, pcategory: 'Category 4', pquantity: 400, manufacturingDate: '2023-04-20' }
];

const Products = () => {
  return (
    <div>
      <h1>Products List</h1>
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Manufacturing Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.pid}>
              <td>{product.pid}</td>
              <td>{product.pname}</td>
              <td>{product.pcategory}</td>
              <td>{product.pquantity}</td>
              <td>${product.price}</td>
              <td>{product.manufacturingDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

import productsData from "./productsdata.json"; // Adjust the path as necessary
import "./Products.css"; // Optional CSS for styling

const Products = () => {
  return (
    <div className="products-container">
      {productsData.map((product) => (
        <div key={product.id} className="card">
          <h3 className="card-title">
            {product.first_name} {product.last_name}
          </h3>
          <p className="card-email">Email: {product.email}</p> 
          <p className="card-gender">Gender: {product.gender}</p>
          <p className="card-ip">IP Address: {product.ip_address}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
*/

import productsData from "./janu1.json"; // Adjust the path as necessary
import "./Products.css"; // Optional CSS for styling

const Products = () => {
  return (
    <div className="products-container">
      <h2>Product List</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price (₹)</th>
            <th>Discount (%)</th>
            <th>Shipping Cost (₹)</th>
            <th>Average Rating</th>
            <th>In Stock</th>
            <th>Arrival Date</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.discount_percentage}</td>
              <td>{product.shipping_cost}</td>
              <td>{product.average_rating} ★</td>
              <td>{product.quantity_in_stock}</td>
              <td>{product.arrival_date}</td>
              <td>{product.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
