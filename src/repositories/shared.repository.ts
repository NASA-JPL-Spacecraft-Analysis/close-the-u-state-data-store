import { LessThanOrEqual, Between, Connection, ObjectType, Repository } from 'typeorm';

import { DateArgs, NameDateArgs } from '../args';
import { Node } from '../models';

export class SharedRepository<T extends Node> extends Repository<T> {
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
  public betweenErts(collectionName: string, dateArgs: DateArgs): Promise<T[]> {
    return this.find({
      where: {
        collectionName,
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
  public async betweenScets(collectionName: string, dateArgs: DateArgs): Promise<T[]> {
    return this.find({
      where: {
        collectionName,
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
  public byName(collectionName: string, name: string): Promise<T[]> {
    return this.find({
      where: {
        collectionName,
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
  public byNameBetweenDates(collectionName: string, nameDateArgs: NameDateArgs): Promise<T[]> {
    return this.find({
      where: {
        collectionName,
        scet: Between(nameDateArgs.start, nameDateArgs.end),
        name: nameDateArgs.name
      }
    });
  }

    /**
   * Finds an item by applicable time with the passed collection and scet
   *
   * @param scet a valid scet time
   * @returns a single item
   */
  public byApplicableTime(collectionId: string, scet: Date): Promise<T[]> {
    // @ts-ignore next-line - ignores ts error for ordering
    return this.find({
      where: {
        collectionId,
        scet: LessThanOrEqual(scet)
      },
      order: { scet: 'DESC' },
      take: 1
    });
  }
}
