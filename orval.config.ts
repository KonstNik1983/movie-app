import { defineConfig } from 'orval';

export default defineConfig({
  tmdb: {
    output: {
      tsconfig: './tsconfig.app.json',
      mode: 'single',
      target: './src/api/tmdb.ts',
      schemas: './src/api/types',
      client: 'fetch',
      baseUrl: 'https://api.themoviedb.org',
      override: {
        mutator: {
          path: './src/api/app-fetch.ts',
          name: 'appFetch',
        },
      },
    },
    input: {
      target: 'https://developer.themoviedb.org/openapi/tmdb-api.json',
    },
    hooks: {
      afterAllFilesWrite: 'eslint src/api --ext .ts --fix',
    },
  },
});