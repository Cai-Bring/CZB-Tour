<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkpassword"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkpassword !== "") {
          this.$refs.form.validateField("checkpassword");
        }
        callback();
      }
    };
    var validatecheckpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var phonenumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号码"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      form: {
        username: "", // 手机号码
        nickname: "", // 用户名
        captcha: "", // 验证码
        password: "", // 密码
        checkpassword: "" // 确认密码
      },
      // 表单规则
      rules: {
        username: [{ validator: phonenumber, trigger: "blur" }],
        nickname: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkpassword: [{ validator: validatecheckpass, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      this.$refs.form.validateField("username", valid => {
        if (!valid) {
          this.$store
            .dispatch("user/getcaptchas", this.form.username)
            .then(res => {
              // console.log(res);
              this.$message.success("验证码为:" + res.data.code);
            });
        }
      });
    },
    // 注册
    handleRegSubmit() {
      // console.log(this.form);
      this.$refs.form.validate(valid => {
        if (valid) {
          const { checkpassword, ...data } = this.form;
          this.$store.dispatch("user/register", data).then(() => {
            this.$message.success("注册成功,将为您自动登录");
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>