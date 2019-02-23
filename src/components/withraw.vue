<template>
  <div id="withraw">
    <mt-header fixed title="绑定银行卡">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <group >
      <popup-radio  ref="showPopUp"  :options="options1" v-model="option1">
        <div slot="popup-header" class="popup-header">
          <span>请选择开户银行</span>

          <span class="close">
            <span class="line"></span>
            <x-icon type="ios-close-empty" size="24" @click="close"></x-icon>
          </span>
        </div>
      </popup-radio>
    </group>
    <div class="form-wrap">
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 1}">
          <div class="title">卡号</div>
          <input
            placeholder="请输入卡号"
            @input="checkInput(1)"
            @focus="currentInput=1"
            @blur="currentInput=-1"
            type="password"
            :maxlength="20"
            v-model="form.oldpwd"
          >
        </div>
        <div class="tip">{{ regListTil.oldPasswordTil }}</div>
      </div>
      <div class="form-item-box">
        <div class="form-item-wrap" :class="{'active':currentInput === 2}" >
          <div class="title">选择银行</div>
          <div class="minus">-</div>
          <input
            readonly
            placeholder="请选择开户行"
            @input="checkInput(2)"
            @focus="currentInput=2"
            @blur="currentInput=-1"
            type="password"
            :maxlength="20"
            v-model="form.pwd"
          >

          <div class="right-select" @click="selectBack">
            <img width="7px" height="12px"  src="../assets/img/icon_touch_right.png">
          </div>
        </div>
        <div class="tip">{{ regListTil.passwordTil }}</div>

        <!-- <group>
          <popup-radio title="options" :options="options1" v-model="option1"></popup-radio>
        </group> -->

      </div>
      <mt-button :disabled="ableBtn" :class="{'active':!ableBtn}" @click="confirm">确认</mt-button>
    </div>
  </div>
</template>

<script>
import { mPassword } from "@/api/user.js";
import { mapState } from "vuex";
import { PopupRadio } from 'vux'
export default {
  name: "withraw",
  data() {
    return {
      option1: 'A',
      options1: ['中国工商银行', '中国建设银行', '中国农业银行','中国民生银行','招商银行','中国邮政储蓄银行','兴业银行'],
      form: {
        oldpwd: "",
        pwd: ""
      },
      checkpwd: "",
      disableBtn: true,
      regListTil: {
        oldPasswordTil: "",
        passwordTil: "",
        verifyPasswordTil: ""
      },
      currentInput: -1
    };
  },
  computed: {
    ...mapState({
      token: state => state.user.token
    }),
    ableBtn() {
      let assistNum = 0;
      if (this.form.oldpwd >= 8) {
        assistNum++;
      }
      if (this.form.pwd >= 8) {
        assistNum++;
      }
      if (this.checkpwd.length >= 8 && this.form.pwd === this.checkpwd) {
        assistNum++;
      }
      if (assistNum === 3) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 检验表单
    checkInput(value) {
      this.$nextTick(function() {
        if (value === 1) {
          let val = this.form.oldpwd;
          if (val) {
            if (!val.length) {
              this.regListTil.oldPasswordTil = "请输入卡号";
            } else {
              this.regListTil.oldPasswordTil = "";
            }
          } else {
            this.regListTil.oldPasswordTil = "";
          }
        }
        if (value === 2) {
          let val = this.form.pwd;
          if (!/^[A-Za-z0-9]{8,12}$/.test(val)) {
            if (!val.length) {
              this.regListTil.passwordTil = "";
            } else {
              this.regListTil.passwordTil = "请输入8-20位英文或数字";
            }
          } else {
            this.regListTil.passwordTil = "";
          }
        }

      });
    },
    confirm() {
      let data = {
        beforePassword: this.form.oldpwd,
        newPassword: this.form.pwd,
        surePassword: this.checkpwd,
        authorization: this.token
      };
      mPassword(data).then(res => {
        console.log(res.data);
        if (res.data.code === "0000") {
          this.$toast({
            message: res.data.message,
            iconClass: "icon icon-success"
          });
        } else {
          this.$toast({
            message: res.data.message,
            iconClass: "icon icon-error"
          });
        }
      });
    },
    selectBack() {
      console.log(this.$refs.showPopUp)
      this.$refs.showPopUp.show()
    },
    close() {
      this.$refs.showPopUp.hide()
    }
  },
  components: {
    PopupRadio
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" type="text/scss">
#withraw {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #21222b;
  background-size: 100% 100%;
  padding: 0 50px;
  box-sizing: border-box;
  overflow: hidden;
  .mint-header {
    background: #17181f;
    height: 88px;
    font-size: 30px;
    .mint-button {
      i {
        font-size: 40px;
        margin-left: 48px;
      }
    }
  }
  .form-wrap {
    .form-item-box {
      position: relative;
      &:first-of-type {
        margin-top: 130px;
      }
      padding-bottom: 50px;
      & > .form-item-wrap {
        display: flex;
        align-items: center;
        height: 72px;
        border-bottom: 1px solid #303241;
        .title {
          width: 100px;
          flex: 0 0 100px;
          font-size: 24px;
          color: #c5c9e2;
        }
        .right-select {
          padding-left: 30px;
        }

        &.active {
          border-bottom: 1px solid #00b07c;
          .title {
            color: #00b07c;
          }
        }
        .minus {
          color: #7c818e;
          padding: 0 38px 0 30px;
          font-size: 16px;
        }
        .select-num {
          font-size: 24px;
          color: #c5c9e2;
        }
        .triangle-wrap {
          font-size: 0;
          padding: 1.3vw;
          .triangle {
            display: inline-block;
            width: 2.4vw;
            height: 1.3vw;
            background: url("../assets/img/icon_touch.png");
            background-size: 100% 100%;
          }
        }
        & > input {
          flex: 1;
          font-size: 30px;
          background: transparent;
          border: none;
          outline: none;
          color: #c5c9e2;
        }
        input::-webkit-input-placeholder {
          color: #4f4e60;
          font-size: 24px;
        }
        & > .mint-button {
          position: absolute;
          right: 0;
          bottom: 72px;
          font-size: 20px;
          width: 156px;
          height: 54px;
          background: transparent;
          border: 1px solid #01b07d;
          color: #c5c9e2;
        }
        .count-down {
          position: absolute;
          right: 0;
          bottom: 36px;
          font-size: 20px;
          width: 172px;
          height: 54px;
          line-height: 54px;
          text-align: center;
          // background: transparent;
          // border: 1px solid #01b07d;
          color: #c5c9e2;
        }
      }
      .tip {
        position: absolute;
        bottom: 0;
        font-size: 20px;
        left: 0;
        color: #00b07c;
      }
    }

    & > .mint-button {
      margin-top: 55px;
      margin-left: 50px;
      width: 550px;
      height: 80px;
      color: #c5c9e2;
      font-size: 28px;
      background: #212c33;
      border: 1px solid #01b07d;
      border-radius: 4px;
      &.active {
        color: #fff;
        background: #00e7a3;
      }
    }
  }
}
.popup-header {
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  height: 80px;
  line-height: 80px;
  font-size: 24px;
  color: #7C7F8F;
  span {
    
  }
  .close {
    font-size: 0;
    padding: 0 10px;
    height: 100%;
    display: flex;
    align-items: center;
    width: 60px;
    .line {
      font-size: 0;
      width: 1px;
      height: 40px;
      background-color: #404358;
      margin-right: 10px;
    }
  }
}
</style>
