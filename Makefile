install-pm2:
	npm install pm2 -g
install-serve:
	npm install -g serve
run-serve:
	pm2 serve build 5173 --name "education-app"

run-dev:
	pm2 start yarn --name "education-app" -- dev

logs:
	pm2 logs education-app
status:
	pm2 status
restart:
	pm2 restart education-app
stop:
	pm2 stop education-app
delete:
	pm2 delete education-app
