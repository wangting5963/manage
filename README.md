<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo-new.svg">
    </a>
</p>

# iView Admin

[![](https://img.shields.io/github/release/iview/iview-admin.svg)](https://github.com/iview/iview-admin/releases)
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.10-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-3.0.0-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)
[![npm](https://img.shields.io/npm/l/express.svg)]()

[更新日志](https://github.com/iview/iview-admin/releases)

[使用文档](https://lison16.github.io/iview-admin-doc/#/)

[在线访问](https://admin.iviewui.com/)

[简化版模板](https://github.com/iview/iview-admin/tree/template)

[教学视频(26课时)](https://segmentfault.com/ls/1650000016221751?utm_source=banner)

`注：在线版本会在开发版本新小版本发布后更新到相应版本，所以如果想体验最新版本iview-admin，请clone完整项目代码到本地运行。`

## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

## 简介
&emsp;&emsp;iView admin是基于Vue.js，搭配使用[iView](https://www.iviewui.com) UI组件库形成的一套后台集成解决方案，由TalkingData前端可视化团队部分成员开发维护。iView admin遵守iView设计和开发约定，风格统一，设计考究，并且更多功能在不停开发中。
如果您想查看iview-admin的更新动态，您可以到[更新日志](https://github.com/iview/iview-admin/releases)查看了解最新更新；如果您是新手，想快速入手iview-admin，您可以到[使用教程](https://github.com/iview/iview-admin/wiki)查看讲解；如果您想在线体验iview-admin，您可以到[在线访问](https://admin.iviewui.com/)体验。如果你只是想要一个清醒爽朗的界面，那你可以下载[简化版模板](https://github.com/iview/iview-admin/tree/template)来做开发。

## 功能

- 登录/登出
- 权限管理
    - 列表过滤
    - 权限切换
- 多语言切换
- 组件
    - 富文本编辑器
    - Markdown编辑器
    - 城市级联
    - 图片预览编辑
    - 可拖拽列表
    - 文件上传
    - 数字渐变
    - split-pane
- 表单编辑
    - 文章发布
    - 工作流
- 表格
    - 可拖拽排序
    - 可编辑表格
        - 行内编辑
        - 单元格编辑
    - 可搜索表格
    - 表格导出数据
        - 导出为Csv文件
        - 导出为Xls文件
    - 表格转图片
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 高级路由
    - 动态路由
    - 带参页面
- 换肤
- 收缩侧边栏
- tag标签导航
- 面包屑导航
- 全屏/退出全屏
- 锁屏
- 消息中心
- 个人中心

## 文件结构
```shell
.
├── build  项目构建配置
├── config  开发相关配置
├── public  打包所需静态资源
└── src
    ├── api  AJAX请求
    └── assets  项目静态资源
        ├── icons  自定义图标资源
        └── images  图片资源
    ├── components  业务组件
    ├── config  项目运行配置
    ├── directive  自定义指令
    ├── libs  封装工具函数
    ├── locale  多语言文件
    ├── mock  mock模拟数据
    ├── router  路由配置
    ├── store  Vuex配置
    ├── view  页面文件
    └── tests  测试相关
```

## Links

- [TalkingData](https://github.com/TalkingData)
- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)

## 效果展示

- 响应式布局首页
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/home.gif)

- 标签导航
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/page-tags.gif)

- 权限管理
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/access.gif)

- 可拖拽列表
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/dragable-list.gif)

- 图片预览编辑
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/image-editor.gif)

- 文件上传
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/upload.gif)

- 数字渐变
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/count-to.gif)

- split-pane
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/split-pane.gif)

- 文章发布
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/article-publish.gif)

- 工作流
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/workflow.gif)

- 可拖拽表格
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/dragable-table.gif)

- 可编辑表格
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/editable-table.gif)

- 表格导出数据
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/exportable-table.gif)

- 表格转图片
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/table2image.gif)

- 错误页面
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/error-page.gif)

- 锁屏
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/locking.gif)

- 可收缩侧边栏
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/sidebarmenu.gif)

- 主题切换
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/theme.gif)

- 消息中心
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/message.gif)

### 💖💖 If you find this project helpful, maybe you can buy me a coffee. 💖💖
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/code.png)


## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, iView



