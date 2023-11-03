#!/bin/bash

# Replace 'node' with the actual process name you want to monitor
PROCESS_NAME="node"

# Get the process ID (PID) of the specified process running on port 3009
PID=$(lsof -i :3009 | grep -E "$PROCESS_NAME" | awk '{print $2}')

if [ -z "$PID" ]; then
  echo "Process '$PROCESS_NAME' not found on port 3009."
  exit 1
fi

echo "Monitoring CPU utilization for process '$PROCESS_NAME' (PID: $PID) on port 3009..."

# Use htop to monitor CPU usage for the specified process
htop -p "$PID"
