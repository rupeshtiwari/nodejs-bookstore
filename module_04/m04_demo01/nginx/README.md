## Steps to install and run nginx on macOS M1

- `brew install nginx`
- `brew services start nginx`

**expected output**

```
==> Successfully started `nginx` (label: homebrew.mxcl.nginx)
```
3. Test nginx configuration `sudo nginx -t`

**expected output**
```
Password:
nginx: the configuration file /opt/homebrew/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /opt/homebrew/etc/nginx/nginx.conf test is successful
```
4. Check nginx service status `brew services list` 
5. Check the syntax of your Nginx configuration to ensure it doesn't contain any errors:
   ```
   /opt/homebrew/opt/nginx/bin/nginx -t -c /opt/homebrew/etc/nginx/nginx.conf
   ```
6. go to http://localhost your default nginx site must be running or 
```bash
  curl http://localhost:8080
```
You should see the default NGINX welcome page or a response from your configured application.

## Other commands
- Restart nginx `brew services restart nginx` 
 
 **expected output**
  
  ```
  Stopping `nginx`... (might take a while)
  ==> Successfully stopped `nginx` (label: homebrew.mxcl.nginx)
  ==> Successfully started `nginx` (label: homebrew.mxcl.nginx)
  ```
  
If NGINX is Already Running but Can't Reload:
Try Stopping and Starting NGINX with Homebrew services to properly reload configurations:

```bash
brew services stop nginx
brew services start nginx
```
![image](https://gist.github.com/assets/330383/ed3d8126-2148-4b10-8dc6-af993988519e)


### Ensure NGINX is Running:
Before attempting to reload, ensure NGINX is currently running. You can try starting it with:

```bash
 
brew services start nginx
```
This command will start NGINX as a background service managed by Homebrew.
 
### Check NGINX Process:
After attempting to start NGINX, you can check if it's running with:

```bash

brew services list
```
This will show you the status of NGINX and other Homebrew-managed services.

### Manually Start NGINX If Needed:
If for some reason NGINX did not start using brew services, you can try starting it manually with the command you found, which also allows NGINX to run in the foreground for debugging purposes:

```bash
 
/opt/homebrew/opt/nginx/bin/nginx -g 'daemon off;'
```
Note: Running NGINX in the foreground with daemon off; is useful for debugging but for regular operation, you'd typically want NGINX running in the background as a service.

### Reload NGINX Configuration:
Once NGINX is running, you can attempt to reload its configuration to apply any changes you've made:

```bash
 
brew services reload nginx
```
or if you prefer using NGINX directly:

```bash
 
/opt/homebrew/opt/nginx/bin/nginx -s reload
```
This should reload the NGINX configuration without requiring the server to stop and start, thereby minimizing downtime.