---
title: "Vue面试题"
description: "高频 Vue 面试题"
pubDate: "2025-02-20 12:30:00"
category: "vue"
banner: "@images/banners/why-okr.jpeg"
tags: ["Vue"]
selected: true
---

## Vue 生命周期
1. 创建阶段
- beforeCreate: 组件实例刚被创建，数据观测 (data)、事件配置 (methods) 尚未初始化。
用途：常用于插件初始化（如 Vuex 的注入）。
- created:实例已完成数据观测、属性和方法的初始化，但 DOM 未生成。
用途：发起异步请求、初始化非 DOM 数据。
2. 挂载阶段
- beforeMount:模板编译完成，但尚未将虚拟 DOM 渲染到真实 DOM。
注意：此时无法操作 DOM。
- mounted:虚拟 DOM 已挂载到真实 DOM，可访问 this.$el。
用途：操作 DOM、集成第三方库（如图表插件）。
3. 更新阶段
- beforeUpdate: 数据变化后、DOM 重新渲染前触发。
用途：获取更新前的 DOM 状态。
- updated:DOM 已重新渲染完成。
注意：避免在此阶段修改数据，可能导致死循环。
4. 销毁阶段
- beforeDestroy:实例销毁前触发，实例仍可用。
用途：清理定时器、解绑全局事件。
- destroyed:实例已销毁，所有绑定和监听被移除。
注意：无法再操作实例的属性和方法。

5. 附加钩子（Vue 2.x 特有）
- activated
- deactivated
用于 <keep-alive> 缓存的组件，切换显示状态时触发。
用途：恢复或保存组件状态（如滚动位置）。
6. 错误处理
- errorCaptured: 捕获组件渲染过程中发生的错误。
用途：处理渲染错误，返回 false 可阻止错误继续传播。
注意：仅捕获渲染错误，无法捕获生命周期钩子或事件处理函数中的错误。

### Vue 3 变化
使用 `setup()` 替代 `beforeCreate` 和 `created`。
钩子名改为 `onBeforeMount`、`onMounted` 等组合式 API 形式。
新增 `onRenderTracked` 和 `onRenderTriggered` 用于调试渲染依赖。

### 常见问题
- 数据请求放在哪里？
created（更快触发）或 mounted（需 DOM 时）。
- 操作 DOM 的时机？
必须在 mounted 之后（如 nextTick 中）。
- 销毁时需要做什么？
在 beforeDestroy 中移除事件监听、取消网络请求。

## HTML CSS JS
DOM VDOM 浏览器机制？

re-render setState 

VDOM
