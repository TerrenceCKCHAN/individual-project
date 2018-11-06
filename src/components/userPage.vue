<template lang="html">
  <div class="user-page">
    <menuHeader @username="username = $event"></menuHeader>
    <div class="title">
      manage account
    </div>
    <button class="manage-account-but" type="button" name="button" @click="clickChangePassword = true">change password</button>
    <button class="manage-account-but" type="button" name="button" @click="clickChangeUsername = true">change username</button>
    <alertBox class="password-change alert" :title="'Change Password'" @close="clickChangePassword = false; oldPassword = ''; newPassword = ''; confirmNewPassword = ''" v-show="!!clickChangePassword">
      <div class="warning" v-if="sqlThreaten">
        Please don't input sql query!
      </div>
      <div class="warning" v-if="serverError">
        Something went wrong! Please try again later!
      </div>
      <div class="section">
        <div class="name">
          old password:
        </div>
        <input type="password" name="" value="" v-model="oldPassword"></input>
        <div class="warning" v-if="incorrectPassword">
          Passwords is incorrect!
        </div>
        <div class="warning" v-if="noOldPassword">
          Please enter old password
        </div>
      </div>
      <div class="section">
        <div class="name">
          new password:
        </div>
        <input type="password" name="" value="" v-model="newPassword"></input>
        <div class="warning" v-if="passwordNotMatch">
          Passwords doesn't match, please confirm again!
        </div>
        <div class="warning" v-if="noNewPassword">
          Please enter new password
        </div>
      </div>
      <div class="section">
        <div class="name">
          confirm new password:
        </div>
        <input type="password" name="" value="" v-model="confirmNewPassword"></input>
        <div class="warning" v-if="passwordNotMatch">
          Passwords doesn't match, please confirm again!
        </div>
        <div class="warning" v-if="noConfirmPassword">
          Please confirm new password
        </div>
      </div>
      <button class="submit" @click="submitPassword">
        submit
      </button>
    </alertBox>
    <alertBox class="username-change alert" :title="'Change Username'" @close="clickChangeUsername = false; newUsername = ''" v-show="!!clickChangeUsername">
      <div class="warning" v-if="sqlThreaten">
        Please don't input sql query!
      </div>
      <div class="section">
        <div class="name">
          new username:
        </div>
        <input type="text" name="" value="" v-model="newUsername"></input>
        <div class="warning" v-if="noUsername">
          Please input new username
        </div>
      </div>
      <button class="submit" @click="submitUsername">
        submit
      </button>
    </alertBox>
  </div>
</template>

<script>
import service from '../service.js';
import menuHeader from './widgets/menu.vue';
import alertBox from './widgets/alertBox.vue';
import crypto from 'crypto';
const secret = 'abcdefg';

export default {
  components: {
    menuHeader,
    alertBox
  },
  data() {
    return {
      username: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      newUsername: '',
      clickChangePassword: false,
      clickChangeUsername: false,
      sqlThreaten: false,
      passwordNotMatch: false,
      noNewPassword: false,
      noConfirmPassword: false,
      noUsername: false,
      noOldPassword: false,
      incorrectPassword: false,
      serverError: false
    }
  },
  methods: {
    submitPassword: function() {
      var re = /select|update|delete|exec|count|’|"|=|;|>|<|%/i;
      if (re.test(this.oldPassword) || re.test(this.newPassword) || re.test(this.confirmNewPassword)) {
        this.sqlThreaten = true;
        return
      } else {
        this.sqlThreaten = false;
      }
      this.noOldPassword = !this.oldPassword ? true : false;
      this.noNewPassword = !this.newPassword ? true : false;
      this.noConfirmPassword = !this.confirmNewPassword ? true : false;
      this.passwordNotMatch = (!!this.newPassword && !!this.confirmNewPassword && this.newPassword != this.confirmNewPassword) ? true : false;
      if (!this.noOldPassword && !this.noNewPassword && !this.noConfirmPassword && !this.passwordNotMatch) {
        service.checkUserPassword(this.username, crypto.createHmac('sha256', secret)
                   .update(this.oldPassword)
                   .digest('hex')).then(res => {
          if (res.code == 200) {
            this.incorrectPassword = false;
            service.changePassword(this.username, crypto.createHmac('sha256', secret)
                       .update(this.newPassword)
                       .digest('hex')).then(res => {
              if (res.code == 200) {
                this.serverError = false;
                this.clickChangePassword = false;
                service.logout().then(res => {
                  this.$router.push('/login');
                })
              } else {
                this.serverError = true;
              }
            }).catch(e => {
              this.serverError = true;
            })
          } else {
            this.incorrectPassword = true;
          }
        }).catch(e => {
          this.incorrectPassword = true;
        })
      }
    },
    submitUsername: function() {
      var re = /select|update|delete|exec|count|’|"|=|;|>|<|%/i;
      if (re.test(this.username) || re.test(this.newUsername)) {
        this.sqlThreaten = true;
        return
      } else {
        this.sqlThreaten = false;
      }
      if (!this.newUsername) {
        this.noUsername = true;
        return;
      } else {
        this.noUsername = false;
        service.changeUsername(this.username, this.newUsername).then(res => {
          service.logout().then(res => {
            this.$router.push('/login');
          })
        })
      }
    }
  },
  watch: {
    username: function(value) {
      if (!!value) {
        service.getBoard(this.username).then(res => {
          if (res.code == 200) {
            this.boards = res.data;
          }
        });
        service.getTemplates(this.username).then(res => {
          if (res.code == 200) {
            this.elements = res.data;
          }
        })
      }
    }
  }
}
</script>

<style lang="less">
.user-page {
  height: 100%;
  padding: 10px;
  .title {
    font-size: 18px;
    margin: 10px 0;
  }
  .content {
    .outter-box {
      display: flex;
      border: solid 1px;
      margin: 10px 0;
      .info-box {
        flex: 3;
      }
      .delete {
        flex: 1;
        position: relative;
        border-left: solid 1px;
        .text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .board-box:not(:last-child) {
      margin-bottom: 5px;
    }
    .no-board {
      margin-left: 10px;
    }
  }
  .manage-account-but {
    display: block;
    border: 1px solid;
    margin: 10px 0;
    padding: 5px;
  }
  .alert {
    input {
      border: 1px solid;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .submit {
      margin-top: 50px;
      padding: 10px;
      border: 1px solid;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
    .warning {
      color: red;
    }
  }
  .content-area {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
