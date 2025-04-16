<template>
  <div class="merchant-rank-component">
    <slot>
      <div v-if="merchantNo">
        <span v-if="merchantNo.length <= 10" class="merchant-rank-component_num">{{ merchantNo }}</span>
        <el-tooltip v-else-if="showTips=='1'" :content="merchantNo" placement="top">
          <span class="merchant-rank-component_num">{{ `${merchantNo.substring(0, 10)}...` }}</span>
        </el-tooltip>
        <span v-else class="merchant-rank-component_num">{{ merchantNo }}</span>
      </div>
    </slot>
    <img v-if="rankLevel && [1010, 1020, 1030, 1040, 1050].indexOf(+rankLevel) > -1" :src="require(`./img/icon_rank_${rankLevel}.png`)" class="merchant-rank-component_icon" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    rankLevel: {
      type: [String, Number],
      default: ''
    },
    merchantNo: {
      type: [String],
      default: ''
    },
    //是否显示tips，1:显示,0:不显示
    showTips:{
      type: [String],
      default: '1',
    }
  }
}
</script>

<style lang="scss"scoped>
.merchant-rank-component {
  display: inline-flex;
  align-items: center;
  &_num {
    font-size: 12px;
    color: #606266;
  }
  &_icon {
    padding-left: 4px;
    width: 32px;
    height: 16px;
  }
}
</style>
