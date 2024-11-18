---
title: "学习docker相关内容"
description: "后端除了Java 外还需学习各种相关的技术，比如 docker。本文记录一下学习 docker 的过程。"
pubDate: "2024-11-18 10:30:00"
category: "life"
banner: "@images/banners/雷峰塔.png"
tags: ["java"]
selected: true
---

后端除了Java 外还需学习各种相关的技术，比如 docker。本文记录一下学习 docker 的过程。

## 前言
我是在双十一期间在阿里云购买了一个轻量主机，然后在上面安装 docker。对于我这样的初学者来说有一个轻量主机搞坏了就重新装是非常不错的，如果在本地搞的话可以使用虚拟机，然后安装 centos 系统，搞失败了就重新装系统。

## 安装 docker
参考阿里云搭建 Docker 中[手动部署Docker](https://help.aliyun.com/zh/simple-application-server/use-cases/manually-deploy-docker)

1. 运行以下命令，下载docker-ce的yum源。
```bash
sudo wget -O /etc/yum.repos.d/docker-ce.repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

2. 运行以下命令，安装Docker。
```bash
sudo yum -y install docker-ce
```
3. 查看docker版本信息。
```bash
docker -v
```
出现以下信息，说明安装成功。
```bash
[root@xxx ~]# docker -v
Docker version 26.1.4, build 5650f9b
```
4. 启动Docker守护进程并设置开机自启动。
```bash
# 执行以下命令，启动Docker服务，并设置开机自启动。
sudo systemctl start docker
sudo systemctl enable docker

# 执行以下命令，查看Docker是否启动。
sudo systemctl status docker
```
如下图回显所示，表示Docker已启动。
```shell
● docker.service - Docker Application Container Engine
   Loaded: loaded (/usr/lib/systemd/system/docker.service; enabled; vendor preset: disabled)
   Active: active (running) since Mon 2024-11-18 13:44:45 CST; 11s ago
     Docs: https://docs.docker.com
 Main PID: 11707 (dockerd)
   CGroup: /system.slice/docker.service
           └─11707 /usr/bin/dockerd -H fd:// --containerd=/run/containerd...

```

5. 配置docker镜像源
镜像参考：[public-image-mirror](https://github.com/DaoCloud/public-image-mirror)
```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://docker.m.daocloud.io"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

6. 验证, 可以运行Nginx镜像进行验证
```bash
sudo docker pull nginx
sudo docker run --name my-nginx -d -p 80:80 nginx
```
此命令将下载Nginx镜像并在后台启动一个容器，映射容器的80端口到主机的80端口。

## 常用命令
参考雷丰阳的语雀[Docker快速上手](https://www.yuque.com/leifengyang/sutong/au0lv3sv3eldsmn8) 
文章安装部署部分不太适应，操作命令是适用的。
```shell 
#查看运行中的容器
docker ps
#查看所有容器
docker ps -a
#搜索镜像
docker search nginx
#下载镜像
docker pull nginx
#下载指定版本镜像
docker pull nginx:1.26.0
#查看所有镜像
docker images
#删除指定id的镜像
docker rmi e784f4560448


#运行一个新容器
docker run nginx
#停止容器
docker stop keen_blackwell
#启动容器
docker start 592
#重启容器
docker restart 592
#查看容器资源占用情况
docker stats 592
#查看容器日志
docker logs 592
#删除指定容器
docker rm 592
#强制删除指定容器
docker rm -f 592
# 后台启动容器
docker run -d --name mynginx nginx
# 后台启动并暴露端口
docker run -d --name mynginx -p 80:80 nginx
# 进入容器内部
docker exec -it mynginx /bin/bash

# 提交容器变化打成一个新的镜像
docker commit -m "update index.html" mynginx mynginx:v1.0
# 保存镜像为指定文件
docker save -o mynginx.tar mynginx:v1.0
# 删除多个镜像
docker rmi bde7d154a67f 94543a6c1aef e784f4560448
# 加载镜像
docker load -i mynginx.tar 


# 登录 docker hub
docker login
# 重新给镜像打标签
docker tag mynginx:v1.0 leifengyang/mynginx:v1.0
# 推送镜像
docker push leifengyang/mynginx:v1.0
```
