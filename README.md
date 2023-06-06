# ovCourseManager

## 安装环境

```
nodejs(>17.0.0),pnpm(@lateset)
```

```sh
pnpm install
```
## 安装命令

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

## 后端数据库管理应用

[ovCourseHttp](https://github.com/Oveln/OvCourseHttpServer)