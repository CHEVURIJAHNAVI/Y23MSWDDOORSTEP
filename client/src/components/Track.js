import React from 'react';

// Sample tracking data for multiple orders
const trackingData = [
  {
    PurchaseId: 'T303',
    Cname: 'Alice',
    EDDate: '2025-01-05',
    Status: 'In Transit',
    DeliveryPerson: {
      Did: 'D404',
      DContact: '+1234567890',
    },
  },
  {
    PurchaseId: 'T304',
    Cname: 'Bob',
    EDDate: '2025-01-06',
    Status: 'Delivered',
    DeliveryPerson: {
      Did: 'D405',
      DContact: '+1234567891',
    },
  },
  {
    PurchaseId: 'T305',
    Cname: 'Charlie',
    EDDate: '2025-01-07',
    Status: 'Shipped',
    DeliveryPerson: {
      Did: 'D406',
      DContact: '+1234567892',
    },
  },
];

const Track = () => {
  return (
    <div>
      <h2>Tracking Information</h2>
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Field</th>
            <th>Order 1</th>
            <th>Order 2</th>
            <th>Order 3</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop over the fields and display each for all orders */}
          <tr>
            <td>Purchase ID</td>
            {trackingData.map((order, index) => (
              <td key={index}>{order.PurchaseId}</td>
            ))}
          </tr>
          <tr>
            <td>Customer Name</td>
            {trackingData.map((order, index) => (
              <td key={index}>{order.Cname}</td>
            ))}
          </tr>
          <tr>
            <td>Estimated Delivery Date</td>
            {trackingData.map((order, index) => (
              <td key={index}>{order.EDDate}</td>
            ))}
          </tr>
          <tr>
            <td>Status</td>
            {trackingData.map((order, index) => (
              <td key={index}>{order.Status}</td>
            ))}
          </tr>
          <tr>
            <td>Delivery Person ID</td>
            {trackingData.map((order, index) => (
              <td key={index}>{order.DeliveryPerson.Did}</td>
            ))}
          </tr>
          <tr>
            <td>Contact</td>
            {trackingData.map((order, index) => (
              <td key={index}>{order.DeliveryPerson.DContact}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Track;
