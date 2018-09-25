<template>
    <div style="width: 340px;background: #fff;height: 260px;">
      <div class="top">
        <div class="top-text">客流量</div>
        <div class="top-num">109</div>
      </div>
      <div class="bottom">
        <div>
          <div class="bottom-num">174</div>
          <div class="bottom-text">订单数</div>
        </div>
        <div style="border-left: 1px solid #ededed;border-right: 1px solid #ededed;">
          <div class="bottom-num">174</div>
          <div class="bottom-text">销售额</div>
        </div>
        <div>
          <div class="bottom-num">17.4%</div>
          <div class="bottom-text">成交率</div>
        </div>
      </div>
    </div>
</template>

<script>
  import statisticsApi from '@/api/statistics'
    export default {
        name: "totalGuest",
        props: {
          totalData: {
            type: Object,
          }
        },
      created:function(){
          this.dataList();
      },
      methods:{
          dataList(){
            let startTime = new Date();
            console.log(startTime);
            // let timeEnd = new Data();
            // let list = {
            //   'time_start': startTime,
            //   'time_end': timeEnd,
            // }

          }
      }
    }
</script>

<style scoped>
.top{
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
}
.top-text{
  margin: 2.5rem auto 2rem;
  font-size: 1rem;
  color: #999;
}
.top-num{
  padding-bottom: 1.5rem;
  color: #ff6953;
  font-size: 4rem;
  width: 25rem;
  border-bottom: 1px solid #ededed;
}
  .bottom{
    text-align: center;
    display: flex;
    overflow: hidden;
    margin-top: 2.5rem;
  }
  .bottom>div{
    width: 33.33%;
  }
  .bottom-num{
    color: #2a2a2a;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  .bottom-text{
    color: #999;
    font-size: 1rem;
  }
</style>
