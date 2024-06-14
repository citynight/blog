---
title: "在Mac电脑使用Consul"
description: "在Mac电脑中安装并使用Consul"
pubDate: "2024-06-13 21:54:00"
category: "spring"
banner: "@images/banners/consul.webp"
tags: ["spring", "java"]
selected: false
---

## 安装Consul
官网下载地址：https://www.consul.io/downloads.html
我没有使用 brew 安装，而是直接下载安装包，然后解压到任意目录下，然后添加到环境变量中。

具体操作步骤如下： 
下载 consul，解压到任意目录，并添加到环境变量。
```shell
# 复制到 /usr/local/bin
cp /Users/logan/Downloads/consul_1.18.2_darwin_arm64/consul /usr/loc
al/bin
# 查看版本，如果生效了则能正常显示信息
consul --version
```
![添加到环境变量](https://github.com/citynight/blog-image/assets/7713239/31e8784e-90f4-481a-988e-8dd52f5f0546)

##  使用Consul
### 客户端模式
启动 consul
```shell
consul agent -dev
```

访问 http://localhost:8500
![启动 consul](https://github.com/citynight/blog-image/assets/7713239/6374f445-c920-43b2-a31a-672d1e504138)

结束 consul，使用 ctrl + c 或者执行 leave 命令
```shell
consul leave
```

### 服务器模式
如果需要持久化运行，可以使用以下命令：
```shell
consul agent -server -ui -bootstrap-expect=1 -client=0.0.0.0 -bind 你的ip地址 -data-dir=/状态数据存储文件夹/data >> /日志记录文件夹/logs/consul.log &
```

>-bind：绑定的内部通讯地址，默认0.0.0.0，即所有的本地地址，也可以改为自己的ip地址。
> 
> -data-dir：状态数据存储用的文件目录

比如我的 Wi-Fi 网络，ip 地址为 192.168.3.21
![ip地址](https://github.com/citynight/blog-image/assets/7713239/cf84ac07-1d16-47bd-a3f0-fff75f8f113e)
我本地为consul创建了`/Users/logan/WorkSpace/consul/data`和`/Users/logan/WorkSpace/consul/logs`文件夹，那么启动命令如下：
```shell
consul agent -server -ui -bootstrap-expect=1 -client=0.0.0.0 -bind 192.168.3.21 -data-dir=/Users/logan/WorkSpace/consul/data >> /Users/logan/WorkSpace/consul/logs/consul.log &
```
![启动 consul](https://github.com/citynight/blog-image/assets/7713239/bb184ebe-cd31-4c80-967c-d8e1ce7366bc)
执行命令后会给出consul PID，如果想要关闭consul，可以使用 `kill -9 XXX`命令,其中 XXX 为 consul 的 PID。
比如我想结束当前启动的 consul，可以使用 `kill -9 72166` 命令。

那么如果后续忘记了 consul 的 PID，可以使用 `lsof -i :8500` 搜出来的 PID 结果直接 kill 即可。。

浏览器访问 http://localhost:8500 能正常访问

## 常用命令
官网命令介绍地址：https://developer.hashicorp.com/consul/commands

接上面，首先前面的 consul 肯定是省略不了了，看一下其他参数：

### 常用command命令
* `agent`：运行一个consul agent
* `join`：将agent加入到consul cluster
* `members`：列出consul cluster集群中的members

### 常用option选项命令
* `-bootstrap`：启动模式，此模式下，节点可以选举自己为leader，一个数据中心只能有一个此模式启动的节点。机群启动后，新启动的节点不建议使用这种模式。
* `-bootstrap-expect`：设定一个数据中心需要的服务节点数，可以不设置，设置的数字必须和实际的服务节点数匹配。consul会等待直到数据中心下的服务节点满足设定才会启动集群服务。初始化leader选举，不能和bootstr- ap混用。必须配合-server配置。
* `-bind`：绑定的内部通讯地址，默认0.0.0.0，即，所有的本地地址，会将第一个可用的ip地址散播到集群中，如果有多个可用的ipv4，则consul启动报错。[::]ipv6，TCP UDP协议，相同的端口。防火墙配置。
* `-client`：客户端模式，http dns，默认127.0.0.1，回环令牌网址
* `-config-file`：配置文件位置
* `-config-dir`：配置文件所在文件夹，会加载其下所有配置文件，.json或者.hcl文件，加载顺序为字母表顺序；可用配置多个此配置，从而加载多个文件夹，子文件夹的配置不会被加载。
* `-config-format`：配置文件格式，配置了，则加载相应个是的文件。不配置，则consul自动识别。
* `-data-dir`：状态数据存储文件夹，所有的节点都需要。文件夹位置需要不收consul节点重启影响，必须能够使用操作系统文件锁，unix-based系统下，文件夹文件权限为0600，注意做好账户权限控制，
* `-datacenter`：数据中心名称，默认dc1，一个数据中心的所有节点都必须在一个LAN中。
* `-dev`：开发模式，去掉所有持久化选项，内存服务器模式。
* `-disable-host-node-id`：不使用host信息生成node ID，适用于同一台服务器部署多个实例用于测试的情况。随机生成nodeID
* `-dns-port`：v7.0以后，自定义dns 端口，覆盖默认8600
* `-enable-script-checks`：是否允许使用脚本进行健康检查，默认false，最好配置enable acl
* `-encrypt`：consul网络通讯加密key，base64加密，16比特；consul keygen产生。集群中的每个实例必须提供相同的，只需提供一次，然后会保存到数据文件。重启自动加载。consul节点启动后提供，会被忽略。
* `-hcl`：添加hcl格式配置，和已有的配置合并。可以使用多个此配置。
* `-http-port`：http api端口，覆盖默认的8500。适用于云环境指定。
* `-log-file`：日志记录文件，如果没有提供文件名，则默认Consul-时间戳.log
* `-log-level`：日志级别，默认info，包含：trace，debug，info，warn，err；consul monitor监控
* `-log-rotate-bytes`：新日志文件生成大小阈值。
* `-log-rotate-rotation`：新日志生成时间阈值
* `-join`：需要加入的其它节点地址，可以多次使用，加入多个节点。
* `-retry-join`：会进行加入重试，适用于认定加入节点最终会正常的情况。ipv4，ipv6，dns
* `-retry-interval`：上述，重试间隔，默认30s
* `-retry-max`：重试次数，默认0，无限次重试
* `-join-wan`， `-retry-join-wan`， `-retry-interval-wan`， `-retry-max-wan`
* `-node`：节点名称，默认主机名
* `-node-id`：节点ID，
* `-pid-file`：consul 存储 pid 的文件位置，用于主动发信号。如停止节点，重载配置等。
* `-protocol`：使用的协议，升级时使用。consul -v查看协议版本
* `-raft-protocol`：使用raft协议版本，默认3
* `-raft-snapshot-threshold`：raft执行快照，提交次数阈值。一般不需要设置，io密集型应用可以调高。避免所有的节点同一时间快照。此值过大，会造成相应日志文件变大，节点重启恢复会耗费更长时间。1.1.0后，默认1- 6384，之前8192.
* `-raft-snapshot-interval`：执行快照间隔，影响类似上个配置，1.1.0后默认30s，之前5s。
* `-rejoin`：节点会尝试重新加入集群。
* `-server`：服务端节点模式。
* `-server-port`：服务端RPC端口，v1.2.2后提供。
* `-non-voting-server`：服务节点不参与选举，接受日志复制，用于横向扩展，服务查询请求。（类比zookeeper 观察者节点）
* `-syslog`：linux OSX系统，配置日志输出到系统日志。
* `-ui`：内置web ui界面。
* `-ui-dir`：web ui 资源文件夹，使用此配置，则不需也不能使用再-ui配置-

### Consul 中默认的端口号
1. 服务器RPC（默认**8300**）：由服务器用来处理来自其他代理的传入请求，仅限TCP。 
2. Serf LAN（默认**8301**）：用来处理局域网中的八卦。所有代理都需要，TCP和UDP。 
3. Serf WAN（默认**8302**）：被服务器用来在WAN上闲聊到其他服务器，TCP和UDP。从Consul 0.8开始，建议通过端口8302在LAN接口上为TCP和UDP启用服务器之间的连接，以及WAN加入泛滥功能。 
4. HTTP API（默认**8500**）：被客户用来与HTTP API交谈，仅限TCP。 
5. DNS接口（默认**8600**）：用于解析DNS查询，TCP和UDP。
