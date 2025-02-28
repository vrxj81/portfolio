import { PromiseExecutor } from '@nx/devkit';
import { TypeormMigrationExecutorSchema } from './schema';
import { execSync } from 'child_process';

const runExecutor: PromiseExecutor<TypeormMigrationExecutorSchema> = async (
  options,
  context,
) => {
  const projectRoot =
    context.projectsConfigurations.projects[context.projectName].root;
  try {
    execSync(
      buildCommand(options, projectRoot),
      {
        stdio: 'inherit',
      },
    );
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
      error: e.message,
    };
  }
};

export default runExecutor;

function buildCommand(options: TypeormMigrationExecutorSchema, projectRoot:string): string {
  const command = `ts-node -r tsconfig-paths/register --project ${projectRoot}/tsconfig.app.json ./node_modules/.bin/typeorm migration:${options.command} -d ${projectRoot}/ormconfig.local.ts`;
  if (options.name) {
    return `${command} ${projectRoot}/src/migrations/${options.name}`;
  }
  return command;
}
