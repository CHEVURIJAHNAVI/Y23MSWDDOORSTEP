import React from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import './Payment.css';


function Payment() {
  const payments = [
    {
      id: 1,
      date: '2025-01-10',
      amount: '$150.00',
      method: 'Credit Card',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2025-01-15',
      amount: '$200.00',
      method: 'PayPal',
      status: 'Completed',
    },
    {
      id: 3,
      date: '2025-01-20',
      amount: '$120.00',
      method: 'Bank Transfer',
      status: 'Completed',
    },
  ];

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Payment History
      </Typography>
      <Grid container spacing={3}>
        {payments.map((payment) => (
          <Grid item xs={12} sm={6} md={4} key={payment.id}>
            <Card style={{ backgroundColor: '#f9f9f9', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: 'bold', color: '#02075D' }}>
                  Payment #{payment.id}
                </Typography>
                <Typography>Date: {payment.date}</Typography>
                <Typography>Amount: {payment.amount}</Typography>
                <Typography>Method: {payment.method}</Typography>
                <Typography>Status: {payment.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Payment;
