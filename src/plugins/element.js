import Vue from 'vue'
import {  
    Container,
    Header,
    Aside,
    Main,
    Button,
    Message,
    Input,
    FormItem,
    Form } 
from 'element-ui'

Vue.use(Header)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message=Message;
