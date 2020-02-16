<template>
<el-container class="home-container"> 
    <!-- 头部 -->
  <el-header>
      <div>
          <img src="../assets/LOGO1.png" width="250px" alt="">
          <span > 上门服务平台后台管理</span>
      </div>
  <el-button class="btn" type="info" @click='logout'>退出</el-button>
    </el-header>
  <!-- 页面主体 -->
  <el-container>
      <!-- 侧边 -->
    <el-aside width="299px">
          <el-menu  background-color="#545c64" text-color="#fff"
      active-text-color="#ffd04b" unique-opened router :default-active="activePath">
      <!-- 一级菜单 -->
      <el-submenu :key="item.id" v-for="item in menulist" :index="item.id+''">
        <template slot="title">
          <!-- 图标 -->
          <i :class="iconObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
          <el-menu-item :index="'/'+subItem.path" :key="subItem.id" v-for="subItem in item.children"
          @click="saveNavstate('/'+subItem.path)">
            {{subItem.authName}}
            </el-menu-item>
        </el-submenu>


    </el-menu>

    </el-aside>
    <!-- 主体 -->
    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

    
</template>

<script>
export default {
  data(){
    return {
      menulist:[],
      activePath:'',
      iconObj:{
        '125':'el-icon-user-solid',
        '103':'el-icon-s-tools',
        '101':'el-icon-s-goods',
        '102':'el-icon-s-claim',
        '145':'el-icon-edit-outline'
      }
    }
  },
  created(){
    this.getMenuList();
    this.activePath=window.sessionStorage.getItem('activePath');
  },
    methods:{
        logout:function(){
            window.sessionStorage.clear();
            this.$router.push("/login");
        },
        async getMenuList(){
          const {data: res}=await this.$http.get('menus');
          if(res.meta.status!==200) return this.$message.error(res.mate.msg);
          this.menulist=res.data;
        },
        saveNavstate:function(activePath){
          window.sessionStorage.setItem('activePath',activePath)
          this.activePath=activePath;
        }
    }  
}
</script>

<style lang="less" scoped>
// .btn{ 
//     float:right;
//     position: absolute;
//     right: 0;
//     top: 50%;
//     transform: translate(0 ,-50%);
// }
.home-container{
    height: 100%;

}

 .el-header, .el-footer {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 100px;
    height: 150px !important;
    position: relative;
    display: flex;
    justify-content:space-between;
    align-items: center;
    font-size: 30px;
    color: rgb(247, 247, 245);
    >div{
        display: flex;
        align-items: center;
    }

}

  .el-aside {
    background-color: #545c64;
    color: #333;
    
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;

  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>