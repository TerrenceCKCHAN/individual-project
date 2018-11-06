<template lang="html">
  <div class="login">
    <menuHeader></menuHeader>
    <div class="login-area">
      <div class="error-message" v-show="userinfoError">
        * The user information provided is not correct.
      </div>
      <div class="title-box">
        <div class="username title">
          username
        </div>
        <div class="error-message" v-show="usernameEmpty">
          * please enter the username
        </div>
      </div>
      <input class="username input-box" type="text" name="" value="" v-model="username">
      <div class="title-box">
        <div class="password title">
          password
        </div>
        <div class="error-message" v-show="passwordEmpty">
          * please enter the password
        </div>
      </div>
      <input class="password input-box" type="password" name="" value="" v-model="password">
      <button type="button" name="button" @click="submit">submit</button>
    </div>
  </div>
</template>

<script>
import service from '../service.js';
import menuHeader from './widgets/menu.vue';
import crypto from 'crypto';
const secret = 'abcdefg';
// import SHA1 from 'crypto-js/sha1';

export default {
  components: {
    menuHeader
  },
  data() {
    return {
      username: '',
      password: '',
      usernameEmpty: false,
      userinfoError: false,
      passwordEmpty: false
    }
  },
  methods: {
    gotoHome: function() {
      this.$router.push('simulator');
    },
    submit: function() {
      if (this.username.trim() == '' || this.password.trim() == '') {
        if (this.username.trim() == '') {
          this.usernameEmpty = true;
        } else {
          this.usernameEmpty = false;
        }
        if (this.password.trim() == '') {
          this.passwordEmpty = true;
        } else {
          this.passwordEmpty = false;
        }
      } else {
        service.login(this.username, crypto.createHmac('sha256', secret)
                   .update(this.password)
                   .digest('hex')).then((res) => {
          this.userinfoError = false;
          window.localStorage.setItem('username', this.username);
          this.gotoHome();
        }).catch((err) => {
          if (!!err.data && err.data.data == 'user info error') {
            this.userinfoError = true;
          }
        });
      }
    }
  }
}
</script>

<style lang="less">
  .login {
    height: 100%;
    input {
      border: solid 1px;
    }
    .login-area {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .title {
        padding-bottom: 15px;
        line-height: 100%;
      }
      .username.input-box {
        margin-bottom: 30px;
      }
      button {
        display: block;
        margin-top: 20px;
        border: 1px solid;
        padding: 5px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
      .error-message {
        color: red;
        font-size: 14px;
      }
    }
  }
</style>
