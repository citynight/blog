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

# 微服务-支付模块
## 步骤
微服务小口诀：
1. 建 module
2. 改 pom
3. 写 YML
4. 主启动
5. 业务类

具体步骤
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
## 接口测试
**postman测试**
![postman](https://github.com/citynight/blog-image/assets/7713239/0bf5a52d-3401-4acd-9dd1-fdc9126aecf3)

**swagger3测试**
常用注解

| 注解           | 标注位置              | 作用               |
|--------------|-------------------|------------------|
| @Tag *       | controller类       | 标识 controller 作用 |
| @Parameter   | 参数                | 标识参数作用           |
| @Parameters  | 参数                | 参数多重说明           |
| @Schema *    | model 层的 JavaBean | 描述模型作用及每个属性      |
| @Operation * | 方法                | 描述方法作用           |
| @ApiResponse | 方法                | 描述响应状态码等         |

> 最常用的是 @Tag 标记 controller 类，@Operation 标记方法。 和 @Schema entity 或者 DTO 。

给 Pay 添加 对应的 swagger 注解
```java

/**
 * 表名：t_pay
 * 表注释：支付交易表
*/
@Table(name = "t_pay")
@Schema(title = "支付交易表实体类")
public class Pay {
    @Id
    @GeneratedValue(generator = "JDBC")
    @Schema(title = "主键ID") 
    private Integer id;

    /**
     * 支付流水号
     */
    @Column(name = "pay_no")
    @Schema(title = "支付流水号")
    private String payNo;

    /**
     * 订单流水号
     */
    @Column(name = "order_no")
    @Schema(title = "订单流水号")
    private String orderNo;

    /**
     * 用户账号ID
     */
    @Column(name = "user_id")
    @Schema(title = "用户账号ID")
    private Integer userId;

    /**
     * 交易金额
     */
    @Schema(title = "交易金额")
    private BigDecimal amount;

    /**
     * 删除标志, 默认0不删除,1删除
     */
    @Schema(title = "删除标志, 默认0不删除,1删除")
    private Byte deleted;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    @Schema(title = "创建时间")
    private Date createTime;

    /**
     * 更新时间
     */
    @Column(name = "update_time")
    @Schema(title = "更新时间")
    private Date updateTime;

    /**
     * @return id
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取支付流水号
     *
     * @return payNo - 支付流水号
     */
    public String getPayNo() {
        return payNo;
    }

    /**
     * 设置支付流水号
     *
     * @param payNo 支付流水号
     */
    public void setPayNo(String payNo) {
        this.payNo = payNo;
    }

    /**
     * 获取订单流水号
     *
     * @return orderNo - 订单流水号
     */
    public String getOrderNo() {
        return orderNo;
    }

    /**
     * 设置订单流水号
     *
     * @param orderNo 订单流水号
     */
    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    /**
     * 获取用户账号ID
     *
     * @return userId - 用户账号ID
     */
    public Integer getUserId() {
        return userId;
    }

    /**
     * 设置用户账号ID
     *
     * @param userId 用户账号ID
     */
    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    /**
     * 获取交易金额
     *
     * @return amount - 交易金额
     */
    public BigDecimal getAmount() {
        return amount;
    }

    /**
     * 设置交易金额
     *
     * @param amount 交易金额
     */
    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    /**
     * 获取删除标志, 默认0不删除,1删除
     *
     * @return deleted - 删除标志, 默认0不删除,1删除
     */
    public Byte getDeleted() {
        return deleted;
    }

    /**
     * 设置删除标志, 默认0不删除,1删除
     *
     * @param deleted 删除标志, 默认0不删除,1删除
     */
    public void setDeleted(Byte deleted) {
        this.deleted = deleted;
    }

    /**
     * 获取创建时间
     *
     * @return createTime - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    /**
     * 获取更新时间
     *
     * @return updateTime - 更新时间
     */
    public Date getUpdateTime() {
        return updateTime;
    }

    /**
     * 设置更新时间
     *
     * @param updateTime 更新时间
     */
    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}
```
添加 swagger config
```java

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Swagger3Config {

    @Bean
    public GroupedOpenApi payApi() {
        return GroupedOpenApi.builder().group("支付微服务模块").pathsToMatch("/pay/**").build();
    }

    @Bean
    public GroupedOpenApi otherApi() {
        return GroupedOpenApi.builder().group("其他微服务模块").pathsToMatch("/other/**").build();
    }

    @Bean
    public OpenAPI docsOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("spring-cloud")
                        .description("通用设计")
                        .version("v1.0")
                )
                .externalDocs(new ExternalDocumentation()
                        .description("www.citynight.cn")
                        .url("https://1m.fit")
                );
    }
}
```
重启服务然后访问 http://localhost:8001/swagger-ui/index.html
![swagger-ui](https://github.com/citynight/blog-image/assets/7713239/b32c0aeb-c86b-4511-9f50-eea7653e5fbf)

尝试使用 swagger 测试
![](https://github.com/citynight/blog-image/assets/7713239/7ea32cb8-8be3-4a6c-8d18-a3d90c2ef75e)
![](https://github.com/citynight/blog-image/assets/7713239/33b7c2b1-e3c6-4208-9e89-2050979afe9f)


## 解决项目中的问题
### 时间格式问题
有两种方式可以解决时间格式问题
1. 在实体类中添加 @JsonFormat 注解

```java
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;
```
2. 在配置文件中添加如下配置
```xml
spring:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
```

推荐使用注解。

### 统一返回值
**思路**
定义返回标准格式,如下
1. code 状态值：由后端统一定义各种返回结果的状态码
2. message 状态描述：本次接口调用返回结果的状态描述
3. data 返回数据：本次接口调用返回的数据
4. 扩展字段：接口调用时间之类，比如 timestamp

**步骤**
1. 新建枚举类 `ReturnCodeEnum`
HTTP 请求返回的状态码

| 分类  | 区间      | 分类描述                   |
|-----|---------|------------------------|
| 1** | 100～199 | 信息，服务区收到请求，需要请求者继续执行操作 |
| 2** | 200～299 | 成功，操作被成功接收并处理          |
| 3** | 300～399 | 重定向，需要进一步的操作以完成请求      |
| 4** | 400～499 | 客户端错误，请求包含语法错误或无法完成请求  |
| 5** | 500～599 | 服务器错误，服务器在处理请求的过程中出现错误 |



```java

import java.util.Arrays;

@Getter
public enum ReturnCodeEnum {

    // 如何定义一个通用的枚举值， 举值-构造-遍历

    
    // 1. 举值
    RC999(999, "操作失败"),
    RC200(200, "操作成功"),
    RC201(201, "服务开启降级保护, 请稍后再试"),
    RC202(202, "热点参数限流, 请稍后再试"),
    RC203(203, "系统规则不满足要求, 请稍后再试"),
    RC204(204, "授权规则不通过, 请稍后再试"),
    RC375(375, "数学运算异常, 请稍后再试"),
    RC401(401, "匿名用户无法访问该资源"),
    RC403(403, "无访问权限, 请联系管理员授权"),
    RC404(404, "无法找到页面"),
    RC500(500, "系统异常, 请稍后再试"),
    CLIENT_AUTHENTICATION_FAILED(1001, "客户端认证失败"),
    USER_OR_PASSWORD_ERROR(1002, "用户名或密码错误"),
    UNSUPPORTED_GRANT_TYPE(1003, "不支持的认证模式"),
    ;

    // 2. 构造
    // 自定义状态码
    private final Integer code;

    // 自定义描述
    private final String message;

    ReturnCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    // 3. 遍历
   // 3.1 传统版
    public static ReturnCodeEnum getReturnCodeEnumV1(Integer code) {
        for (ReturnCodeEnum returnCodeEnum : ReturnCodeEnum.values()) {
            if (returnCodeEnum.getCode().equals(code)) {
                return returnCodeEnum;
            }
        }
        return null;
    }

    // 3.2 lambda版
    public static ReturnCodeEnum getReturnCodeEnumV2(Integer code) {
        return Arrays.stream(ReturnCodeEnum.values())
                .filter(returnCodeEnum -> returnCodeEnum.getCode().equals(code))
                .findFirst()
                .orElse(null);
    }

    public static void main(String[] args) {
        System.out.println(ReturnCodeEnum.getReturnCodeEnumV1(200));
        System.out.println(ReturnCodeEnum.getReturnCodeEnumV1(200).getCode());
        System.out.println(ReturnCodeEnum.getReturnCodeEnumV1(200).getMessage());

        System.out.println();

        System.out.println(ReturnCodeEnum.getReturnCodeEnumV2(404));
        System.out.println(ReturnCodeEnum.getReturnCodeEnumV2(404).getCode());
        System.out.println(ReturnCodeEnum.getReturnCodeEnumV2(404).getMessage());
    }
}

```
2. 新建统一返回对象 `ResultData`

```java

@Data
@Accessors(chain = true) // 链式编程
public class ResultData<T> {

    private Integer code;
    private String message;
    private T data;
    private Long timestamp;

    public static <T> ResultData<T> success(T data) {
        return new ResultData<T>().setCode(ReturnCodeEnum.RC200.getCode()).setMessage(ReturnCodeEnum.RC200.getMessage()).setData(data).setTimestamp(System.currentTimeMillis());
    }
    public static <T> ResultData<T> fail(ReturnCodeEnum returnCodeEnum) {
        return new ResultData<T>().setCode(returnCodeEnum.getCode()).setMessage(returnCodeEnum.getMessage()).setTimestamp(System.currentTimeMillis());
    }
}
```
3. 全局异常接入返回的标准格式
```java
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResultData<String> exception(Exception e){
        log.error("全局异常信息：", e.getMessage(), e);

        return ResultData.fail(ReturnCodeEnum.RC500.getCode(), e.getMessage());
    }
}

```
报错时的显示效果
![exception](https://github.com/citynight/blog-image/assets/7713239/1cdb01d8-4d46-4fef-9f4f-54726d40428a)




# 微服务-订单模块
## 创建步骤
不再一一说明，步骤还是
1. 建 module
2. 改 pom
3. 写 YML
4. 主启动
5. 业务类
其中pom如下：
```xml

    <dependencies>
        <!--web + actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.fastjson2</groupId>
            <artifactId>fastjson2</artifactId>
        </dependency>
        <!-- http://localhost/swagger-ui/index.html -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
        </dependency>
    </dependencies>
```
YML配置如下：
```yml
server:
  port: 80
```

## 什么是 RestTemplate
[RestTemplate](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestTemplate.html)
 提供了多种便捷访问远程 Http 服务的方法，是一种简单便捷的访问 restful 服务的模板类，是 Spring 提供的用于访问 Rest 服务的客户端模板工具集。

### 常用的 API 使用说明
使用 RestTemplate 访问Restful 接口非常的简单粗暴无脑
(url,requestMap,ResponseBean.class) 参数分别代表 REST 请求地址、请求参数、HTTP 响应转被转换成的对象类型。

**getForObject 方法和 getForEntity 方法的区别**
getForObject 方法返回对象为响应体中数据转化成的对象，基本上可以理解为 Json。
getForEntity 方法返回对象为 ResponseEntity，该对象中包含了响应中的一些重要信息，比如响应头、响应体、响应状态码等数据。
![getForObject 方法和 getForEntity 方法的区别](https://github.com/citynight/blog-image/assets/7713239/a4e70eb4-1cc7-4343-8942-fd263a7728ba)

**postForObject 方法和 postForEntity 方法的区别**
![postForObject 方法和 postForEntity 方法的区别](https://github.com/citynight/blog-image/assets/7713239/ecd96e24-f0ea-4c69-8a2f-62c841ede481)

**get 请求方法**
![get 请求方法](https://github.com/citynight/blog-image/assets/7713239/ba14ae58-ca03-4d1c-879a-ecac210cda52)
**post 请求方法**
![post 请求方法](https://github.com/citynight/blog-image/assets/7713239/a5250fc1-fa29-4097-b6b7-998e6a3ac0bc)


使用 RestTemplate 有两种方，一种使用 new RestTemplate() 对象访问方式，另一种是使用 config 配置类。
推荐使用 config 配置类。
```java
@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}

```

controller 类
```java

@RestController
@Slf4j
public class OrderController {
    public static final String PaymentSrv_URL = "http://localhost:8001"; // 先写死，硬编码
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);

    @Resource
    private RestTemplate restTemplate;

    @GetMapping("/consumer/pay/add")
    public ResultData addOrder(PayDTO payDTO) {
        System.out.println("payDTO = " + payDTO);
        return restTemplate.postForObject(PaymentSrv_URL + "/pay/add", payDTO, ResultData.class);
    }

    @GetMapping("/consumer/pay/get/{id}")
    public ResultData getPayInfo(@PathVariable("id") Integer id) {
        return restTemplate.getForObject(PaymentSrv_URL + "/pay/get/" + id, ResultData.class, id);
    }

    @GetMapping("/consumer/pay/del/{id}")
    public ResultData deleteOrder(@PathVariable("id") Integer id) {
        log.info("删除id = " + id);
        try {
            restTemplate.delete(PaymentSrv_URL + "/pay/del/" + id);
            return ResultData.success("删除成功");
        } catch (Exception e) {
            log.error("删除失败");
            return ResultData.fail(ReturnCodeEnum.RC500.getCode(), "删除失败");
        }

    }

    @GetMapping("/consumer/pay/update")
    public ResultData updateOrder(PayDTO payDTO) {
        log.info("修改payDTO = " + payDTO);
        try {
            restTemplate.put(PaymentSrv_URL + "/pay/update", payDTO);
            return ResultData.success("修改成功");
        } catch (Exception e) {
            log.error("修改失败");
            return ResultData.fail(ReturnCodeEnum.RC500.getCode(), "修改失败");
        }
    }
}
```

# 重构
## 抽取重复代码
系统中有重复部分，重构。
新建 `cloud-api-commons` 模块，对外暴露通用的组件/api/接口/工具类等。`

![重构](https://github.com/citynight/blog-image/assets/7713239/794d47cb-d4e7-4786-a20a-c001e105226c)

重复的代码抽取到 `cloud-api-commons` 模块中后，在原有模块的 pom 中需要引入依赖。
```xml
        <!-- 引入自己定义的 api 通用包 -->
        <dependency>
            <groupId>cn.citynight.cloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>

```
## 硬编码写死的问题

```java
    public static final String PaymentSrv_URL = "http://localhost:8001"; // 先写死，硬编码
```

微服务所在的`IP 地址`和`端口号`硬编码到订单微服务中，会存在非常多的问题
1. 如果订单微服务和支付微服务的 IP 地址和端口号发生了变化，则支付微服务将变得不可使用，需要同步修改订单微服务中调用支付微服务的IP地址和端口号。
2. 如果系统中提供了多个订单微服务和支付微服务，则无法实现微服务的负载均衡。
3. 如果系统需要支持更高的并发，需要部署更多的订单微服务和支付微服务，硬编码订单微服务后续的维护将变得异常复杂。

所以在微服务开发的过程中，需要引入服务治理功能，实现微服务之间的动态注册与发现，从此刻开始正式进入 SpringCloud。

# 服务注册中心 consul 
consul 是一个服务注册与发现工具，它提供了微服务注册与发现功能，并且支持服务健康检查。
## 为什么要引入服务注册中心
为了解决上面 IP 地址和端口号硬编码的问题。

## 能做什么
1. 服务的发现， 提供HTTP 和 DNS 两种发现方式。
2. 健康检查， 支持多种方式， HTTP、TCP、Docker、Shell 脚本定制。
3. KV 存储，Key-Value 存储，用于存储配置信息。
4. 多数据中心， Consul 支持多数据中心。
5. 可视化界面， Consul 提供了 Web UI，可以方便的查看服务注册情况。

下载地址：https://developer.hashicorp.com/consul/install

使用，
1. 下载 consul，解压到任意目录，并添加到环境变量。
```shell
# 复制到 /usr/local/bin
cp /Users/logan/Downloads/consul_1.18.2_darwin_arm64/consul /usr/loc
al/bin
# 查看版本，如果生效了则能正常显示信息
consul --version
```
![添加到环境变量](https://github.com/citynight/blog-image/assets/7713239/31e8784e-90f4-481a-988e-8dd52f5f0546)

2. 启动 consul
```shell
consul agent -dev
```
访问 http://localhost:8500
![启动 consul](https://github.com/citynight/blog-image/assets/7713239/6374f445-c920-43b2-a31a-672d1e504138)
3. 服务注册与发现
