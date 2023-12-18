import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Index('user', ['user'], { unique: true })
@Index('date_created', ['dateCreated'], {})
@Index('token_login', ['tokenLogin'], {})
@Index('support_note', ['supportNote'], {})
@Index('phone', ['phone'], {})
@Entity('customers', { schema: 'maybe' })
export class Customers {
	@PrimaryGeneratedColumn({ type: 'bigint', name: 'ID' })
	id: string

	@Column('varchar', { name: 'aff_code', nullable: true, length: 25 })
	affCode: string | null

	@Column('varchar', { name: 'refer_code', nullable: true, length: 25 })
	referCode: string | null

	@Column('varchar', { name: 'dob_code', nullable: true, length: 25 })
	dobCode: string | null

	@Column('varchar', {
		name: 'user',
		nullable: true,
		unique: true,
		length: 255
	})
	user: string | null

	@Column('varchar', { name: 'pass', nullable: true, length: 255 })
	pass: string | null

	@Column('varchar', { name: 'password', length: 255 })
	password: string

	@Column('varchar', { name: 'reset_key', length: 128 })
	resetKey: string

	@Column('varchar', { name: 'str', length: 255 })
	str: string

	@Column('bigint', { name: 'balance', default: () => "'0'" })
	balance: string

	@Column('varchar', { name: 'fullname', nullable: true, length: 70 })
	fullname: string | null

	@Column('varchar', { name: 'birthday', nullable: true, length: 50 })
	birthday: string | null

	@Column('varchar', { name: 'phone', nullable: true, length: 255 })
	phone: string | null

	@Column('tinytext', { name: 'email', nullable: true })
	email: string | null

	@Column('tinytext', { name: 'address', nullable: true })
	address: string | null

	@Column('varchar', { name: 'yid', nullable: true, length: 255 })
	yid: string | null

	@Column('tinyint', { name: 'level', nullable: true, default: () => "'0'" })
	level: number | null

	@Column('tinyint', {
		name: 'status',
		nullable: true,
		width: 1,
		default: () => "'0'"
	})
	status: boolean | null

	@Column('tinyint', { name: 'ban_forever', width: 1, default: () => "'0'" })
	banForever: boolean

	@Column('tinyint', { name: 'verified_tel', width: 1, default: () => "'0'" })
	verifiedTel: boolean

	@Column('tinyint', { name: 'verified_tel2', width: 1, default: () => "'0'" })
	verifiedTel2: boolean

	@Column('varchar', { name: 'verified_tel_date', nullable: true, length: 100 })
	verifiedTelDate: string | null

	@Column('varchar', {
		name: 'verified_tel_date2',
		nullable: true,
		length: 100
	})
	verifiedTelDate2: string | null

	@Column('tinyint', { name: 'suspect', default: () => "'0'" })
	suspect: number

	@Column('varchar', { name: 'suspect_note', length: 1024 })
	suspectNote: string

	@Column('varchar', { name: 'date_created', nullable: true, length: 100 })
	dateCreated: string | null

	@Column('varchar', { name: 'user_last_update', nullable: true, length: 100 })
	userLastUpdate: string | null

	@Column('varchar', { name: 'create_by', length: 512 })
	createBy: string

	@Column('varchar', { name: 'last_login', nullable: true, length: 100 })
	lastLogin: string | null

	@Column('varchar', { name: 'credit', nullable: true, length: 5 })
	credit: string | null

	@Column('text', { name: 'logs', nullable: true })
	logs: string | null

	@Column('int', { name: 'login_count' })
	loginCount: number

	@Column('tinyint', { name: 'popup_count', width: 1, default: () => "'0'" })
	popupCount: boolean

	@Column('varchar', {
		name: 'created_on_mobi_desktop',
		nullable: true,
		length: 10
	})
	createdOnMobiDesktop: string | null

	@Column('tinyint', { name: 'is_warning', width: 1, default: () => "'0'" })
	isWarning: boolean

	@Column('varchar', { name: 'warning_note', length: 128 })
	warningNote: string

	@Column('tinyint', { name: 'ignore_warning', width: 1, default: () => "'0'" })
	ignoreWarning: boolean

	@Column('varchar', { name: 'support_note', nullable: true, length: 1024 })
	supportNote: string | null

	@Column('varchar', { name: 'token_login', length: 255 })
	tokenLogin: string

	@Column('varchar', { name: 'bank_list', nullable: true, length: 1024 })
	bankList: string | null

	@Column('text', { name: 'history', nullable: true })
	history: string | null
}
