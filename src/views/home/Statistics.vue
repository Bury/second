<!-- 首页 -->
<template>
    <div class="statistics-page">
        <div class="top-box">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="时间选择：">
                    <el-date-picker
                        v-show="ctrlTimeType[0]"
                         v-model="day"
                         type="date"
                         format="yyyy 年 MM 月 dd 日"
                         placeholder="选择日期时间"
                        :picker-options="pickerOptionsSet">
                    </el-date-picker>
                    <el-date-picker
                        v-show="ctrlTimeType[1]"
                        v-model="week"
                        type="week"
                        format="yyyy 第 WW 周"
                        placeholder="选择周"
                        :picker-options="pickerOptionsSet">
                    </el-date-picker>
                    <el-date-picker
                        v-show="ctrlTimeType[2]"
                        v-model="month"
                        type="month"
                        placeholder="选择月"
                        :picker-options="pickerOptionsSet">
                    </el-date-picker>
                    <el-date-picker
                        v-show="ctrlTimeType[3]"
                        v-model="year"
                        type="year"
                        placeholder="选择年"
                        :picker-options="pickerOptionsSet">
                    </el-date-picker>
                    <!--<el-date-picker-->
                        <!--v-model="userDefined"-->
                        <!--v-show="ctrlTimeType[4]"-->
                        <!--type="daterange"-->
                        <!--range-separator="至"-->
                        <!--start-placeholder="开始日期"-->
                        <!--end-placeholder="结束日期"-->
                        <!--:picker-options="pickerOptionsSet">-->
                    <!--</el-date-picker>-->
                  <el-date-picker :picker-options="pickerOptionsSet"
                                  v-model="times_start"
                                  v-show="ctrlTimeType[4]"
                                  type="date"
                                  placeholder="开始时间"
                                  :clearable=false
                                  onclick="clickTotal('001','进店开始时间',1)">
                  </el-date-picker>
                  <span v-show="ctrlTimeType[4]">-</span>
                  <el-date-picker :picker-options="pickerOptionsSet"
                                  v-model="times_end"
                                  v-show="ctrlTimeType[4]"
                                  type="date"
                                  placeholder="结束时间"
                                  :clearable=false
                                  onclick="clickTotal('0011','进店结束时间',1)">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
          <br/>
            <el-tabs v-model="timeType" type="card" @tab-click="cateChanged">
                <el-tab-pane label="日统计" name="day"></el-tab-pane>
                <el-tab-pane label="周统计" name="week"></el-tab-pane>
                <el-tab-pane label="月统计" name="month"></el-tab-pane>
                <el-tab-pane label="年统计" name="year"></el-tab-pane>
                <el-tab-pane label="自定义统计" name="userDefined"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="text-align: center;" v-show="noTimeHide"><span>请选择时间</span></div>
        <ul class="charts-type" v-show="!noTimeHide">
                <li class="charts-wrap">
                	<div>到店人数：<span>{{goStoreNum | numThousand}}</span>(人)</div>
                    <guest-chart :guestData="guestParameters" :changFlag="changFlag"></guest-chart>
                </li>

                <li class="charts-wrap">
                    <guest-visited-info-chart :guestVisitedInfoData="guestVisitedInfoData"></guest-visited-info-chart>
                </li>
                <!--<li class="charts-wrap">-->
                    <!--<guest-bought-info-chart :guestBoughtInfoData="guestBoughtInfoData"></guest-bought-info-chart>-->
                <!--</li>-->
                <li class="charts-wrap">
                    <guest-age-chart :ageData="ageData"></guest-age-chart>
                </li>
                <li class="charts-wrap">
                    <guest-gender-chart :guestGenderData="guestGenderData"></guest-gender-chart>
                </li>
                <li class="charts-wrap">
                    <guest-from-chart :guestFromData="guestFromData"></guest-from-chart>
                </li>
         </ul>
        </div>
</template>

<script src="@/assets/js/statistics/Statistics.js"></script>

<style lang="scss" scoped src="@/assets/css/statistics/Statistics.scss">



