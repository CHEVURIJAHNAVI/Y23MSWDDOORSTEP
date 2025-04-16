import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductsList.css'

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    orderDate: '',
    totalAmount: '',
    status: '',
  });
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getOrders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleInputChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value,
    });
  };

  const openModal = (order = null) => {
    if (order) {
      setIsEdit(true);
      setSelectedOrderId(order._id);
      setOrderForm({
        customerName: order.customerName,
        orderDate: order.orderDate ? order.orderDate.split('T')[0] : '',
        totalAmount: order.totalAmount,
        status: order.status,
      });
    } else {
      setIsEdit(false);
      setOrderForm({
        customerName: '',
        orderDate: '',
        totalAmount: '',
        status: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setOrderForm({
      customerName: '',
      orderDate: '',
      totalAmount: '',
      status: '',
    });
  };

  const addOrEditOrder = async (e) => {
    e.preventDefault();
    const { customerName, orderDate, totalAmount, status } = orderForm;

    if (isEdit) {
      try {
        const res = await axios.put(`http://localhost:5000/editOrder/${selectedOrderId}`, {
          customerName,
          orderDate,
          totalAmount,
          status,
        });
        fetchOrders(); 
        closeModal();
        alert(res.data.message);
      } catch (error) {
        console.error('Error updating order:', error);
      }
    } else {
      try {
        const res = await axios.post('http://localhost:5000/addOrder', {
          customerName,
          orderDate,
          totalAmount,
          status,
        });
        fetchOrders(); 
        closeModal();
        alert(res.data.message);
      } catch (error) {
        console.error('Error adding order:', error);
      }
    }
  };

  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/deleteOrder/${id}`);
      fetchOrders(); 
      alert(res.data.message);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="App">
      <h1>Orders List</h1>
      <button className='but' onClick={() => openModal()}>Add Order</button>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.customerName}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                <button className='but' onClick={() => openModal(order)}>Edit</button>
                <button className='but' onClick={() => deleteOrder(order._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEdit ? 'Edit Order' : 'Add Order'}</h2>
            <form onSubmit={addOrEditOrder}>
              <div>
                <label>Customer Name:</label>
                <input
                  type="text"
                  name="customerName"
                  value={orderForm.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Order Date:</label>
                <input
                  type="date"
                  name="orderDate"
                  value={orderForm.orderDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Total Amount:</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={orderForm.totalAmount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label>Status:</label>
                <input
                  type="text"
                  name="status"
                  value={orderForm.status}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button className='but' type="submit">{isEdit ? 'Update' : 'Add'} Order</button>
              <button className='but' type="button" onClick={closeModal}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrdersList;
