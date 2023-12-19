import { DeepPartial, EntityTarget, FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm'
import { TRepository } from './base-repository'
import { MariaConnection } from '../connections/maria'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { Inject, Injectable } from '@nestjs/common'

export class TypeORMRepository<TEntity extends ObjectLiteral> implements TRepository<TEntity> {
	private readonly repository: Repository<TEntity>

	constructor(entity: EntityTarget<TEntity>) {
		this.repository = MariaConnection.getDB().getRepository(entity)
	}

	async findOne(query: FindOptionsWhere<TEntity>): Promise<TEntity | null> {
		return this.repository.findOneBy(query)
	}

	async findById(id: string): Promise<TEntity | null> {
		return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<TEntity>)
	}

	async findAll(query: FindManyOptions<TEntity>): Promise<TEntity[]> {
		return this.repository.find(query)
	}

	async create(entity: DeepPartial<TEntity>): Promise<TEntity> {
		const newEntity = this.repository.create(entity)
		return this.repository.save(newEntity)
	}

	async update(id: string, entity: QueryDeepPartialEntity<TEntity>): Promise<TEntity | null> {
		await this.repository.update(id, entity)
		return this.findById(id)
	}

	async delete(id: string): Promise<boolean> {
		return !!(await this.repository.delete(id))
	}
}

@Injectable()
export class NestTypeORMRepository<TEntity extends ObjectLiteral> extends TypeORMRepository<TEntity> {
	constructor(@Inject('Entity') entity: EntityTarget<TEntity>) {
		super(entity)
	}
}
