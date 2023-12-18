import mongoose, { Document } from 'mongoose'
import { BaseSchema } from './base-schema'
import { Customers } from '../typeorm-models/customer-model'

const CustomerSchema = new BaseSchema<Customers>(
	{
		aff_code: String,
		refer_code: String,
		dob: Date,
		user: { type: String, index: { unique: true }, dropDups: true },
		password: { type: String, required: true },
		reset_key: { type: String, required: false, default: '' },
		str: { type: String, required: true },
		balance: { type: Number, required: true, default: 0 },
		fullname: String,
		birthday: String,
		phone: { type: String, index: true },
		email: String,
		address: String,
		yid: String,
		level: { type: String, default: 0 },
		status: { type: Boolean, default: false },
		ban_forever: { type: Boolean, required: true, default: false },
		verified_tel: { type: Boolean, required: true, default: false },
		verified_tel2: { type: Boolean, required: true, default: false },
		verified_tel_date: { type: Date, required: false, default: null },
		verified_tel_date2: { type: Date, required: false, default: null },
		suspect: { type: Number, required: true, default: 0 },
		suspect_note: { type: String, required: false, default: '' },
		date_created: {
			type: Date,
			required: false,
			index: true,
			default: new Date()
		},
		user_last_update: { type: Date, required: false },
		create_by: { type: String, required: false, default: '' },
		last_login: { type: Date, required: false },
		credit: { type: String, required: false },
		logs: { type: String, required: false },
		login_count: { type: Number, required: false, default: 0 },
		popup_count: { type: Number, required: true, default: 0 },
		created_on_mobi_desktop: { type: String, required: true, default: '' },
		is_warning: { type: Boolean, required: true, default: false },
		warning_note: { type: String, required: false, default: '' },
		ignore_warning: { type: Boolean, required: true, default: false },
		support_note: { type: String, index: true, default: null },
		token_login: {
			type: String,
			required: false,
			default: ''
		},
		bank_list: { type: String, default: null },
		history: String
	},
	{
		toJSON: {
			transform(doc: Document, ret: Record<string, any>) {
				ret.id = ret._id
				delete ret._id
				delete ret.password
				delete ret.str
				delete ret.__v
			}
		}
	}
)

const CustomerModel = mongoose.model<Customers>('Customer', CustomerSchema)

export default CustomerModel
