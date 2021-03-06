const net = require('net');
const fs = require('fs');
const path = require('path');

/**
 * 检查端口是否被占用
 * @param {} cb
 * @param {} PORT=3000
 */
const checkPortIsValid = (cb, PORT = 3000) => {
  const testServer = net.createServer().listen(PORT); // 检测端口有无重复
  testServer.on('listening', function () {
    testServer.close();
    // 端口可用
    cb(PORT);
  });
  testServer.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      // 端口被占用
      PORT++;
      checkPortIsValid(cb, PORT);
    }
  });
};

/**
 * 相对路径转换成绝对路径
 * @param {} relativePath
 */
const resolveApp = relativePath => {
  const appDirectory = fs.realpathSync(process.cwd());
  return path.resolve(appDirectory, relativePath);
};

module.exports = { checkPortIsValid, resolveApp };
