---
title: "Chrome Devtools调试技巧"
description: "Chrome DevTools 是开发者用于调试 Web 应用程序、分析性能、检查元素和网络请求的重要工具。无论是前端开发人员还是后端工程师，熟练掌握 Chrome DevTools 都能显著提高开发效率和调试精度。通过 DevTools，我们可以快速识别并解决性能瓶颈、修复 bug、优化用户体验"
pubDate: "2025-02-15 20:22:00"
category: "dev"
banner: "@images/banners/gpt.jpg"
banner2: "@images/banners/gpt-2.jpg"
tags: ["前端", "调试"]
selected: false
---

Chrome DevTools 是开发者用于调试 Web 应用程序、分析性能、检查元素和网络请求的重要工具。无论是前端开发人员还是后端工程师，熟练掌握 Chrome DevTools 都能显著提高开发效率和调试精度。通过 DevTools，我们可以快速识别并解决性能瓶颈、修复 bug、优化用户体验

Chrome DevTools 提供了多种强大的功能，包括但不限于：元素检查、网络调试、JavaScript 调试、性能分析、内存泄漏检测、日志查看等。通过这些功能，开发者可以实时查看页面结构、调试脚本、分析请求响应、监控应用状态，甚至在浏览器端进行模拟测试

注意

本文只从JavaScript断点角度进行调试，其他方面如请求、性能、内存会以新的文章方式分享

## 断点技巧 [​](#断点技巧)

Chrome DevTools 提供了强大的断点调试功能，帮助开发者逐步执行代码，检查变量、查看调用堆栈，并实时观察代码的执行情况。以下是一些常用的 Chrome DevTools 断点调试技巧，帮助你更高效地定位问题

### 基本断点 [​](#基本断点)

通常开发时大家都喜欢`console.log`打印东西来看一些预期结果，你也可以通过在需要console的地方加上`debugger`来断住js，当执行到这里时，不仅可以看到你想要的信息，还可以看到当前作用域、变量、调用栈等一些信息，这样看起来更直观也更方便



```js
// 假如有下面一段代码
button.addEventListener('click', clickCB);
function clickCB(e) {
  debugger;
  console.log(e);
}
```
![005HV6Avgy1h70ddh034nj30y00yu1cn.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70ddh034nj30y00yu1cn.jpg.jpeg)

![005HV6Avgy1h70ddm7lcqj30yc0bwq9i.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70ddm7lcqj30yc0bwq9i.jpg.jpeg)

### 条件断点 [​](#条件断点)

同样这里也是先在源码中指定位置debugger，或者如果你的源码并没有采取打包，源码好找的情况下可以直接在浏览器中找到对应的js文件直接打个条件注释断点就行



```js
// 假如有下面一段代码 (当x<=0，断住)
const add = (x, y) => {
  x = 2 * x;
  return x + y;
}
```

![005HV6Avgy1h70ddthaabj30qw0e2427.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70ddthaabj30qw0e2427.jpg.jpeg)

![005HV6Avgy1h70ddzfrv7j30r40fiq63.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70ddzfrv7j30r40fiq63.jpg.jpeg)

![005HV6Avgy1h70de9swgij30r00f0dj2.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70de9swgij30r00f0dj2.jpg.jpeg)

### DOM断点 [​](#dom断点)

![005HV6Avgy1h70dee3faij30uw0vk17p.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dee3faij30uw0vk17p.jpg.jpeg)

DOM断点只能在浏览器中调试，有三种：

+   subtree modifications
+   attribute modifications
+   node removal

> 以上三种断点，也可用`MutationObserver`API来代替，方便配置使用灵活，[官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)


