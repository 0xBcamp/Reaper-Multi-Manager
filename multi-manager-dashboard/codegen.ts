
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.REACT_APP_GRAPHQL_SCHEMA_URL,
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/gql/": {
      preset: "client",
      config: {
        documentMode: "string",
        dedupeFragments: true
      },
      plugins: []
    }
  }
};

export default config;