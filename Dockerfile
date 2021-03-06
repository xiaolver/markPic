FROM ubuntu:20.04
ENV DEBIAN_FRONTEND=noninteractive
RUN sed -E -i 's/(security|archive).ubuntu.com/mirrors.aliyun.com/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y npm
RUN npm install -g http-server

ADD ./emm /work
WORKDIR /work
CMD http-server -p 4200
