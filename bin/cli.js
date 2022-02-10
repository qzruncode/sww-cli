#!/usr/bin/env node
"use strict";
const program = require("commander");
const chalk = require("chalk");
const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const { createWriteStream } = require("node:fs");
const zlib = require("zlib");
const tar = require("tar");
const mkdirp = require("mkdirp");
const ora = require("ora");
const { resolveApp } = require("../config/config/combine/helper");

program.on("--help", () => {
  console.log(
    `\r\nRun ${chalk.greenBright(
      "sww <command> --help"
    )} for detailed usage of given command.`
  );
});

program
  .command("run")
  .option("-m, --mode [mode]", "Specified the build mode")
  .option("-url, --PUBLIC_URL [PUBLIC_URL]", "file path")
  .option("-c, --isRuntimeCheck", "whether to open ts runtime check")
  .option("-r, --isUseRem", "Whether to convert px to rem unit")
  .option("-H, --HTTPS", "Whether to open HTTPS")
  .option("-h, --HOST [HOST]", "Specified the serve HOST")
  .description("compile the project")
  .action((options) => {
    console.log(chalk.greenBright("设置的环境变量"), options);
    process.env.mode = options.mode;
    process.env.PUBLIC_URL = options.PUBLIC_URL;
    process.env.isRuntimeCheck = !!options.isRuntimeCheck;
    process.env.isUseRem = !!options.isUseRem;
    process.env.HTTPS = !!options.HTTPS;
    process.env.HOST = options.HOST;

    const isDev = process.env.mode === "Dev" ? true : false;
    if (isDev) {
      require("../config/config/server");
    } else {
      // 检查webpack.plugins.js是否存在
      fs.access(resolveApp("webpack.plugins.js"), fs.constants.F_OK, (err) => {
        if (!err) {
          const plugin = require(resolveApp("webpack.plugins.js"));
          const config = require("../config/index");
          config(plugin);
        }
      });
    }
  });

program.command("init").action(async () => {
  const templateName = program.args[1];
  const spinner = ora("正在下载sww-template").start();
  const pkg = await fetch("https://registry.npmjs.org/" + templateName);
  const pkgInfo = await pkg.json();
  if (pkgInfo.error) {
    console.log(chalk.red(pkgInfo.error));
  } else {
    const version = pkgInfo["dist-tags"].latest;
    const tarball = pkgInfo.versions[version].dist.tarball;
    const destDir = path.join(process.cwd());
    const pkgTgz = await fetch(tarball);
    const dirs = [];
    const files = [];
    const wss = [];
    pkgTgz.body
      .pipe(zlib.Unzip())
      .pipe(new tar.Parse())
      .on("entry", function (entry) {
        if (entry.type === "Directory") {
          entry.resume();
          return;
        }
        const realPath = entry.path.replace(/^package\//, "");
        let filename = path.basename(realPath);
        filename =
          filename === "_package.json"
            ? filename.replace(/^_/, "")
            : filename.replace(/^_/, ".");
        const destPath = path.join(destDir, path.dirname(realPath), filename);
        const dir = path.dirname(destPath);
        if (!dirs.includes(dir)) {
          dirs.push(dir);
          mkdirp.sync(dir);
        }
        files.push(destPath);
        wss.push(
          new Promise((resolve) => {
            entry
              .pipe(createWriteStream(destPath))
              .on("finish", () => resolve())
              .on("close", () => resolve());
          })
        );
      })
      .on("end", () => {
        Promise.all(wss).then(() => {
          spinner.succeed("sww-template下载完成");
        });
      });
  }
});

program.parse(process.argv);
