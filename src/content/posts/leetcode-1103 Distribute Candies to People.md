---
title: "1103. Distribute Candies to People"
description: "LeetCode 1103 Distribute Candies to People"
pubDate: "2024-05-25 21:35:00"
category: "algorithm"
banner: "@images/banners/mountain-2.jpg"
tags: ["leetcode"]
selected: false
---

题目描述：
排排坐，分糖果。

我们买了一些糖果 candies，打算把它们分给排好队的 n = num_people 个小朋友。

给第一个小朋友 1 颗糖果，第二个小朋友 2 颗，依此类推，直到给最后一个小朋友 n 颗糖果。

然后，我们再回到队伍的起点，给第一个小朋友 n + 1 颗糖果，第二个小朋友 n + 2 颗，依此类推，直到给最后一个小朋友 2 * n 颗糖果。

重复上述过程（每次都比上一次多给出一颗糖果，当到达队伍终点后再次从队伍起点开始），直到我们分完所有的糖果。注意，就算我们手中的剩下糖果数不够（不比前一次发出的糖果多），这些糖果也会全部发给当前的小朋友。

返回一个长度为 num_people、元素之和为 candies 的数组，以表示糖果的最终分发情况（即 ans[i] 表示第 i 个小朋友分到的糖果数）。

> 暴力解法
> 遍历数组，只要有糖果就一直分直到分完为止。每次分的都是当前糖果和 n+1 中的最小值。

```java
class Solution {
    public int[] distributeCandies(int candies, int num_people) {
        int[] ans = new int[num_people];
        int i = 0;
        while (candies != 0) {
            int min = Math.min(candies, i + 1);
            ans[i % num_people] += min;
            candies -= min;
            i += 1;
        }
        return ans;
    }
}
```
