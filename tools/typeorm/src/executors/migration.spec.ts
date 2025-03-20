import { ExecutorContext } from '@nx/devkit';

import { TypeormMigrationExecutorSchema } from './schema';
import executor from './migration';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

const options: TypeormMigrationExecutorSchema = {
  command: 'create',
  name: 'migration',
};
const context: ExecutorContext = {
  projectName: 'my-app',
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
  projectGraph: {
    nodes: {},
    dependencies: {},
  },
  projectsConfigurations: {
    projects: {
      'my-app': {
        root: 'apps/my-app',
        sourceRoot: 'apps/my-app/src',
        projectType: 'application',
        targets: {},
      },
    },
    version: 2,
  },
  nxJsonConfiguration: {},
};

describe('TypeormMigration Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
