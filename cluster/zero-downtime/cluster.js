const cluster = require('cluster');
const os = require('os');

/**
 * cmd to measure availability: ab -c200 -t10 http://localhost:8080/
 */

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  
  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    // each worker process will have its own event loop and memory space
    cluster.fork();
  }
  console.log(`Master PID: ${process.pid}`);

  // master can be notified when a worker process exit
  cluster.on('exit', (worker, code, signal) => {
    // condition to verify if the worker process actually crashed and was not manually disconnected or killed by master process
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.id} crashed. ` +
                  'Starting a new worker...');
      
      cluster.fork();
    }
  });

  /**  listen to SIGUSR2 signal. signal to simulate an restart process using: kill -SIGUSR2 PID */
  process.on('SIGUSR2', () => {    
    const workers = Object.values(cluster.workers);

    const restartWorker = (workerIndex) => {
      const worker = workers[workerIndex];
      if (!worker) return;

      worker.on('exit', () => {
        if (!worker.exitedAfterDisconnect) return;
        console.log(`Exited process ${worker.process.pid}`);
        // fork is no synchrnous, instead we can monitor listening event which tell us that this new worker is connected and ready
        cluster.fork().on('listening', () => {
          restartWorker(workerIndex + 1);
        });
      });

      worker.disconnect();
    };

    restartWorker(0);
  });

  
} else {
  require('./server');
}

/**
 * TIP: pm2 package to monitor process in production
 */