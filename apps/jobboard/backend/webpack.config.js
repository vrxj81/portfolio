const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { basename, join, resolve } = require('path');
const { sync } = require('glob');

module.exports = {
  output: {
    path: join(__dirname, '../../../dist/apps/jobboard/backend'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      additionalEntryPoints: getEntryPoints(),
    }),
  ],
};

function getEntryPoints() {
  const entityFiles = sync(
    resolve(
      __dirname,
      '../../../libs/shared/data-access/backend/{users,roles,permission}/**/*.entity.ts',
    ),
  );

  const entities = entityFiles.reduce((acc, filename) => {
    const entryName = `entities/${basename(filename, '.ts')}`;
    acc.push({
      entryName: entryName,
      entryPath: filename,
    });
    return acc;
  }, []);

  const migrationFiles = sync(resolve('./src/migrations/*.ts'));

  const migrations = migrationFiles.reduce((acc, filename) => {
    const migrationName = `migrations/${basename(filename, '.entity.ts')}`;
    acc.push({
      entryName: migrationName,
      entryPath: filename,
    });
    return acc;
  }, []);

  return [...entities, ...migrations];
}