### 个人使用心得

    一：下载依赖 npm install

    二：开发 npm run dev

        1. 新建页面在[iview-admin\src\view]

        2. 配置路由[iview-admin\src\router\routers.js]

            ①：全屏显示的页面配置[如：登录页面、404报错页面(不需要嵌入菜单系统)]

                export const loginRouter = {
                    path: '/login',  //必填
                    name: 'login',  // 必填，页面都以name值来加载
                    meta: {
                        title: 'Login - 登录'  // 非必填，若不填默认显示iview-admin（后面会介绍在哪修改默认显示的值）
                    },
                    component: resolve => { require(['./views/login.vue'], resolve); }  // 必填，用来加载该路由规则对应的视图，resolve用来控制异步加载
                };

            ②：在右侧容器展示，但是不在菜单栏中展示的页面

                export const otherRouter = {
                    path: '/',  // 必填
                    name: 'otherRouter',  // 必填，在面包屑处理中需要用到，值固定为otherRouter（或者可以在./src/libs/util.js中修改）
                    redirect: '/home',  // 选填，这里如果不填在浏览器地址栏输入域名后自动跳转到首页
                    component: Main,  // 必填，主组件，用于加载侧边栏和右侧面包屑、标签栏、工具条、子页面路由视图等
                    children: [  // 在Main右侧视图显示的页面都要作为otherRouter的children来添加
                        {  // home页面
                            path: 'home',  // 必填，在地址栏将以 '域名/home'的的形式呈现
                            title: '首页', // 必填，这个title会在标签栏显示
                            name: 'home_index',  // 必填，该页面是通过name值来加载的，切记每个路由对象的名字都要和其他的不一样
                            component: resolve => { require(['./views/home/home.vue'], resolve); }   // 必填
                        }
                    ]
                };

            ③：配置只有一级菜单的页面
            ④：配置多级菜单的页面

                export const appRouter = [
                    {  // a.第一种情况：只有一级菜单
                        path: '/access',  // 必填
                        redirect: '/access/index',  // 选填，如果不填也会跳转到这个路径
                        icon: 'key',  // 必填，此icon将显示在左侧菜单栏
                        name: 'access',  // 必填
                        title: '权限管理',  // 必填，此title值将显示在左侧菜单栏
                        component: Main,  // 必填，且固定，用于加载Main组件
                        children: [  // 要显示在右侧区域的页面必须作为children来添加
                            { 
                                path: 'index',  // 必填
                                title: '权限管理',  // 必填，将显示在标签栏对应标签
                                name: 'access_index',  // 必填，且不能和其父路由的name不一致（与其他任何路由的name值都不能一致）
                                component: resolve => { require(['./views/access/access.vue'], resolve); }   // 必填
                            }
                        ]
                    },
                    {  // b.第二种情况：有二级菜单
                        path: '/component',  // 必填
                        redirect: '/component/text-editor',  // 选填，如果不填在地址栏输入'域名/access'时将默认打开此一级菜单对应的第一个二级菜单页面
                        icon: 'social-buffer',  // 必填，同上
                        name: 'component',  // 必填，同上
                        title: '组件',  // 必填，同上
                        component: Main,  // 必填，同上
                        children: [  // 必填，同上
                            {
                                path: 'text-editor',  // 必填，同上
                                icon: 'compose',  // 必填，同上
                                name: 'text-editor',  // 必填，同上
                                title: '富文本编辑器',  // 必填，将显示在左侧菜单栏二级菜单
                                component: resolve => { require(['./views/my_components/text-editor/text-editor.vue'], resolve); }  // 必填
                            },
                            {
                                path: 'md-editor',  // 必填，同上
                                icon: 'pound',  // 必填，同上
                                name: 'md-editor',  // 必填，同上
                                title: 'Markdown编辑器',  // 必填，同上
                                component: resolve => { require(['./views/my_components/markdown-editor/markdown-editor.vue'], resolve); }
                            },  // 必填
                        ]
                    }
                }

            ⑤：权限配置 [权限配置很简单，只需在路由对象里设置'access'属性即可]

                    {
                        path: '/access-test',
                        icon: 'lock-combination',
                        title: '权限测试页',
                        name: 'accesstest',
                        access: 0,  // 如果设置access值，那么当登录用户的权限值不为0时则该菜单及其二级菜单都不会出现在左侧菜单栏；
                                    // 如果不设置access值，那么该菜单默认显示；
                                    // access如果只有一个权限值过滤，那么直接写一个数字即可（如这的0）,如果有多个，则写成数组类型（如[0,1]）。
                        component: Main,
                        children: [
                            { path: 'index', title: '权限测试页', name: 'accesstest_index' }
                        ]
                    }

        3. 关于router.js文件中使用到的icon

            ①：使用iview组件自带的icon [node_modules\iview\src\styles\common\iconfont\_ionicons-icons.less] 

                    源文件中的内容大致为：.ivu-icon-md-bug  

                    在router.js文件中可以直接以：md_bug使用，在vue页面中以：<Icon type="md_bug" size="100"/> 进行展示

            ②：使用自定义的icon[以_开头如：_qq]，如从阿里矢量图中下载下来的 [iview-admin\src\assets\icons\iconfont.css]

                    源文件中的内容大致为：.icon-qq  

                    在router.js文件中可以直接以：_qq使用，在vue页面中以：<span class="iconfont icon-bear"></span> 进行展示

    三：开发---->Vue+IView开发[可以查看vue官网和iview官网]

    四：打包 npm run build


    *：注意配置路由的时候为了设置展示页面的名称、并且为了进行国际化。将名称抽离出来放置到js文件中。不同的语言对应不同的js文件。router中引入的

       就是js文件中的字段名称 [目录：iview-admin\src\locale\lang]