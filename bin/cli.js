#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');

program.on('--help', () => {
  console.log(`\r\nRun ${chalk.greenBright('sww <command> --help')} for detailed usage of given command.`);
});

program
  .command('run')
  .option('-m, --mode [mode]', 'Specified the build mode')
  .option('-url, --PUBLIC_URL [PUBLIC_URL]', 'file path')
  .option('-c, --isRuntimeCheck', 'whether to open ts runtime check')
  .option('-r, --isUseRem', 'Whether to convert px to rem unit')
  .option('-H, --HTTPS', 'Whether to open HTTPS')
  .option('-h, --HOST [HOST]', 'Specified the serve HOST')
  .description('compile the project')
  .action(options => {
    console.log(chalk.greenBright('设置的环境变量'), options);
    process.env.mode = options.mode;
    process.env.PUBLIC_URL = options.PUBLIC_URL;
    process.env.isRuntimeCheck = !!options.isRuntimeCheck;
    process.env.isUseRem = !!options.isUseRem;
    process.env.HTTPS = !!options.HTTPS;
    process.env.HOST = options.HOST;

    const isDev = process.env.mode === 'Dev' ? true : false;
    if(isDev) {
      require('../config/config/server');
    }else {
      const config = require('../config/index');
      config(options);
    }
  });

program.parse(process.argv);
