<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 表单 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0" class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username" >
                    <el-input placeholder="用户名" v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password" >
                    <el-input placeholder="密码" type="password" v-model="loginForm.password" prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                   <el-button type="primary" @click="login">登陆</el-button>
                   <el-button type="info" @click='resetLoginForm'>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    </template>

<script>
export default {
    data(){
        return{
            loginForm:{
                username:'',
                password:''
            },
            loginFormRules:{
                username:[
                    { required:true,message:"请输入用户名",trigger:"blur"},
                    { min:3,max:10,message:"长度在3到10之间",trigger:"blur"}
                    ],
                password:[
                    { required:true,message:"请输入密码",trigger:"blur"},
                    { min:6,max:15,message:"长度在6到15之间",trigger:"blur"}
                    ]
            }
        }
    },
    methods:{
        resetLoginForm:function(){
            this.$refs.loginFormRef.resetFields();
        },
        login:function(){
            this.$refs.loginFormRef.validate(async valid=>{
                 if(!valid) return;
                 const {data:result}=await this.$http.post('login',this.loginForm);
                 if(result.meta.status!==200) return this.$message.error('登陆失败')
                 this.$message.success('登陆成功');
                 window.sessionStorage.setItem('token',result.data.token);
                 this.$router.push("/home");
            })
        }
    }
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
