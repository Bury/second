<template>
	<div class="store-record-box">
		<h4 class="top-box">到店总次数：{{storeRecords.count_num}}次</h4>
		<ul class="store-record-list">
			<li class="store-record-item" v-for="(item,key) in storeRecords.list">
				<div class="item-cont">
					<div class="left-img">
						<img :src="storeRecords.list[key].avatar">
					</div>
					<ul class="right-txt">
						<li class="item-time">时间：{{storeRecords.list[key].created_at | date(4)}}</li>
						<li class="store-info">门店：{{storeRecords.list[key].store_name}}</li>
						<li class="store-info">设备：{{storeRecords.list[key].device_name}}</li>
					</ul>
				</div>
			</li>
		</ul>
		<!-- 分页 -->
		<div>
			<el-pagination
				background
	            class="pagination"
	            layout="prev, pager, next"
	            small
	            @current-change="changePage"
	            :current-page="userInfoPagination.currentPage"
	            :page-size="requestParas.page_size"
	            :total="userInfoPagination.totalCount">
	        </el-pagination>
	    </div>
	</div>
</template>

<script src="@/assets/js/guest/GuestVisitedRecord.js"></script>

<style lang="scss" scoped src="@/assets/css/guest/GuestVisitedRecord.scss">
