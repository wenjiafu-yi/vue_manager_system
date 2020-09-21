<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../bus.js";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-s-home",
          index: "dashboard",
          title: "系统首页",
        },
        {
          icon: "el-icon-s-data",
          index: "4",
          title: "信息管理",
          subs: [
            {
              index: "employee",
              title: "员工管理",
            },
            {
              index: "section",
              title: "部门管理",
            },
            {
              index: "position",
              title: "职位管理",
            },
          ],
        },
        {
          icon: "el-icon-s-tools",
          index: "setting",
          title: "系统设置",
        }
      ],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 180px;
}
.sidebar > ul {
  height: 100%;
}
.el-menu {
  height: 100%; /*写给不支持calc()的浏览器*/
  height: -moz-calc(100% - 80px);
  height: -webkit-calc(100% - 80px);
  height: calc(100% - 80px);
  border-radius: 0px;
  background-color: #333744;
  border-right: 0px;
}

.el-submenu .el-menu-item {
  min-width: 70px;
}
.el-menu {
  width: 180px;
}
.el-menu--collapse {
  width: 70px;
}

.el-menu .el-menu-item,
.el-submenu .el-submenu__title {
  height: 46px;
  line-height: 46px;
}

.el-menu-item:hover,
.el-submenu .el-menu-item:hover,
.el-submenu__title:hover {
  background-color: #7ed2df;
}
</style>
