<template>
<el-container class="home-container"> 
    <!-- 头部 -->
  <el-header>
      <div>
          <img src="../assets/LOGO1.png" width="180px" alt="">
          <span >   上门服务平台后台管理</span>
      </div>
  <el-button class="btn" type="info" @click='logout'>退出</el-button>
    </el-header>
  <!-- 页面主体 -->
  <el-container>
      <!-- 侧边 -->
    <el-aside width="200px">Aside</el-aside>
    <!-- 主体 -->
    <el-main>Main</el-main>
  </el-container>
</el-container>

    
</template>

<script>
export default {
    methods:{
        logout:function(){
            window.sessionStorage.clear();
            this.$router.push("/login");
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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 100px;
    height: 100px !important;
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
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>