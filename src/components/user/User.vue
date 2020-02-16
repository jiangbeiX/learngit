<template>
<div>
    <!-- 导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>

<!-- 卡片 -->
<el-card >
    
  <el-row :gutter="30">
      <el-col :span="7">
<!-- 搜索框 -->
       <el-input placeholder="请输入内容" v-model="queryInfo.query" >  
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
       </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
    </el-row>
<!-- 用户信息 -->
<el-table :data="userList" border stripe>
    <el-table-column type="index" label="序号" width="50"></el-table-column>
    <el-table-column prop="role_name" label="权限" ></el-table-column>
    <el-table-column prop="username" label="姓名"></el-table-column>
    <el-table-column prop="create_time" label="创建时间"></el-table-column>
    <el-table-column prop="mobile" label="手机号"></el-table-column>
    <el-table-column prop="email" label="电子邮箱"></el-table-column>
    <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)">
            </el-switch>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
        <template >
            <!-- 修改 -->
             <el-tooltip  effect="dark" content="修改" placement="top">
                <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
            </el-tooltip>
            
            <!-- 刪除 -->
             <el-tooltip  effect="dark" content="刪除" placement="top">
                 <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
            <!-- 分配 -->
            <el-tooltip  effect="dark" content="分配权限" placement="top">
                 <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
            
        </template>
    </el-table-column>
    </el-table>
</el-card>
<!-- 分页区域 -->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

<el-dialog
  title="添加用户"
  :visible.sync="dialogVisible"
  width="30%" @close="addClose"
  >
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="moblie">
            <el-input v-model="addForm.moblie"></el-input>
        </el-form-item>
    </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

</div>

</template>
<script>
export default {
    data(){
        var checkEmail=(rule,value,cb)=>{
            const regEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
            if(regEmail.test(value)){
                return cb()
            }
            cb(new Error('请输入合法邮箱'))
        }

        var checkMoblie=(rule,value,cb)=>{
            const regMoblie=/^1(3|4|5|6|7|8|9)\d{9}$/
            if(regMoblie.test(value)){
                return cb()
            }
            cb(new Error('请输入合法手机号'))
        }

        return{
            
            queryInfo:{
                query:'',
                // 当前页数
                pagenum:1,
                // 每页显示多少数据
                pagesize:2
            },
            userList:[],
            total:0,
            dialogVisible:false,
            addForm:{
                username:'',
                email:'',
                moblie:'',
                password:''
            },
            addFormRules:{
                 email:[
                    { required:true,message:"请输入邮箱",trigger:"blur"},
                    { validator:checkEmail,trigger:"blur"}
                    ],
                 moblie:[
                    { required:true,message:"请输入手机号",trigger:"blur"},
                    { validator:checkMoblie,trigger:"blur"}
                    ],
                 password:[
                    { required:true,message:"请输入密码",trigger:"blur"},
                    { min:5,max:13,message:"长度在5到13之间",trigger:"blur"}
                    ],
                username:[
                    { required:true,message:"请输入用户名",trigger:"blur"},
                    { min:3,max:10,message:"长度在3到10之间",trigger:"blur"}
                    ]
   
            }
        }
    },
    created(){
        this.getUserList()

    },
    methods:{
        getUserList:async function(){
            const {data:res}=await this.$http.get('users',
            {
                params:this.queryInfo
                })
                console.log(res)
            if(res.meta.status!== 200 ) 
            {return this.$message.error('获取用户列表失败')}
            this.userList=res.data.users
            this.total=res.data.total
        },
        handleSizeChange:function(newSize){
            // 监听pagesiz
            this.queryInfo.pagesize=newSize
            this.getUserList()

        },
        handleCurrentChange:function(newPage){
            // 页码改变
            this.queryInfo.pagenum=newPage
            this.getUserList()

        },
        // 监听switch
        userStateChange: async function(userinfo){
            const {data:res} =await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
            if(res.meta.status!==200) {
                userinfo.mg_state=!userinfo.mg_state;
                return this.$message.error('更新失败')

                }
                this.$message.success('更新成功')
        },
        addClose:function(){
            this.$refs.addFormRef.resetFields()
        },
        addUser:function(){
            this.$refs.addFormRef.validate(async valid=>{
                if(!valid) return;
                const {data:res}=await this.$http.post('users',this.addForm)

               if(res.meta.status!==201){
                    this.$message.error('添加用户失败')
                    
                }
                this.$message.success('添加用户成功')
                this.dialogVisible = false
                this.getUserList()
            })
            

        }

    }
    
}
</script>

<style lang="less">


</style>