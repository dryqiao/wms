FROM node:10-slim
WORKDIR /app
ADD . /app/
EXPOSE 7001 
RUN  npm install -g cnpm --registry=https://registry.npm.taobao.org && cnpm install
CMD ["npm", "run", "start"]