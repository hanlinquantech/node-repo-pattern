import { DeepPartial, FindManyOptions, FindOptionsWhere, Repository } from "typeorm";
import { Customers } from "./typeorm-models/customer-model";
import { TRepository } from "./base-repository";
// import { Injectable } from "@nestjs/common";
// import { InjectRepository } from "@nestjs/typeorm";

export class CustomerTypeORMRepository implements TRepository<Customers> {
	private readonly repository: Repository<Customers>

	constructor(repo: Repository<Customers>) {
		this.repository = repo
	}

	async findOne(query: FindOptionsWhere<Customers>): Promise<Customers | null> {
		return this.repository.findOneBy(query)
	}

	async findById(id: string): Promise<Customers | null> {
		return this.repository.findOneBy({ id })
	}

	async findAll(query: FindManyOptions<Customers>): Promise<Customers[]> {
		return this.repository.find(query)
	}

	async create(entity: DeepPartial<Customers>): Promise<Customers> {
		const newEntity = this.repository.create(entity)
		return this.repository.save(newEntity)
	}

	async update(id: string, entity: DeepPartial<Customers>): Promise<Customers | null> {
		await this.repository.update(id, entity)
		return this.findById(id)
	}

	async delete(id: string): Promise<boolean> {
		return !!(await this.repository.delete(id))
	}
}

// @Injectable()
// export class NestCustomerRepository extends CustomerTypeORMRepository {
// 	constructor(@InjectRepository(Customers) repository: Repository<Customers>) {
// 		super(repository)
// 	}
// }