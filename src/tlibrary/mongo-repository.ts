import { TRepository } from './base-repository'
import mongoose, { Document, FilterQuery, Types, UpdateQuery } from 'mongoose'

export class MongoRepository<TModel> implements TRepository<TModel> {
	private readonly model: mongoose.Model<TModel>

	constructor(repo: mongoose.Model<TModel>) {
		this.model = repo
	}

	async findOne(query: FilterQuery<TModel>): Promise<TModel | null> {
		return this.model.findOne(query)
	}

	async findById(id: string): Promise<TModel | null> {
		return this.model.findById(id)
	}

	async findAll(query: FilterQuery<TModel>): Promise<TModel[]> {
		return this.model.find(query)
	}

	async create(entity: TModel): Promise<Document<unknown, {}, TModel> & { _id: Types.ObjectId | unknown }> {
		const newEntity = new this.model(entity)
		return newEntity.save()
	}

	async update(id: string, entity: UpdateQuery<TModel>): Promise<TModel | null> {
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
