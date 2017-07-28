git clone origin release

cd ../HackMerced/2017F

# build process
yarn build

# restart servers
pm2 restart web
pm2 restart tomoe
