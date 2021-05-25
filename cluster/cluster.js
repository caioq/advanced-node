const cluster = require('cluster');
const os = require('os');

// **** Mock DB Call
const numberOfUsersInDB = function() {
  this.count = this.count || 5;
  this.count = this.count * this.count;
  return this.count;
}
// ****

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  
  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    // each worker process will have its own event loop and memory space
    cluster.fork();
  }

  // Object.values(cluster.workers).forEach(worker => {
  //   worker.send(`Hello Worker ${worker.id}`);
  // });

  const updateWorkers = () => {
    const usersCount = numberOfUsersInDB();
    Object.values(cluster.workers).forEach(worker => {
      worker.send({ usersCount });
    });
  }

  updateWorkers();
  setInterval(updateWorkers, 10000);
  
} else {
  require('./server');
}