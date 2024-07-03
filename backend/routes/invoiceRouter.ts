import express from 'express'
const invoiceRouter = express.Router()
const {
  getAllUserInvoices,
  createInvoice,
  changePaymentInvoice,
  deleteInvoice,
  getInvoiceSummary,
} = require('../controllers/invoiceController')

invoiceRouter.get('/:id', getAllUserInvoices)
invoiceRouter.post('/:id', createInvoice)
invoiceRouter.patch('/:id', changePaymentInvoice)
invoiceRouter.delete('/:id', deleteInvoice)
invoiceRouter.get('/summary/:id', getInvoiceSummary)
module.exports = invoiceRouter
