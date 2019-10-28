#!/usr/bin/env node
const Future = require('fluture')
const os = require('os')
const cpuCount = os.cpus().length
const getDockerProjects = require('./utils/get-docker-projects')
const spawnProcess = require('./utils/spawn-process')

Future.parallel(
  cpuCount,
  getDockerProjects().map(info =>
    spawnProcess(info.dockerImageName, 'docker', ['push', info.dockerImageName])
  )
).fork(
  code => {
    process.exit(code)
  },
  () => {
    process.exit(1)
  }
)