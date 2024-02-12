import { Query, Resolver } from 'type-graphql';

import { Version } from '../models/version';

const VERSION = 'v7.0 G24.0';

@Resolver()
export class VersionResolver {
  @Query()
  public version(): Version {
    return { version: VERSION };
  }
}
