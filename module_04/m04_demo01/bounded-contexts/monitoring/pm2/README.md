

## Monitoring with PM2

PM2 is used for process management and monitoring of our Node.js service instances.

### Starting Services with PM2

To start your services with PM2 and specify different ports, use the following command template:
```bash
pm2 start path/to/service.js --name "service-name" -- PORT=XXXX
```

### Monitoring

To monitor your services in real-time with PM2, use the `monit` command:
```bash
pm2 monit
```

This command opens a dashboard displaying CPU and memory usage for each running instance, allowing you to observe the load distribution in real-time.

For more detailed monitoring and log management, consider setting up PM2's ecosystem file and exploring PM2's other features such as log rotation and clustering.

---

Remember to customize this README with any additional details specific to your project or organizational standards. This template provides a comprehensive overview and instructions for users to set up, run, and monitor your demo.