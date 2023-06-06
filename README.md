# ovCourseManager

## 安装环境

```
nodejs(>17.0.0),pnpm(@lateset)
```

```sh
pnpm install
```
## 构建命令

```sh
pnpm build
```

## 功能说明

提供了课程-选课管理的前端页面，共有三个页面

### 教师列表

以教师为单位，统计了教师信息和教师所教授的课程信息
- 在下拉菜单中选择课程，添加到课程列表中
- 删除教师后，课程列表中所对应的该教师课程一并删除
- 添加或删除课程，课程被删除后课程列表中的课程一并删除

### 课程列表

- 统计了当前所选的所有课程

### 教师信息

对于教师信息，能显示：
- 姓名
- 性别
- 电话
- 办公地点
- 简介

### 课程信息

对于课程信息，能显示：
- 名称
- 描述
- 学分
- 上课地点

## 后端数据库管理应用

可以使用本项目的database分支构建前端页面
在/src/store/store.ts的config对象中指定后端程序[ovCourseHttp](https://github.com/Oveln/OvCourseHttpServer)的IP地址
可以支持：
- 使用后端程序中注册后返回的key值进行登录
- 上述数据管理的持久化存储
- 添加教师和课程时的类型校验
- 通过上传json文件或指定json文件的URL链接的方式，批量添加教师以及课程信息