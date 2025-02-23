import { ConfigurableModuleBuilder } from '@nestjs/common';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: AUTH_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<{
  authStrategies: string[];
}>()
  .setExtras<{ isGlobal?: boolean }>(
    {
      isGlobal: true,
    },
    (definitions, extras) => ({
      ...definitions,
      global: extras.isGlobal,
    }),
  )
  .build();
