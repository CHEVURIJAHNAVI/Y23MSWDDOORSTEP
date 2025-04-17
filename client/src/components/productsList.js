import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import './ProductsList.css';

function Product() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    date: '',
    price: '',
    category: '',
  });
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [isQrGenerated, setIsQrGenerated] = useState(false);  // New state for tracking QR generation

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/getProducts');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = (product = null) => {
    if (product) {
      setIsEdit(true);
      setSelectedProductId(product._id);
      setProductForm({
        name: product.name,
        date: product.date ? product.date.split('T')[0] : '',
        price: product.price,
        category: product.category,
      });
    } else {
      setIsEdit(false);
      setProductForm({
        name: '',
        date: '',
        price: '',
        category: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setProductForm({
      name: '',
      date: '',
      price: '',
      category: '',
    });
  };

  const addOrEditProduct = async (e) => {
    e.preventDefault();
    const { name, date, price, category } = productForm;

    if (isEdit) {
      try {
        const res = await axios.put(`/editProduct/${selectedProductId}`, {
          name,
          date,
          price,
          category,
        });
        fetchProducts();
        closeModal();
        alert(res.data.message);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    } else {
      try {
        const res = await axios.post('/addProduct', {
          name,
          date,
          price,
          category,
        });
        fetchProducts();
        closeModal();
        alert(res.data.message);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(/deleteProduct/${id}`);
      fetchProducts();
      alert(res.data.message);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const generateQrCode = (product) => {
    const qrInfo = `Name: ${product.name}\nDate: ${new Date(product.date).toLocaleDateString()}\nPrice: ${product.price}\nCategory: ${product.category}`;
    setQrData(qrInfo);
    setIsQrGenerated(true);  // Set the QR as generated
    setQrModalOpen(true);
  };

  const closeQrModal = () => {
    setQrModalOpen(false);
    setQrData(null);
    setIsQrGenerated(false);  // Reset QR generation state when closing the modal
  };

  return (
    <div className="App">
      <h1>Products List</h1>
      <button className='but' onClick={() => openModal()}>Add Product</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{new Date(product.date).toLocaleDateString()}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button className='but' onClick={() => openModal(product)}>Edit</button>
                <button className='but' onClick={() => deleteProduct(product._id)}>Delete</button>
                <button className='but' onClick={() => generateQrCode(product)}>Generate QR</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={addOrEditProduct}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Date:</label>
                <input
                  type="date"
                  name="date"
                  value={productForm.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={productForm.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button className='but' type="submit">{isEdit ? 'Update' : 'Add'} Product</button>
              <button className='but' type="button" onClick={closeModal}>Close</button>
            </form>
          </div>
        </div>
      )}

{qrModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Product QR Code</h2>
      <QRCodeCanvas value={qrData} size={256} />
      <button className='but' onClick={closeQrModal}>Close</button>
    </div>
  </div>
)}

    </div>
  );
}

export default Product;
