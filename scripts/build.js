#!/usr/bin/env node
const Future = require('fluture')
const os = require('os')
const cpuCount = os.cpus().length
const spawnProcess = require('./utils/spawn-process')
const getDockerProjects = require('./utils/get-docker-projects')

Future.parallel(
  cpuCount,
  getDockerProjects().map(info =>
    spawnProcess(info.dockerImageName, 'docker', [
      'build',
      info.path,
      '--tag',
      `${info.dockerImageName}:${info.tag}`,
      '--tag',
      `${info.dockerImageName}:latest`,
      '--cache-from',
      `${info.dockerImageName}:latest`,
    ])
  )
).fork(
  code => {
    process.exit(code)
  },
  () => {
    process.exit(1)
  }
)