```html
// 假如下面一段代码，当点击不同的按钮对ul进行增删改查，修改自身属性
<div class="domDebugger">
      <button>增加节点</button>
      <button>删除节点</button>
      <button>删除自己</button>
      <button>更新子节点</button>
      <button>更新子节点属性</button>
      <button>更新当前元素属性</button>
</div>
<ul class="list">
  <li>1</li>
  <li>2</li>
</ul>

<script>
  const dbtns = document.querySelectorAll('.domDebugger button');
  const list = document.querySelector('.list');
  dbtns[0].addEventListener('click', () => {
          const li = document.createElement('li');
          li.innerText = '新增的节点';
          list.appendChild(li);
  });
  dbtns[1].addEventListener('click', () => {
          list.removeChild(list.lastElementChild);
  });
  dbtns[2].addEventListener('click', () => {
          list.remove();
  });
  dbtns[3].addEventListener('click', () => {
          const li = document.createElement('li');
          li.innerText = '更新的节点';
          list.replaceChild(li, list.lastElementChild);
  });
  dbtns[4].addEventListener('click', () => {
          list.lastElementChild.setAttribute('class', 'li-class');
  });
  dbtns[5].addEventListener('click', () => {
          list.setAttribute('class', 'newclass');
  });
</script>
```

+   subtree modifications

节点监听: ![005HV6Avgy1h70delr5ftj30xc0iwwni.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70delr5ftj30xc0iwwni.jpg.jpeg)

当监听子节点变化时，只有当子节点(node)发生变化时，才会监听的到，如：`子节点替换`、`子节点删除`、`子节点增加`、`子节点的字节点变化(像：文本节点、注释节点、元素节点等等都会监听的到)`，但是节点的属性发生变化不会监听到

![005HV6Avgy1h70des5fqlj30po05441h.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70des5fqlj30po05441h.jpg.jpeg)

当点击上面的删除节点时就会被监听到，如上图；而当点击更新子节点属性或者当前元素属性时反而监听不到的

+   attribute modifications

属性监听:

![005HV6Avgy1h70dex8uq1j30xs0hetga.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dex8uq1j30xs0hetga.jpg.jpeg)

监听当前元素属性发生变化时，而子节点属性变化监听不到;(想监听子节点的属性变化或者或者节点变化可以用开头提到的`MutatorObserver`API)

当点击更新当前元素属性时如下图所示，点击更新子节点属性不会监听到

![005HV6Avgy1h70df1ndgtj30qq07i426.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70df1ndgtj30qq07i426.jpg.jpeg)

+   node removal

![005HV6Avgy1h70df7nhfuj30g006g3zn.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70df7nhfuj30g006g3zn.jpg.jpeg) 
这个只监听当前元素被删除，子几点的改变不会监听到，比较单一

当点击删除自己就会监听到

![005HV6Avgy1h70dfcm963j30qo04k40o.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dfcm963j30qo04k40o.jpg.jpeg)

> 除了单独监听外，还可以同时监听三种类型，只要勾选上就行；除了这种调试，也可以通过前面提到的`MutatorObserver`API来调试

### URL断点 [​](#url断点)

添加对XHR的请求url的断点，当浏览器发起http请求时，如果`断点的url包含请求url`，就会打住断点

```js
// 假如下面代码，点击按钮发起请求
const fetchApi = async () => {
  try {
    const rs = await fetch("http://localhost:3001/xxxx")
    const data = await rs.json()
    console.log(data)
  } catch(err) {
    console.log(err)
  }
}
const btn = document.querySelector('#btn');
btn.addEventListener('click', fetchApi)

// ===== 服务代码 =====
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.json({
    code: 200,
    message: 'Hello World',
  })
})
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
```

以上请求`http://localhost:3001`服务，现在我们在浏览器中添加对应的断点

![005HV6Avgy1h70dfizqknj30r60es0y3.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dfizqknj30r60es0y3.jpg.jpeg)

![005HV6Avgy1h70dforazej317o0syqil.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dforazej317o0syqil.jpg.jpeg)

### 事件监听断点 [​](#事件监听断点)

监听对应的事件当触发时就会打住断点，如：点击、鼠标、键盘事件等等

```js
// 假如给一个元素绑定click、mouseover事件
// <div id="box" />
const target = document.querySelector("#box")
target.addEventListener("click", () => console.log('click...'))
target.addEventListener("mouseover", () => console.log('mouseover...'))
```

在浏览器上打上对应的断点

![005HV6Avgy1h70dfw3slwj30o00w6wkj.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dfw3slwj30o00w6wkj.jpg.jpeg)

![005HV6Avgy1h70dg1ngtkj317a0pqh1j.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dg1ngtkj317a0pqh1j.jpg.jpeg)

