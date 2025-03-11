// // Import Express
// const express = require('express');

// // Create an instance of Express
// const app = express();

// // Define the port number
// const PORT = process.env.PORT || 5000;

// // Middleware to parse JSON bodies (for POST requests)
// app.use(express.json());

// // Home Route
// app.get('/', (req, res) => {
//   res.send('Welcome to the K L ERP!');
// });

// // About Route
// app.get('/about', (req, res) => {
//   res.send('This is the About Page.');
// });

// // Contact Route
// app.get('/contact', (req, res) => {
//   res.send('Contact us at contact@example.com.');
// });

// // POST Route Example
// app.post('/submit', (req, res) => {
//   const userData = req.body;
//   console.log('Received Data:', userData);
//   res.send('Data received successfully!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(Server is running on port ${PORT});
// });

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('Failed to connect to MongoDB', err));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.send('Hello, DoorStep');
});

const PORT = process.env.PORT || 6000;

dotenv.config();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send('Hello, DoorStep');
});

app.get('/contact', (req, res) => {
  res.send('Contact us at 2300030131@kluniversity.in');
});

app.post('/submit', (req, res) => {
  const userData = req.body;
  console.log('Received Data:', userData);
  res.send('Data received successfully!');
});

app.get('/pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'download.pdf'));
});

app.get('/image', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'image.png'));
});

app.get('/video', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'video.mp4'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
let employees = [
  { id: 1, empid: 'E001', name: 'Jack', psTeam: 'Team A', memberType: 'Full-time', attendance: 95, salary: 85 },
  { id: 2, empid: 'E002', name: 'Rose', psTeam: 'Team B', memberType: 'Contract', attendance: 90, salary: 80 }
];
app.get('/api/employees', (req, res) => {
  res.json(employees);
});
app.get('/api/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id == req.params.id);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.json(employee);
});
app.post('/api/employees', (req, res) => {
  const newEmployee = {
    id: employees.length + 1,  // Increment ID for new employee
    empid: req.body.empid,
    name: req.body.name,
    psTeam: req.body.psTeam,
    memberType: req.body.memberType,
    attendance: req.body.attendance,
    marks: req.body.salary
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);  // 201 Created
});

app.put('/api/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id == req.params.id);
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  // Update employee details
  employee.empid = req.body.empid || employee.empid;
  employee.name = req.body.name || employee.name;
  employee.psTeam = req.body.psTeam || employee.psTeam;
  employee.memberType = req.body.memberType || employee.memberType;
  employee.attendance = req.body.attendance || employee.attendance;
  employee.salary = req.body.salary || employee.salary;

  res.json(employee);  // Send the updated employee
});
app.delete('/api/employees/:id', (req, res) => {
  const employeeIndex = employees.findIndex(emp => emp.id == req.params.id);
  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees.splice(employeeIndex, 1);  // Remove employee from array
  res.status(204).send();  // 204 No Content
});
const PORT2 = process.env.PORT || 3000;
app.listen(PORT2, () => {
  console.log(`Server is running on port ${PORT2}`);
});
