# Login to remote server, deploy latest changes, and run

sudo killall node

cd /brandlibel-me

sudo git reset --hard

sudo git pull

sudo yarn install

sudo yarn prod