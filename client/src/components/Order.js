import React from 'react';
import "./Order.css";

function Order() {
  const orders = [
    {
      orderId: '123456',
      product: 'Wireless Headphones',
      date: '2025-01-15',
      amount: '$120',
      status: 'Delivered',
    },
    {
      orderId: '123457',
      product: 'Smartphone',
      date: '2025-01-10',
      amount: '$800',
      status: 'Shipped',
    },
    {
      orderId: '123458',
      product: 'Laptop',
      date: '2025-01-05',
      amount: '$1500',
      status: 'Processing',
    },
  ];

  return (
    <div className="container">
      <h1 className="title">My Orders</h1>
      <div className="order-grid">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="card-content">
                <h6>Order ID: {order.orderId}</h6>
                <p><strong>Product:</strong> {order.product}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Amount:</strong> {order.amount}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No orders available</p>
        )}
      </div>
    </div>
  );
  
};

export default Order;
