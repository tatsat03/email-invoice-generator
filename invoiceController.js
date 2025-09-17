const pdfService = require('../services/pdfService');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const path = require('path');

class InvoiceController {
  async generateInvoice(req, res) {
    try {
      const invoiceData = req.body;
      
      // Validate required fields
      if (!invoiceData.customerName || !invoiceData.customerEmail || !invoiceData.customerPhone) {
        return res.status(400).json({ 
          error: 'Customer name, email, and phone are required' 
        });
      }

      if (!invoiceData.items || invoiceData.items.length === 0) {
        return res.status(400).json({ 
          error: 'At least one item is required' 
        });
      }

      // Calculate totals if not provided
      if (!invoiceData.subtotal) {
        invoiceData.subtotal = invoiceData.items.reduce(
          (sum, item) => sum + (item.quantity * item.price), 0
        );
      }

      if (!invoiceData.tax) {
        invoiceData.tax = (invoiceData.subtotal * (invoiceData.taxRate || 0)) / 100;
      }

      if (!invoiceData.total) {
        invoiceData.total = invoiceData.subtotal + invoiceData.tax - (invoiceData.discountAmount || 0);
      }

      console.log('Generating PDF for invoice:', invoiceData.invoiceNumber);

      // Step 1: Generate PDF
      const pdfResult = await pdfService.generatePDF(invoiceData);
      console.log('PDF generated successfully:', pdfResult.fileName);

      // Step 2: Send Email
      try {
        await emailService.sendInvoiceEmail(
          invoiceData.customerEmail,
          invoiceData.customerName,
          pdfResult.buffer,
          invoiceData.invoiceNumber
        );
        console.log('Email sent successfully');
      } catch (emailError) {
        console.warn('Email sending failed:', emailError.message);
        // Continue with SMS even if email fails
      }

      // Step 3: Send SMS with download link
      try {
        const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3001}`;
        const downloadUrl = `${baseUrl}/invoices/${pdfResult.fileName}`;
        
        await smsService.sendInvoiceSMS(
          invoiceData.customerPhone,
          invoiceData.customerName,
          invoiceData.invoiceNumber,
          downloadUrl
        );
        console.log('SMS sent successfully');
      } catch (smsError) {
        console.warn('SMS sending failed:', smsError.message);
        // Continue even if SMS fails
      }

      // Return success response
      res.json({
        success: true,
        message: 'Invoice generated and sent successfully',
        invoiceNumber: invoiceData.invoiceNumber,
        fileName: pdfResult.fileName,
        downloadUrl: `/invoices/${pdfResult.fileName}`
      });

    } catch (error) {
      console.error('Error in generateInvoice:', error);
      res.status(500).json({
        error: 'Failed to generate invoice',
        details: error.message
      });
    }
  }

  async downloadInvoice(req, res) {
    try {
      const { fileName } = req.params;
      const filePath = path.join(__dirname, '../invoices', fileName);
      
      // Check if file exists
      if (!require('fs').existsSync(filePath)) {
        return res.status(404).json({ error: 'Invoice not found' });
      }

      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).json({ error: 'Error downloading invoice' });
        }
      });
    } catch (error) {
      console.error('Error in downloadInvoice:', error);
      res.status(500).json({ error: 'Failed to download invoice' });
    }
  }

  async getInvoice(req, res) {
    try {
      const { fileName } = req.params;
      const filePath = path.join(__dirname, '../invoices', fileName);
      
      // Check if file exists
      if (!require('fs').existsSync(filePath)) {
        return res.status(404).json({ error: 'Invoice not found' });
      }

      res.sendFile(filePath);
    } catch (error) {
      console.error('Error in getInvoice:', error);
      res.status(500).json({ error: 'Failed to retrieve invoice' });
    }
  }
}

module.exports = new InvoiceController();