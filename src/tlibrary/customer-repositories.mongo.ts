import { DeepPartial } from 'typeorm'
import { Customers } from './typeorm-models/customer-model'
import { TRepository } from './base-repository'
// import { Injectable } from '@nestjs/common'
// import { InjectRepository } from '@nestjs/typeorm'
import mongoose, { FilterQuery } from 'mongoose'

export class CustomerMongoRepository implements TRepository<Customers> {
	private readonly model: mongoose.Model<Customers>

	constructor(repo: mongoose.Model<Customers>) {
		this.model = repo
	}

	async findOne(query: FilterQuery<Customers>): Promise<Customers | null> {
		return this.model.findOne(query)
	}

	async findById(id: string): Promise<Customers | null> {
		return this.model.findById(id)
	}

	async findAll(query: FilterQuery<Customers>): Promise<Customers[]> {
		return this.model.find(query)
	}

	async create(entity: Customers): Promise<Customers> {
		const newEntity = new this.model(entity)
		return newEntity.save()
	}

	async update(id: string, entity: DeepPartial<Customers>): Promise<Customers | null> {
		return this.model.findByIdAndUpdate(id, entity, { new: true })
	}

	async delete(id: string): Promise<boolean> {
		return !!(await this.model.findByIdAndDelete(id))
	}
}

// @Injectable()
// export class NestCustomerRepository extends CustomerMongoRepository {
// 	constructor(@InjectRepository(Customers) repository: mongoose.Model<Customers>) {
// 		super(repository)
// 	}
// }
