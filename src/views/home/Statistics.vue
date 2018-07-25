<!-- 首页 -->
<template>
    <div class="statistics-page">
        <div class="top-box">
            <el-form :inline="true" class="demo-form-inline" size="mini">
                <el-form-item label="时间选择：">
                    <el-date-picker
                        v-if="ctrlTimeType[0]"
                        v-model="day"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                    <el-date-picker
                        v-if="ctrlTimeType[1]"
                        v-model="week"
                        type="week"
                        format="yyyy 第 WW 周"
                        placeholder="选择周">
                    </el-date-picker>
                    <el-date-picker
                        v-if="ctrlTimeType[2]"
                        v-model="month"
                        type="month"
                        placeholder="选择月">
                    </el-date-picker>
                    <el-date-picker
                        v-if="ctrlTimeType[3]"
                        v-model="year"
                        type="year"
                        placeholder="选择年">
                    </el-date-picker>
                    <el-date-picker
                        v-model="userDefined"
                        v-if="ctrlTimeType[4]"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <el-tabs v-model="timeType" type="card" @tab-click="cateChanged">
                <el-tab-pane label="日统计" name="day"></el-tab-pane>
                <el-tab-pane label="周统计" name="week"></el-tab-pane>
                <el-tab-pane label="月统计" name="month"></el-tab-pane>
                <el-tab-pane label="年统计" name="year"></el-tab-pane>
                <el-tab-pane label="自定义统计" name="userDefined"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="noData" v-if="noData">暂无数据~</div>
            <ul class="charts-type" v-else>
                <li class="charts-wrap">
                    <div style="padding:10px 0 20px;text-align:center;">
                    <el-button :chartClasstype="chartClass == 'line' ? 'primary' : ''" plain size="small" @click="switchChart('line')">折线图</el-button>
                        <el-button :chartClass="chartClass == 'column' ? 'primary' : ''" plain size="small" @click="switchChart('column')">柱状图</el-button>
                        <!-- <el-button chartClass="" plain size="small">饼形图</el-button> -->
                    </div>
                    <guest-chart :guestData="guestData" :chartClass="chartClass"></guest-chart>

                </li>
                <!--
                <li class="charts-wrap">
                    <new-old-chart :newOldData="newOldData"></new-old-chart>
                </li>
                <li class="charts-wrap">
                    <vip-chart :vipData="vipData"></vip-chart>
                </li>
                <li class="charts-wrap">
                    <age-chart :ageData="ageData"></age-chart>
                </li>
                <li class="charts-wrap">
                    <sex-chart :sexData="sexData"></sex-chart>
                </li>
                <li class="charts-wrap">
                    <device-chart :deviceData="deviceData"></device-chart>
                </li>
                -->
            </ul>
        </div>
</template>

<script src="@/assets/js/statistics/Statistics.js"></script>

<style lang="scss" scoped src="@/assets/css/statistics/Statistics.scss">



