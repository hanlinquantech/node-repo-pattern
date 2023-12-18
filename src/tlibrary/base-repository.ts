import { Document, Types } from 'mongoose'
import { UpdateQuery } from 'mongoose'
import { DeepPartial } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

export interface TRepository<T> {
	findOne(query: any): Promise<T | null>
	findById(id: string): Promise<T | null>
	findAll(query: any): Promise<T[]>
	create(entity: DeepPartial<T> | T): Promise<T | (Document<unknown, {}, T> & { _id: Types.ObjectId | unknown })>
	update(id: string, entity: QueryDeepPartialEntity<T> | UpdateQuery<T>): Promise<T | null>
	delete(id: string): Promise<boolean>
}