![005HV6Avgy1h70dg6kpj1j31760medu8.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dg6kpj1j31760medu8.jpg.jpeg)

### 异常断点 [​](#异常断点)

异常断点可以在vscode中设置，如果抛出异常就会打住断点 添加vscode调试配置:

```json
{
  "name": "Debugger Exception",
  "request": "launch",
  "type": "chrome",
  "url": "http://localhost:5500",
  "webRoot": "${workspaceFolder}/trandition"
}
```

在程序中直接抛出错误：

```js
throw new Error('This is a test error');
```

![005HV6Avgy1h70dgcww3tj31920jeqib.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dgcww3tj31920jeqib.jpg.jpeg)

## 调试React [​](#调试react)

React项目，用react-create-app启动项目，然后添加.vscode配置，点击debugger，在vscode中打个断点，就可以在vscode中调试代码了

```json
{
  "name": "React",
  "request": "launch",
  "type": "chrome",
  "url": "http://localhost:3000",
  "webRoot": "${workspaceFolder}"
}
```

当点击对应的程序后打住断点：

![005HV6Avgy1h70dgn6qi9j31xk18s1kx.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dgn6qi9j31xk18s1kx.jpg.jpeg)

## 调试Vue [​](#调试vue)

目前用vite或者webpack生成的vue项目目前这样的都可以这样调试，以前的wepack要用sourcemap进行映射

```json
{
  "name": "VueCli",
  "request": "launch",
  "type": "chrome",
  "url": "http://localhost:8080",
  "webRoot": "${workspaceFolder}",
  // 映射sourcemap
  "sourceMapPathOverrides": {
    // "webpack://?:*/*": "${workspaceFolder}/*"
  }
}
```

和React一样运行到对应的代码后打住断点

![005HV6Avgy1h70dguvau8j31xk18s4n6.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dguvau8j31xk18s4n6.jpg.jpeg)

## Override调试 [​](#override调试)

可能有一种调试需要在线上环境下直接调试代码，对于简单的调试直接使用debugger即可，有时候需要改代码啥的，可能直接用debugger可能会变得有点麻烦，要是可以将线上运行的代码代理到本地，就可以在本地调试代码了，`Chrome Override DevTools`就是干这个的

> 此方式不能代理XHR请求

首先打开`Source`面板，选择`Overrides`，然后点击`Select Folder for overrides`按钮，会打开本地文件系统让你选择一个文件夹，用来保存后面调试的代码（这里最好新建一个空文件夹）

![005HV6Avgy1h70dh1g764j30p60aijt5.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dh1g764j30p60aijt5.jpg.jpeg)
![005HV6Avgy1h70dh92scaj30rs0i2q63.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dh92scaj30rs0i2q63.jpg.jpeg)

选择完后Chrome会提示访问权限，点击允许，此时`network`面板会出现一个黄色三角形，则证明Override第一步成功了

![005HV6Avgy1h70dhhcwgdj31n00f4dlc.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dhhcwgdj31n00f4dlc.jpg.jpeg)

现在比如我们想调试一个`index.js`文件，点击netword面板，右击想要调试的文件，选择`Save for overrides`，此时当前文件就会被保存到目标文件夹里了

![005HV6Avgy1h70dhmupqzj310m0mwwrd.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dhmupqzj310m0mwwrd.jpg.jpeg)
![005HV6Avgy1h70dhr8sbzj30ww0fejyo.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dhr8sbzj30ww0fejyo.jpg.jpeg)

现在可以用编辑器打开目标文件夹，进行修改，修改会同步保存到浏览器，而且刷新浏览器也同样会被代理到本地文件夹哦，如下：文件开头添加debugger

![005HV6Avgy1h70dhyc4xcj31da0rwqjl.jpg](https://2a2f5e3.webp.li/2025/02/005HV6Avgy1h70dhyc4xcj31da0rwqjl.jpg.jpeg)

## 最后 [​](#最后)

Chrome Devtools的强大之处仍不止这些，敬请关注后面的文章
可前往 [阅读原文](https://blog.usword.cn/frontend/debug-skill/chrome.html)
