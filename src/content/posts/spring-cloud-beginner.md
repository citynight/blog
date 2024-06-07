---
title: "Spring Cloud 初学者"
description: "从头开始学 SpringCloud"
pubDate: "2024-06-05 17:04:00"
category: "spring"
banner: "@images/banners/spring.png"
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
![Java Version](https://github.com/citynight/blog-image/assets/7713239/79822ed9-f1b9-415b-a282-e4af1e7e888d)
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
# Mapper4 一键生成
## mybatis-generator
官网地址：https://mybatis.org/generator/

## MyBatis 通用 Mapper4
MyBatis 通用 Mapper4 是一个 MyBatis 的扩展，它提供了一套简单的、通用的、基于注解的 Mapper 接口定义，简化了 Mapper 的开发，并提高了开发效率。
github地址：https://github.com/abel533/Mapper

建表
![t_pay](https://github.com/citynight/blog-image/assets/7713239/15827e9e-4a6d-41e5-9a4d-83e21bed9c8c)
```sql
create table t_pay
(
    id          int unsigned auto_increment
        primary key,
    pay_no      varchar(50)                                not null comment '支付流水号',
    order_no    varchar(50)                                not null comment '订单流水号',
    user_id     int              default 1                 null comment '用户账号ID',
    amount      decimal(8, 2)    default 9.90              not null comment '交易金额',
    deleted     tinyint unsigned default '0'               not null comment '删除标志, 默认0不删除,1删除',
    create_time timestamp        default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time timestamp        default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP comment '更新时间'
)
    comment '支付交易表';

INSERT INTO `spring-cloud-study`.t_pay (id, pay_no, order_no, user_id, amount, deleted, create_time, update_time) VALUES (1, 'pay202403121420', '202403121421', 1, 9.90, 0, '2024-03-12 14:23:55', '2024-03-12 19:05:02');
INSERT INTO `spring-cloud-study`.t_pay (id, pay_no, order_no, user_id, amount, deleted, create_time, update_time) VALUES (2, 'pay202403122048', '202403122048', 1, 9.90, 0, '2024-03-12 20:58:37', '2024-03-12 21:05:02');
INSERT INTO `spring-cloud-study`.t_pay (id, pay_no, order_no, user_id, amount, deleted, create_time, update_time) VALUES (3, 'pay202403130910', '202403130910', 0, 0.00, 0, '2024-03-12 21:52:33', '2024-03-13 09:10:27');
INSERT INTO `spring-cloud-study`.t_pay (id, pay_no, order_no, user_id, amount, deleted, create_time, update_time) VALUES (5, 'pay2024031220499', '20240312204799', 1, 9.90, 0, '2024-03-13 09:43:45', '2024-03-13 09:43:45');
INSERT INTO `spring-cloud-study`.t_pay (id, pay_no, order_no, user_id, amount, deleted, create_time, update_time) VALUES (6, 'feign2024031220499', 'feign2024031220499', 1, 9.90, 0, '2024-03-14 22:53:59', '2024-03-14 22:53:59');
```
创建 `mybatis-generator` module 模块，添加依赖：
![pom.xml](https://github.com/citynight/blog-image/assets/7713239/8f14054a-fe61-469d-a09c-d7b26f68356e)
```xml
    <dependencies>

        <!-- 通用的mybatis在tk单独使用, 所以生成工具有自己的单独的版本号 -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.13</version>
        </dependency>
        <!-- generator -->
        <dependency>
            <groupId>org.mybatis.generator</groupId>
            <artifactId>mybatis-generator-core</artifactId>
            <version>1.4.2</version>
        </dependency>
        <!-- 通用 mapper -->
        <dependency>
            <groupId>tk.mybatis</groupId>
            <artifactId>mapper</artifactId>
        </dependency>
        <!-- mysql8驱动 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
        <!-- persistence -->
        <dependency>
            <groupId>javax.persistence</groupId>
            <artifactId>persistence-api</artifactId>
        </dependency>
        <dependency>
            <!-- hutool -->
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>
        <!-- lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <!-- spring-boot-starter-test-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.iunit,vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
    <build>
        <resources>
            <resource>
                <directory>${basedir}/src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
            <resource>
                <directory>${basedir}/src/main/resources</directory>
            </resource>
        </resources>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.4.2</version>
                <configuration>
                    <configurationFile>${basedir}/src/main/resources/generatorConfig.xml</configurationFile>
                    <overwrite>true</overwrite>
                    <verbose>true</verbose>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>mysql</groupId>
                        <artifactId>mysql-connector-java</artifactId>
                        <version>8.0.33</version>
                    </dependency>
                    <dependency>
                        <groupId>tk.mybatis</groupId>
                        <artifactId>mapper</artifactId>
                        <version>4.2.3</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
```

在 main 下创建 resources 目录，添加 config.properties 配置文件和 generatorConfig.xml 配置文件。

其中 config.properties 配置文件：
```properties
# t_pay 表包名
package.name=cn.citynight.cloud

# mysql 8.0 spring-cloud-study
jdbc.driverClass=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/spring-cloud-study?characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8&rewriteBatchedStatements=true&allowPublicKeyRetrieval=true
jdbc.user=root
jdbc.password=123456

```

generatorConfig.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>

    <properties resource="config.properties"/>

    <context id="Mysql" targetRuntime="MyBatis3Simple" defaultModelType="flat">

        <property name="beginningDelimiter" value="`"/>
        <property name="endingDelimiter" value="`"/>

        <plugin type="tk.mybatis.mapper.generator.MapperPlugin">
            <property name="mappers" value="tk.mybatis.mapper.common.Mapper"/>
            <property name="caseSensitive" value="true"/>
        </plugin>

        <jdbcConnection driverClass="${jdbc.driverClass}"
                        connectionURL="${jdbc.url}"
                        userId="${jdbc.user}"
                        password="${jdbc.password}">
        </jdbcConnection>

        <javaModelGenerator targetPackage="${package.name}.entities" targetProject="src/main/java"/>
        <sqlMapGenerator targetPackage="${package.name}.mapper" targetProject="src/main/java"/>
        <javaClientGenerator targetPackage="${package.name}.mapper" targetProject="src/main/java" type="XMLMAPPER"/>

        <table tableName="t_pay" domainObjectName="Pay">
            <generatedKey column="id" sqlStatement="JDBC"/>
        </table>
        
    </context>
</generatorConfiguration>

```
所有配置都设置好后，运行 mvn mybatis-generator:generate 生成实体类和 mapper。
![generate](https://github.com/citynight/blog-image/assets/7713239/f8c68740-f33e-403f-ad9d-0f7ed7356b70)
生成后的结果：
![entities and mapper](https://github.com/citynight/blog-image/assets/7713239/1d183057-32e7-415c-a6b7-d44c9a9f8f11)

# 微服务
微服务小口诀：
1. 建 module
2. 改 pom
3. 写 YML
4. 主启动
5. 业务类

步骤
1. 建 module
    建普通 Maven 模块 ![cloud-provider-payment](https://github.com/citynight/blog-image/assets/7713239/2d2a675c-5e1d-4ec9-a4ac-67b0312f13ea)
2. 改 pom
```xml

    <dependencies>
        <!-- SpringBoot 通用依赖模块 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- SpringBoot 集成 druid 连接池依赖 -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
        </dependency>

        <!-- Swagger3 调用方式 http://localhost:5555/swagger-ui/index.html -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        </dependency>

        <!-- SpringBoot 集成 MyBatis -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
        </dependency>

        <!-- Mysql 数据库驱动 -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>

        <!-- persistence -->
        <dependency>
            <groupId>javax.persistence</groupId>
            <artifactId>persistence-api</artifactId>
        </dependency>

        <!-- 通用 Mapper4 -->
        <dependency>
            <groupId>tk.mybatis</groupId>
            <artifactId>mapper</artifactId>
        </dependency>

        <!-- hutool -->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>

        <!-- fastjson2 -->
        <dependency>
            <groupId>com.alibaba.fastjson2</groupId>
            <artifactId>fastjson2</artifactId>
        </dependency>

        <!-- lombok-->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <scope>provided</scope>
            <version>1.18.30</version>
        </dependency>
        <!-- SpringBoot 测试依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```
3. 写 YML
```yml
server:
  port: 8001

spring:
  application:
    name: cloud-payment-service
  datasource:
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/spring-cloud-study?characterEncoding=utf-8&useSSL=false&serverTimezone=GMT%2B8&rewriteBatchedStatements=true&allowPublicKeyRetrieval=true
    username: root
    password:

mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: cn.citynight.cloud.entities
  configuration:
    map-underscore-to-camel-case: true
```

4. 主启动
![main start](https://github.com/citynight/blog-image/assets/7713239/43fcaa31-9396-48f9-83cc-bb1603678e7e)

5. 业务类

把mybatis-generator 生成的 mapper 和 entities 拷贝到 cloud-provider-payment 模块下。如图：
![move](https://github.com/citynight/blog-image/assets/7713239/d5b48830-fa6c-44e4-b07a-9c1742477c56)
然后创建对应对应的 service 和 controller。

service 接口
```java
public interface PayService {
    int add(Pay pay);
    int delete(Integer id);
    int update(Pay pay);
    Pay getById(Integer id);
    List<Pay> getAll();
}

```

service 实现类
```java

@Service
public class PayServiceImpl implements PayService {

    @Resource
    private PayMapper payMapper;

    @Override
    public int add(Pay pay) {
        return payMapper.insertSelective(pay);
    }

    @Override
    public int delete(Integer id) {
        return payMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int update(Pay pay) {
        return payMapper.updateByPrimaryKeySelective(pay);
    }

    @Override
    public Pay getById(Integer id) {
        return payMapper.selectByPrimaryKey(id);
    }

    @Override
    public List<Pay> getAll() {
        return payMapper.selectAll();
    }
}

```

controller 实现
```java

@RestController
@Slf4j
public class PayController {
    @Resource
    private PayService payService;

    @PostMapping("/pay/add")
    public String addPay(@RequestBody Pay pay)
    {
        log.info("addPay:{}", pay);
        int result = payService.add(pay);
        return "成功插入记录，返回值：" + result;
    }

    @DeleteMapping("/pay/del/{id}")
    public String deletePay(@PathVariable("id") Integer id)
    {
        log.info("deletePay:{}", id);
        int result = payService.delete(id);
        return "成功删除记录，返回值：" + result;
    }


    @PutMapping("/pay/update")
    public String updatePay(@RequestBody PayDTO payDTO)
    {
        log.info("updatePay:{}", payDTO);
        Pay pay = new Pay();
        BeanUtils.copyProperties(payDTO, pay);
        log.info("updatePay:{}", pay);
        int result = payService.update(pay);
        return "成功更新记录，返回值：" + result;
    }

    @GetMapping("/pay/get/{id}")
    public Pay getById(@PathVariable("id") Integer id)
    {
        log.info("getById:{}", id);
        Pay pay = payService.getById(id);
        return pay;
    }
}
```


