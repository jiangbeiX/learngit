<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 表单 -->
            <el-form label-width="0" class="login_form">
                <!-- 用户名 -->
                <el-form-item >
                    <el-input ></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item >
                    <el-input ></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                   <el-button type="primary">登陆</el-button>
                   <el-button type="info">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    </template>

<script>
export default {
}
</script>
<style lang="less" scoped>
.login_container{
    background-color: seagreen;
    height: 100%;
}
.login_box{
    height: 300px;
    width: 450Px;
    background-color: #fff;
    position: absolute;
    border-radius: 3px;
    left: 50%;
    top: 50%;
    transform:translate(-50%,-50%);

    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #dbd5d5;
        border-radius: 50%;
        box-shadow:0 0 10px #b4adad;
        position: absolute;
        left: 50%;
        transform:translate(-50%,-50%);
        background-color: #fff;
        padding: 10px;
        
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color:#eee;
        }
    }
}
.btns{
    // display: flex;
    // justify-content: flex-end;
    float:right;
        
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

</style>
