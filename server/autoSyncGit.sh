#!/bin/bash

echo "🌀 Pulling latest changes from Git..."
git pull

echo "⛔ Stopping PM2 process..."
pm2 stop cowork_booking

echo "🔄 Starting PM2 process..."
pm2 start index.js --name cowork_booking

# Wait a second for PM2 to boot up
sleep 2

echo "🧪 Checking PM2 process status..."
status=$(pm2 info cowork_booking | grep status | awk '{print $4}')

if [ "$status" == "online" ]; then
    echo "✅ PM2 process 'cowork_booking' is online!"
else
    echo "❌ PM2 process failed to start properly. Check logs with: pm2 logs cowork_booking"
    exit 1
fi

echo "💾 Saving PM2 state..."
pm2 save

echo "🚀 Deploy complete!"