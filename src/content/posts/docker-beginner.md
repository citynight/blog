---
title: "学习docker相关内容"
description: "9月18日目前所在的公司人心浮动， 今年已经有 3 波裁员，其他同事也将在 10 月份确认是否会留下来也就是进行第 4 次裁员。"
pubDate: "2024-09-18 20:30:00"
category: "life"
banner: "@images/banners/雷峰塔.png"
tags: ["java"]
selected: true
---

后端除了Java 外还需学习各种相关的技术，比如 docker。本文记录一下学习 docker 的过程。

## 前言
我是在双十一期间在阿里云购买了一个轻量主机，然后在上面安装 docker。对于我这样的初学者来说有一个轻量主机搞坏了就重新装是非常不错的，如果在本地搞的话可以使用虚拟机，然后安装 centos 系统，搞失败了就重新装系统。

## 安装 docker

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
