import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'，[非自定义图标，使用的是iview中的图标]
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // ******************配置整个浏览器展示的页面路由************** //
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      // 隐藏在菜单栏显示
      hideInMenu: true
    },
    // 引入的真实文件路径
    component: () => import('@/view/login/login.vue')
  },
  // ******************配置在右侧展示的子页面，但是不出现在菜单栏中的页面************** //
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      // 配置在左侧菜单栏中不显示
      hideInMenu: true,
      // 关闭页面缓存
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          // 在标签栏显示的文本
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  // ***************配置只有一级菜单的路由****************
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '文档',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  // {
  //   path: '/join',
  //   name: 'join',
  //   component: Main,
  //   meta: {
  //     // 配置是否在顶部显示面包屑
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'join_page',
  //       name: 'join_page',
  //       meta: {
  //         icon: '_qq',
  //         // 配置面包屑的名称
  //         title: 'QQ群'
  //       },
  //       component: () => import('@/view/join-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/message',
  //   name: 'message',
  //   component: Main,
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   children: [
  //     {
  //       path: 'message_page',
  //       name: 'message_page',
  //       meta: {
  //         icon: 'md-notifications',
  //         title: '消息中心'
  //       },
  //       component: () => import('@/view/single-page/message/index.vue')
  //     }
  //   ]
  // },
  // // ******************配置多级菜单的页面路由************** //
  // {
  //   path: '/components',
  //   name: 'components',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: '组件'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'count_to_page',
  //       name: 'count_to_page',
  //       meta: {
  //         icon: 'md-trending-up',
  //         // 设置要展示的文本标题【菜单栏和面包屑中的文本】
  //         title: '数字渐变'
  //       },
  //       // 指定真是组件的地址
  //       component: () => import('@/view/components/count-to/count-to.vue')
  //     },
  //     {
  //       path: 'drag_list_page',
  //       name: 'drag_list_page',
  //       meta: {
  //         icon: 'ios-infinite',
  //         title: '拖拽列表'
  //       },
  //       component: () => import('@/view/components/drag-list/drag-list.vue')
  //     },
  //     {
  //       path: 'tree_table_page',
  //       name: 'tree_table_page',
  //       meta: {
  //         icon: 'md-git-branch',
  //         title: '树状表格'
  //       },
  //       component: () => import('@/view/components/tree-table/index.vue')
  //     },
  //     {
  //       path: 'cropper_page',
  //       name: 'cropper_page',
  //       meta: {
  //         icon: 'md-crop',
  //         title: '图片裁剪'
  //       },
  //       component: () => import('@/view/components/cropper/cropper.vue')
  //     },
  //     {
  //       path: 'tables_page',
  //       name: 'tables_page',
  //       meta: {
  //         icon: 'md-grid',
  //         title: '多功能表格'
  //       },
  //       component: () => import('@/view/components/tables/tables.vue')
  //     },
  //     {
  //       path: 'split_pane_page',
  //       name: 'split_pane_page',
  //       meta: {
  //         icon: 'md-pause',
  //         title: '分割窗口'
  //       },
  //       component: () => import('@/view/components/split-pane/split-pane.vue')
  //     },
  //     {
  //       path: 'markdown_page',
  //       name: 'markdown_page',
  //       meta: {
  //         icon: 'logo-markdown',
  //         title: 'Markdown编辑器'
  //       },
  //       component: () => import('@/view/components/markdown/markdown.vue')
  //     },
  //     {
  //       path: 'editor_page',
  //       name: 'editor_page',
  //       meta: {
  //         icon: 'ios-create',
  //         title: '富文本编辑器'
  //       },
  //       component: () => import('@/view/components/editor/editor.vue')
  //     },
  //     {
  //       path: 'icons_page',
  //       name: 'icons_page',
  //       meta: {
  //         icon: '_bear',
  //         title: '自定义图标'
  //       },
  //       component: () => import('@/view/components/icons/icons.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/update',
  //   name: 'update',
  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '数据上传'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'update_table_page',
  //       name: 'update_table_page',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '上传Csv'
  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'update_paste_page',
  //       name: 'update_paste_page',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '粘贴表格数据'
  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'i18n_page',
  //       name: 'i18n_page',
  //       meta: {
  //         icon: 'md-planet',
  //         title: 'i18n - {{ i18n_page }}'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_store',
  //   name: 'error_store',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_store_page',
  //       name: 'error_store_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/error-store/error-store.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1'
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2'
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
  //         },
  //         {
  //           path: 'level_2_2_2',
  //           name: 'level_2_2_2',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3'
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/argu',
  //   name: 'argu',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'params/:id',
  //       name: 'params',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ params }}-${route.params.id}`,
  //         notCache: true,
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/argu-page/params.vue')
  //     },
  //     {
  //       path: 'query',
  //       name: 'query',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ query }}-${route.query.id}`,
  //         notCache: true
  //       },
  //       component: () => import('@/view/argu-page/query.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  // ITEM:全局配置
  {
    path: '/global-conf',
    name: 'global-conf',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/global_conf_page',
        name: 'global_conf_page',
        meta: {
          icon: '_peizhiguanli',
          title: '全局配置'
        },
        component: () => import('@/view/global-conf/global-conf.vue')
      }
    ]
  },
  // ITEM:会员管理
  {
    path: '/vip-manage',
    name: 'vip-manage',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/vip_manage_page',
        name: 'vip_manage_page',
        meta: {
          icon: '_huiyuanguanli-copy',
          title: '会员管理'
        },
        component: () => import('@/view/vip-manage/vip-manage.vue')
      }
    ]
  },
  // ITEM:积分管理
  {
    path: '/integral-manage',
    name: 'integral-manage',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/integral_manage_page',
        name: 'integral_manage_page',
        meta: {
          icon: '_jifen',
          title: '积分管理'
        },
        component: () => import('@/view/integral-manage/integral-manage.vue')
      }
    ]
  },
  // ITEM:商品管理
  {
    path: '/goods-manage',
    name: 'goods_manage_page',
    component: Main,
    meta: {
      icon: '_shangpinguanli',
      title: '商品管理'
    },
    children: [
      {
        path: '/goods_type',
        name: 'goods_type',
        meta: {
          title: '商品分类'
        },
        component: () => import('@/view/goods-manage/goods-type.vue')
      },
      {
        path: '/goods_label',
        name: 'goods_label',
        meta: {
          title: '商品标签'
        },
        component: () => import('@/view/goods-manage/goods-label.vue')
      },
      {
        path: '/goods_list',
        name: 'goods_list',
        meta: {
          title: '商品列表'
        },
        component: () => import('@/view/goods-manage/goods-list.vue')
      }
    ]
  },
  // 商品详情
  {
    path: '/goods_detail/:flag/:goodsId',
    name: 'goods_detail',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/goods_detail/:flag/:goodsId',
        name: 'goods_detail',
        meta: {
          icon: '_shangpinguanli',
          title: '商品详情',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/goods-manage/goods-detail.vue')
      }
    ]
  },
  // ITEM:订单管理
  {
    path: '/order-manage',
    name: 'order_manage_page',
    component: Main,
    meta: {
      icon: '_dingdanguanli',
      title: '订单管理'
    },
    children: [
      {
        path: '/order_list',
        name: 'order_list',
        meta: {
          title: '订单列表'
        },
        component: () => import('@/view/order-manage/order-manage.vue')
      }, {
        path: '/order_after_sale',
        name: 'order_after_sale_page',
        meta: {
          title: '售后管理'
        },
        component: () => import('@/view/order-manage/order-aftersale.vue')
      }
    ]
  },
  // ITEM:订单详情
  {
    path: '/order',
    name: 'order',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/orderView',
        name: 'order_view',
        meta: {
          icon: '_dingdanguanli',
          title: '订单管理查看'
        },
        component: () => import('../view/order-manage/order-view.vue')
      }
    ]
  },
  // ITEM:售后退款详情
  {
    path: '/aftersale',
    name: 'aftersale',
    component: Main,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/aftersale-detail/:orderNo/:index/:detailId',
        name: 'aftersale-detail',
        meta: {
          icon: '_dingdanguanli',
          title: '售后详情'
        },
        component: () => import('../view/order-manage/aftersale-detail.vue')
      }
    ]
  },
  // ITEM:用户管理
  {
    path: '/user-manage',
    name: 'user_manage_page',
    component: Main,
    meta: {
      icon: '_yonghuguanli',
      title: '用户管理'
    },
    children: [
      {
        path: '/user_list',
        name: 'user_list',
        meta: {
          title: '用户列表'
        },
        component: () => import('@/view/user-manage/user-list.vue')
      },
      {
        path: '/role_list',
        name: 'role_list',
        meta: {
          title: '角色列表'
        },
        component: () => import('@/view/user-manage/role-list.vue')
      },
      {
        path: '/add_role',
        name: 'add_role',
        meta: {
          title: '添加角色'
        },
        component: () => import('@/view/user-manage/add-role.vue')
      },
      {
        path: '/add_user/:userId',
        name: 'add_user',
        meta: {
          title: '添加用户'
        },
        component: () => import('@/view/user-manage/add-user.vue')
      }
    ]
  },
  // ITEM:内容管理
  {
    path: '/content-manage',
    name: 'content-manage',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/content_manage_page',
        name: 'content_manage_page',
        meta: {
          icon: '_neirongguanli',
          title: '内容管理'
        },
        component: () => import('@/view/content-manage/content-manage.vue')
      }
    ]
  },
  // ITEM:福利管理
  {
    path: '/welfare-manage',
    name: 'welfare-manage',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/welfare_manage_page',
        name: 'welfare_manage_page',
        meta: {
          icon: '_fuli',
          title: '福利管理'
        },
        component: () => import('@/view/welfare-manage/welfare-manage.vue')
      }
    ]
  },
  // ITEM:支付对账
  {
    path: '/pay-bill',
    name: 'pay-bill',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/pay_bill_page',
        name: 'pay_bill_page',
        meta: {
          icon: '_icon1',
          title: '支付对账'
        },
        component: () => import('@/view/pay-bill/pay-bill.vue')
      }
    ]
  },
  // ITEM:数据监控
  {
    path: '/data-monitor',
    name: 'data-monitor',
    component: Main,
    meta: {
      hideInBread: true
    },
    children: [
      {
        path: '/data_monitor_page',
        name: 'data_monitor_page',
        meta: {
          icon: '_data',
          title: '数据监控'
        },
        component: () => import('@/view/data-monitor/data-monitor.vue')
      }
    ]
  },
  // 会员详情（不在菜单栏展示）
  {
    path: '/vip_detail',
    name: 'vip_detail',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/vip_detail',
        name: 'vip_detail',
        meta: {
          icon: '_huiyuanguanli-copy',
          title: '会员详情',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/vip-manage/vip-detail.vue')
      }
    ]
  },
  // 添加新的商品分类
  {
    path: '/type_detail',
    name: 'type_detail',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/type_detail',
        name: 'type_detail',
        meta: {
          title: '分类详情',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/goods-manage/type-detail.vue')
      }
    ]
  },
  // 内容详情
  {
    path: '/content_detail/:flag/:contentId',
    name: 'content_detail',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/content_detail/:flag/:contentId',
        name: 'content_detail',
        meta: {
          icon: '_neirongguanli',
          title: '内容详情',
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/content-manage/content-detail.vue')
      }
    ]
  }
]
