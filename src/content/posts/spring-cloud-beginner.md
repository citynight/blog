---
title: "Spring Cloud 初学者"
description: "从头开始学 SpringCloud"
pubDate: "2024-06-05 17:04:00"
category: "spring"
banner: "@images/banners/mountain-2.jpg"
tags: ["spring", "java"]
selected: false
---
# Maven 父工程
## 确认 IDEA 配置
1. 字符编码
![File Encoding](https://github.com/citynight/blog-image/assets/7713239/ab0e69f3-04aa-4a23-a44a-ed2ccb81c6b9)
2. 注解生效激活
![Annotation Processors](https://github.com/citynight/blog-image/assets/7713239/bd4aeaf7-da13-4604-b787-aa4e183deff3)
3. 设置 Java 编译版本17 
![Java Version](https://private-user-images.githubusercontent.com/7713239/336771055-79822ed9-f1b9-415b-a282-e4af1e7e888d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTc1NzkxMTgsIm5iZiI6MTcxNzU3ODgxOCwicGF0aCI6Ii83NzEzMjM5LzMzNjc3MTA1NS03OTgyMmVkOS1mMWI5LTQxNWItYTI4Mi1lNGFmMWU3ZTg4OGQucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI0MDYwNSUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDA2MDVUMDkxMzM4WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9YTYzNmRlODJlMTU1MGNjZmI5YWQ4YzA4MjJjNDE5MjdiMDU2MDlkZTdkYWE2ZTQwMzFlMGM2YjE0NjlmMzhkMiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmYWN0b3JfaWQ9MCZrZXlfaWQ9MCZyZXBvX2lkPTAifQ.Seesldjhd_a4iu7VDokXRsBMV4VdB37tLbKzBJ8lzTM)
4. 文件过滤
![File Types](https://github.com/citynight/blog-image/assets/7713239/067b3177-e6ab-4d0c-82f5-a9885b8b93c3)

## Maven 中的 dependencyManagement 和 dependencies
配置后的父工程 pom 文件如下图，从第 11 行开始，是直接配置的，具体配置如下：
![pom](https://github.com/citynight/blog-image/assets/7713239/f0323bb6-e936-4b6a-8be7-86741f80dfee)

```xml
    <packaging>pom</packaging>

    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <hutool.version>5.8.22</hutool.version>
        <lombok.version>1.18.30</lombok.version>
        <druid.version>1.1.20</druid.version>
        <mybatis.springboot.version>3.0.2</mybatis.springboot.version>
        <mysql.version>8.0.11</mysql.version>
        <swagger3.version>2.2.0</swagger3.version>
        <mapper.version>4.2.3</mapper.version>
        <fastjson2.version>2.0.40</fastjson2.version>
        <persistence-api.version>1.0.2</persistence-api.version>
        <spring.boot.test.version>3.1.5</spring.boot.test.version>
        <spring.boot.version>3.2.0</spring.boot.version>
        <spring.cloud.version>2023.0.0</spring.cloud.version>
        <spring.cloud.alibaba.version>2022.0.0.0</spring.cloud.alibaba.version>

    </properties>

    <dependencyManagement>
        <dependencies>
            <!-- springboot 3.2.0 -->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-parent</artifactId>
                <version>${spring.boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- springcloud 2023.0.0 -->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring.cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- springcloud alibaba 2022.0.0.0 -->
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>${spring.cloud.alibaba.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>

            <!--     DAO        -->
            <!-- springboot 集成 mybatis -->
            <dependency>
                <groupId>org.mybatis.spring.boot</groupId>
                <artifactId>mybatis-spring-boot-starter</artifactId>
                <version>${mybatis.springboot.version}</version>
            </dependency>
            <!-- mysql 数据库驱动-->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>${mysql.version}</version>
            </dependency>
            <!-- springboot 集成 druid 连接池 -->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid-spring-boot-starter</artifactId>
                <version>${druid.version}</version>
            </dependency>
            <!-- 通用mapper4之tk.mybatis -->
            <dependency>
                <groupId>tk.mybatis</groupId>
                <artifactId>mapper</artifactId>
                <version>${mapper.version}</version>
            </dependency>
            <!-- persistence-->
            <dependency>
                <groupId>javax.persistence</groupId>
                <artifactId>persistence-api</artifactId>
                <version>${persistence-api.version}</version>
            </dependency>

            <!-- fastjson2-->
            <dependency>
                <groupId>com.alibaba.fastjson2</groupId>
                <artifactId>fastjson2</artifactId>
                <version>${fastjson2.version}</version>
            </dependency>
            <!-- swagger3 地址:http://{IP}:5555/swagger-ui/index.html -->
            <dependency>
                <groupId>org.springdoc</groupId>
                <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
                <version>${swagger3.version}</version>
            </dependency>
            <!-- hutool -->
            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-all</artifactId>
                <version>${hutool.version}</version>
            </dependency>
            <!-- lombok -->
            <dependency>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
                <optional>true</optional>
            </dependency>
            <!-- spring-boot-starter-test-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-test</artifactId>
                <version>${spring.boot.test.version}</version>
                <scope>test</scope>
            </dependency>

        </dependencies>
    </dependencyManagement>
```


### Maven 中的dependencyManagement 和 dependencies
Maven 中使用dependencyManagement 元素来提供了一种管理以来版本号的方式。
**通常会在一个组织或者项目的最顶层的父pom文件中看到 dependencyManagement 元素。**

使用 pom.xml 中的 dependencyManagement 元素能让所有在子项目引用一个依赖而不用显示的列出版本号。
Maven 会沿着父子层次向上走，直到找到一个拥有 dependencyManagement 元素的项目，然后它就会使用这个 dependencyManagement 元素中指定的版本号。

举个🌰，在父项目中
```xml
    <dependencyManagement>
        <dependencies>
            <!-- mysql 数据库驱动-->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.2</version>
            </dependency>
        </dependencies>
</dependencyManagement>
```
让后在子项目中就可以添加 mysql-connector-java 依赖，而不用显示的指定版本号。例如：
```xml
<dependencies>
    <!-- mysql 数据库驱动-->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
</dependencies>
```
这样做的好处是，如果多个子项目都引用了 mysql-connector-java 依赖，那么只需要在父项目中配置一次版本号，就可以让所有的子项目都引用同一个版本号。
1. 这样当想升级或者切换到另一个版本时，只需要在父项目中升级或切换版本号就可以了，而不需要在每个子项目中一个一个的升级或切换版本号。
2. 另外如果某个子项目需要另外一个版本号，那么只需要在子项目中声明对应的 version 即可。

> 注意：
> 1. dependencyManagement 元素中只是声明依赖，**并不引入实现**，也就是说，子项目不会继承父项目中的依赖需要显示的声明需要用的依赖。
> 2. 如果不在子项目中声明依赖，那么子项目将不会继承父项目中的依赖。只有在子项目中写了该依赖并且没有指定具体的版本号时，才会 从父项目中继承该依赖且 version 和 scope 都取自父 pom。
> 3. 如果子项目中指定了版本号，那么会使用子项目中指定的 jar 版本。

## Maven 中跳过单元测试
方法1：
![Skip Tests](https://github.com/citynight/blog-image/assets/7713239/2e47151b-97bc-4168-92f0-21888b23928f)

方法2：配置
```xml
    <build>
        <plugins>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <configuration>
                    <skip>true</skip>
            </configuration>
        </plugins>
    </build>
```
推荐方式 1。直接点击跳过

## MySql 数据库连接池配置
1. 引入依赖
```properties
# mysql 8.0 --- JDBC 四件套
jdbc.driverClassName=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring_cloud_beginner?characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8&rewriteBatchedStatements=true&allowPublicKeyRetrieval=true
jdbc.username=root
jdbc.password=123456
```
```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.11</version>
</dependency>
```
