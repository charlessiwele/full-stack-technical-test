import { makeSchema } from 'nexus'
import { join } from 'path'
import * as types from "./graphql";

export const schema = makeSchema({
  types,
  outputs: {
    schema: join(process.cwd(), "src/schema_gen/schema.graphql"),
    typegen: join(process.cwd(), "src/schema_gen/nexus-typegen.ts"),
  },
})