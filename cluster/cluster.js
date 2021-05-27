const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  
  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    // each worker process will have its own event loop and memory space
    cluster.fork();
  }

  Object.values(cluster.workers).forEach(worker => {
    worker.send(`Hello Worker ${worker.id}`);
  });

} else {
  require('./server');
}

/**
 * With cluster setup we can't cache thing in memory because every worker 
 * process has its own memory space. We have to use a separate entity and 
 * read/write to that entity's API from all workers. 
 * This entity can be a database server or if you want to use in-memory cache, 
 * you can use a server like redis or you can create a dedicated node process 
 * with a READ/WRITE api for all other workers to communicate with.
 * If code change to implement a shared stateful node or redis node is not a option, 
 * you can use Sticky Load Balancing (is not as much efficient but is more simple).
 * The idea is keep a record of the state on the load balancer level where 
 * will save which node server has this state (session authenticated) and keep 
 * sending this user to the same node. 
 * The cluster module actually does not support sticky load balancing, 
 * but other load balancers can be configured by default.
 */