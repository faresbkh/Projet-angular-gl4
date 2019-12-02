

import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {UserCredentials, UserCredentialsRelations} from '../models';
import {inject} from '@loopback/core';

export class UserCredentialsRepository extends DefaultCrudRepository<
  UserCredentials,
  typeof UserCredentials.prototype.id,
  UserCredentialsRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: juggler.DataSource) {
    super(UserCredentials, dataSource);
  }
}
