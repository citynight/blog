---
title: "About Technical Support Thoughts"
description: "最近在做售后技术支持方面的工作比较多，对于售后工作有了一些不同于研发的思考，所以想记录下来。"
pubDate: "2024-05-23 20:30:00"
category: "life"
banner: "@images/banners/mountain.jpg"
tags: ["工作"]
selected: false
---

最近做售后技术支持方面的工作比较多，对于售后工作有了一些不同于研发的思考，所以想记录下来。 

## 解决问题，而不是好看
用户关注能不能快速解决自己的问题，而不是界面的好看与否
我们的登录页面做的非常漂亮，背景是一个mp4的视频循环播放。每次更新后用户就反馈系统打开的太慢了，要投诉。

我们有2个类似的系统，一个系统使用Vue3 + Vite开发比上一个Vue2的项目不管是打开速度还是操作体验都有非常明显的提升，Vue2项目功能更全，但是目前只做维护了，很少添加新功能。由于销售团队的不同，Vue2的项目用户更多而且反馈良好，目前基本不需要技术支持。Vue3项目比较新，基本功能和Vue2基本一致但是使用的用户比较少。收集用户要求的时候发现功能都存在但是用户不会去点击按钮。

## 不要相信用户反馈，而是看数据
我经常遇到用户说没有错误提示，可就是有问题。结果我查看用户的操作信息发现是有报错的，但是客户经常反馈没有错误提示，就是无法继续。我一开始相信用户的话开始排查`webrtc`的链接，排查网络是否正常链接，排查用户状态。结果都没有问题，最后我让用户重新操作下，我看下用户的操作发现报错了但是用户无视了错误信息。排查错误在没有日志的情况下要看客户的实际操作而不是听客户的描述。描述都是主管机关的，并且客户说的时候是带有自己的情绪的无法准确描述。需要带着客户重新操作下看下问题所在。

## 经历真实的商战
刚刚听说我们的客户在扒我们的系统，照抄我们系统的功能。这个客户在我们公司内部评价还是非常不错的，体验我们公司的系统后就立即付费开始使用。但是没想到竟然是这样的，我们耐心回答客户的问题没想到居然被客户用去做他们自己的系统。感觉客户是购买了几个月的体验券然后熟悉功能后自己照搬做一套，而且很难维权，毕竟客户重写的和我们肯定有区别，哎太难了。
