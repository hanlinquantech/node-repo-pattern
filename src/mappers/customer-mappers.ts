import {
	IAuthCustomer,
} from '../interfaces/customer-interfaces'
import { createMapper, Mapper, createMap, forMember, mapFrom } from '@automapper/core'
import { pojos, PojosMetadataMap } from '@automapper/pojos'
import { Customers } from '../tlibrary/typeorm-models/customer-model'

PojosMetadataMap.create<Customers>('Customers')
PojosMetadataMap.create<IAuthCustomer>('IAuthCustomer')

const create = () => createMapper({ strategyInitializer: pojos() })

export function customerToAuthMapper(): Mapper {
	const mapper = create()
	createMap<Customers, IAuthCustomer>(
		mapper,
		'Customers',
		'IAuthCustomer',
		forMember(
			d => d.user,
			mapFrom(s => s.user)
		),
		forMember(
			d => d.fullname,
			mapFrom(s => s.fullname)
		),
		forMember(
			d => d.level,
			mapFrom(s => s.level)
		),
		forMember(
			d => d.loginCount,
			mapFrom(s => s.loginCount)
		),
		forMember(
			d => d.popupCount,
			mapFrom(s => s.popupCount)
		)
	)
	return mapper
}