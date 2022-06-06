import cluster from 'node:cluster'

const runPrimaryProcess = async () => {
  const processId = process.pid
  const processesCount = 3
  console.log(`Primary ${processId} is running`)
  console.log(`Forking server with ${processesCount} process\n`)

  for (let index = 0; index < processesCount; index++) {
    const fork = cluster.fork()
    console.log(`Forking ${fork.process.pid} is running`)
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} died... scheduling another one!`)
      cluster.fork()
    }
  })
}

const runWorkerProcess = async () => {
  await import('./server')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()
