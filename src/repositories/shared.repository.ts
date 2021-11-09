import { BaseEntity, Between, Connection, ObjectType, Repository } from 'typeorm';

import { DateArgs, NameDateArgs } from '../args';

export class SharedRepository<T extends BaseEntity> extends Repository<T> {
  constructor(connection: Connection, entity: ObjectType<T>) {
    super();

    Object.assign(this, {
      manager: connection.manager,
      metadata: connection.getMetadata(entity),
      queryRunner: connection.manager.queryRunner,
    });
  }

  /**
   * Finds items between a start and ert.
   * 
   * @param dateArgs A start and end ert.
   * @returns A list of items.
   */
  public betweenErts(dateArgs: DateArgs): Promise<T[]> {
    return this.find({
      where: {
        ert: Between(dateArgs.start, dateArgs.end)
      }
    });
  }

  /**
   * Finds items between a start and end scet.
   * 
   * @param dateArgs A start and end scet.
   * @returns A list of items.
   */
  public async betweenScets(dateArgs: DateArgs): Promise<T[]> {
    return this.find({
      where: {
        scet: Between(dateArgs.start, dateArgs.end)
      }
    });
  }

  /**
   * Finds items with the passed name.
   * 
   * @param name The name of the item.
   * @returns A list of items.
   */
  public byName(name: string): Promise<T[]>  {
    return this.find({
      where: {
        name
      }
    });
  }

  /**
   * Finds items with the passed name and between a start and end scet.
   * 
   * @param nameDateArgs A name and start and end scets.
   * @returns A list of items.
   */
  public byNameBetweenDates(nameDateArgs: NameDateArgs): Promise<T[]> {
    return this.find({
      where: {
        scet: Between(nameDateArgs.start, nameDateArgs.end),
        name
      }
    });
  }
}
