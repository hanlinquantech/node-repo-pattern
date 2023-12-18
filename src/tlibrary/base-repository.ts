import { DeepPartial } from "typeorm"

export interface TRepository<T> {
	findOne(query: any): Promise<T | null>
	findById(id: string): Promise<T | null>
	findAll(query: any): Promise<T[]>
	create(entity: DeepPartial<T>): Promise<T>
	update(id: string, entity: DeepPartial<T>): Promise<T | null>
	delete(id: string): Promise<boolean>
}