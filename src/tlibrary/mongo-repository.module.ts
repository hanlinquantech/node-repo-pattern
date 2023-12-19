import { DynamicModule, Module } from '@nestjs/common'
import { NestMongoRepository } from './mongo-repository'
import mongoose from 'mongoose'

@Module({})
export class MongoRepositoryModule {
	static model<TModel>(model: mongoose.Model<TModel>): DynamicModule {
		return {
			module: MongoRepositoryModule,
			providers: [
				{
					provide: 'Model',
					useValue: model
				},
				NestMongoRepository<TModel>
			],
			exports: [NestMongoRepository<TModel>]
		}
	}
}
