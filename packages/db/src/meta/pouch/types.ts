import { logger } from "@truffle/db/logger";
const debug = logger("db:meta:pouch:types");

import PouchDB from "pouchdb";

import { Collections, CollectionName } from "@truffle/db/meta/collections";

export type Definitions<C extends Collections> = {
  [N in CollectionName<C>]: {
    createIndexes: PouchDB.Find.CreateIndexOptions["index"][];
    idFields: string[];
  };
};

export type Definition<
  C extends Collections,
  N extends CollectionName<C>
> = Definitions<C>[N];