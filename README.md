# Invoice Generator

A complete invoice generation system with React frontend and Express backend that generates PDF invoices, sends them via email, and sends download links via SMS.

## Features

- **Frontend**: React with Vite and TailwindCSS
- **Backend**: Express.js server
- **PDF Generation**: Puppeteer converts HTML template to PDF
- **Email Service**: Nodemailer with Gmail SMTP
- **SMS Service**: Twilio API for sending download links
- **Professional Invoice Template**: Based on Meha Gupta's design format

## Project Structure

```
invoice-generator/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── InvoiceForm.jsx    # Main invoice form
│   │   │   └── InvoicePreview.jsx # Invoice preview modal
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Express backend
│   ├── controllers/
│   │   └── invoiceController.js   # Main controller
│   ├── services/
│   │   ├── pdfService.js          # PDF generation
│   │   ├── emailService.js        # Email sending
│   │   └── smsService.js          # SMS sending
│   ├── templates/
│   │   └── invoiceTemplate.html   # HTML invoice template
│   ├── routes/
│   │   └── invoiceRoutes.js       # API routes
│   ├── invoices/             # Generated PDFs storage
│   ├── server.js
│   └── package.json
├── .env.example              # Environment variables template
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Gmail account with App Password
- Twilio account (for SMS)

### 1. Clone and Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` in the backend directory and configure:

```bash
cd backend
cp .env.example .env
```

Edit the `.env` file with your credentials:

```env
# Server Configuration
PORT=3001
BASE_URL=http://localhost:3001

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Twilio Configuration
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

### 3. Gmail Setup (for Email Service)

1. Enable 2-factor authentication on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate an App Password for "Mail"
4. Use this App Password in the `EMAIL_PASSWORD` field

### 4. Twilio Setup (for SMS Service)

1. Sign up at [Twilio Console](https://console.twilio.com/)
2. Get your Account SID and Auth Token
3. Purchase a phone number or use the trial number
4. Add these credentials to your `.env` file

## Running the Application

### Development Mode

Start both frontend and backend in development mode:

```bash
# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend  
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# Start backend
cd backend
npm start
```

## API Endpoints

### POST /api/generate-invoice
Generates PDF invoice, sends email, and SMS.

**Request Body:**
```json
{
  "companyName": "Meha Gupta",
  "invoiceNumber": "ET202405301b",
  "date": "2024-05-30",
  "customerName": "Gelatone",
  "customerEmail": "customer@example.com",
  "customerPhone": "+919876543210",
  "items": [
    {
      "description": "Brownie",
      "quantity": 1,
      "price": 450,
      "unit": "kg"
    }
  ],
  "taxRate": 0,
  "discountAmount": 0
}
```

### GET /invoices/:fileName
Serves generated PDF files for download.

## Customizing the Invoice Template

The invoice template is located at `backend/templates/invoiceTemplate.html`. 

### Current Template Features:
- Meha Gupta branding and address
- Professional table layout with borders
- Supports items with quantity, description, unit price
- Subtotal and total calculations
- Indian Rupees formatting
- Contact information and thank you message

### To Modify the Template:

1. Edit `backend/templates/invoiceTemplate.html`
2. Update CSS styles for visual changes
3. Modify the HTML structure for layout changes
4. Update `backend/services/pdfService.js` if you change data fields

### Template Variables:
- `{{companyName}}` - Company name
- `{{invoiceNumber}}` - Invoice number
- `{{formatDate date}}` - Formatted date
- `{{customerName}}` - Customer name
- `{{customerEmail}}` - Customer email
- `{{customerPhone}}` - Customer phone
- `{{items}}` - Array of invoice items
- `{{formatCurrencyINR amount}}` - Indian Rupee formatting

## Troubleshooting

### Common Issues:

1. **PDF Generation Fails**
   - Ensure Puppeteer installed correctly
   - Check template HTML syntax

2. **Email Not Sending**
   - Verify Gmail App Password
   - Check EMAIL_USER and EMAIL_PASSWORD in .env

3. **SMS Not Sending**
   - Verify Twilio credentials
   - Check phone number format (+countrycode + number)
   - Ensure Twilio account has sufficient balance

4. **CORS Issues**
   - Backend already configured with CORS
   - Ensure frontend is making requests to correct backend URL

### Logs
Check console output for detailed error messages. Both services have comprehensive error handling and logging.

## Features in Detail

### Frontend Features:
- Responsive invoice form with validation
- Real-time total calculations
- Invoice preview modal
- Professional UI with TailwindCSS
- Loading states and error handling

### Backend Features:
- PDF generation with Puppeteer
- Email sending with attachments
- SMS with download links
- File serving for PDF downloads
- Error handling and logging
- Environment-based configuration

### Invoice Template:
- Professional business invoice layout
- Matches Meha Gupta's brand format
- Supports multiple items
- Tax and discount calculations
- Indian Rupees formatting
- Responsive design for printing

## License

This project is licensed under the ISC License.

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review console logs for error details
3. Ensure all environment variables are correctly configured