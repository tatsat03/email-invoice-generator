require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/invoices', express.static(path.join(__dirname, 'invoices')));

app.use('/api', invoiceRoutes);

if (!fs.existsSync(path.join(__dirname, 'invoices'))) {
  fs.mkdirSync(path.join(__dirname, 'invoices'), { recursive: true });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;