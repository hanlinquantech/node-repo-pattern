import { DynamicModule, Module } from '@nestjs/common'
import { EntityTarget, ObjectLiteral } from 'typeorm'
import { NestTypeORMRepository } from './typeorm-repository'

@Module({})
export class TypeORMRepositoryModule {
	static entity<TEntity extends ObjectLiteral>(entity: EntityTarget<TEntity>): DynamicModule {
		return {
			module: TypeORMRepositoryModule,
			providers: [
				{
					provide: 'Entity',
					useValue: entity
				},
				NestTypeORMRepository<TEntity>
			],
			exports: [NestTypeORMRepository<TEntity>]
		}
	}
}
