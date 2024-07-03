import mongoose, { Schema } from 'mongoose'
import categories from '../helpers/categories'
import { Decimal128, Double } from 'mongodb'
const InvoiceSchema = new Schema({
  apartment: {
    type: Schema.Types.ObjectId,
    ref: 'Apartment',
    required: true,
  },
  amount: { type: Number },
  category: { type: String, enum: categories, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  paidByMe: { type: Boolean, default: false },
  paidByTenant: { type: Boolean, default: false },
})
export default mongoose.model('Invoice', InvoiceSchema)
