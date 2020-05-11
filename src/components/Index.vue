<template>
  <div class="box_panel">
    <div class="box_scroller">
      <!-- 标题 s -->
      <div class="box_header">
        我的主页
        <!-- {{getCount}} -->
        <!-- <button @click="goToAdd">加</button> -->
      </div>
      <!-- 标题 e -->

      <!-- 基本信息 s -->
      <div class="box_content">
        <div class="box_titles">基本信息</div>
        <div class="box_detail">
          <div class="user_left">
            <div class="box_user"></div>
          </div>
          <div class="user_right">
            <ul class="user_info">
              <li><span class="span_user_label">姓名：</span><span class="span_user_value">{{baseInfo.userName}}</span></li>
              <li><span class="span_user_label">性别：</span><span class="span_user_value">{{baseInfo.gender}}</span></li>
              <li><span class="span_user_label">出生日期：</span><span class="span_user_value">{{baseInfo.birthday}}</span></li>
              <li><span class="span_user_label">籍贯：</span><span class="span_user_value">{{baseInfo.city}}</span></li>
              <li><span class="span_user_label">学校：</span><span class="span_user_value">{{baseInfo.school}}</span></li>
              <li><span class="span_user_label">工作年限：</span><span class="span_user_value">{{baseInfo.jobYear}}</span></li>
              <li><span class="span_user_label">手机号码：</span><span class="span_user_value">{{baseInfo.phoneNum}}</span></li>
              <li><span class="span_user_label">邮箱：</span><span class="span_user_value">{{baseInfo.eMail}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 基本信息 e -->

      <!-- 求职意向 s -->
      <div class="box_content">
        <div class="box_titles">求职意向</div>
        <div class="box_detail">
          <ul class="user_info user_info_small">
            <li><span class="span_user_label">意向岗位：</span><span class="span_user_value">{{albumsInfo.jobName}}</span></li>
            <li><span class="span_user_label">意向城市：</span><span class="span_user_value">{{albumsInfo.jobCity}}</span></li>
            <li><span class="span_user_label">薪资要求：</span><span class="span_user_value">{{albumsInfo.jobIncome}}</span></li>
            <li><span class="span_user_label">入职时间：</span><span class="span_user_value">{{albumsInfo.jobDate}}</span></li>
          </ul>
        </div>
      </div>
      <!-- 求职意向 e -->

      <!-- 教育背景 s -->
      <div class="box_content">
        <div class="box_titles">教育背景（由近到远）</div>
        <div class="box_detail">
           <Timeline>
            <TimelineItem v-for="(item,index) in schoolInfo" :key="index">
              <Icon type="ios-clock-outline" size="20" slot="dot" color="#fff"></Icon>
              <ul class="user_info user_info_middle">
                <li><span class="span_user_label">学校名称：</span><span class="span_user_value">{{item.names}}</span></li>
                <li><span class="span_user_label">教育期间：</span><span class="span_user_value">{{item.years}}</span></li>
                <li><span class="span_user_label">学历：</span><span class="span_user_value">{{item.subNames}}</span></li>
              </ul>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
      <!-- 教育背景 e -->

      <!-- 工作经历 s -->
      <div class="box_content">
        <div class="box_titles">工作经历（由近到远）</div>
        <div class="box_detail">
           <Timeline>
            <TimelineItem v-for="(item,index) in jboInfo" :key="index">
              <Icon type="ios-clock-outline" size="20" slot="dot" color="#fff"></Icon>
              <ul class="user_info user_info_middle">
                <li><span class="span_user_label">公司名称：</span><span class="span_user_value">{{item.names}}</span></li>
                <li><span class="span_user_label">工作期间：</span><span class="span_user_value">{{item.years}}</span></li>
                <li><span class="span_user_label">职业：</span><span class="span_user_value">{{item.subNames}}</span></li>
              </ul>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
      <!-- 工作经历 e -->

      <!-- 主要项目经验 s -->
      <div class="box_content">
        <div class="box_titles">主要项目经验（由近到远）</div>
        <div class="box_detail">
          <Timeline>
            <TimelineItem v-for="(item,index) in projectInfo" :key="index" :color="item.color">
              <Icon type="ios-clock-outline" size="20" slot="dot" color="#fff"></Icon>
              <div class="box_project_title">项目{{index+1}}：{{item.projectName}}（{{item.projectDate}}）</div>
              <ul class="user_info user_info_middle">
                <li class="li_large"><span class="span_user_label">项目介绍：</span><span class="span_user_value">{{item.children.projectInfo}}</span></li>
                <li class="li_large">
                  <span class="span_user_label">职务内容：</span>
                  <span class="span_user_value">
                    <div v-for="(itemSec,indexSec) in item.children.jobDetail" :key="indexSec">{{indexSec+1}}、{{itemSec}}</div>
                  </span>
                </li>
              </ul>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
      <!-- 主要项目经验 e -->

      <!-- 技能展示 s -->
      <div class="box_content">
        <div class="box_titles">技能</div>
        <div class="box_detail">
          <span class="span_labels" v-for="(item,index) in skillShortShow" :key="index">
            {{item.name}}：{{item.values}}
          </span>
        </div>
      </div>
      <!-- 技能展示 e -->
    </div>
    <!-- <el-input v-model="aa" @blur="checks" :disabled="canEdit(true)"></el-input>
    <el-input v-model="aa" @blur="checks" :disabled="canEdit(false)"></el-input> -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'Vuex'
export default {
  data () {
    return {
      baseInfo: {}, // 基本信息
      albumsInfo: {}, // 求职意向
      schoolInfo: [], // 教育背景,
      jboInfo: [], // 工作经历
      projectInfo: [], // 项目经验
      skillShortShow: [], // 技能展示
      aa: ''
    }
  },
  computed: {
    ...mapGetters({
      getCount: 'getCount'
    })
  },
  created () {
    let arr = [{id: 100}, {id: 10}, {id: 21}, {id: 11}]
    console.log(arr.sort((a, b) => {
      let tempa = a.id
      let tempb = b.id
      return tempa - tempb
    }))
    // for (let i = 0; i < arr.length; i++) {
    //   for (let j = 0; j < arr.length - i - 1; j++) {
    //     if (arr[j] < arr[j + 1]) {
    //       let temp = arr[j + 1]
    //       arr[j + 1] = arr[j]
    //       arr[j] = arr[j + 1]
    //     }
    //   }
    // }
    // console.log(arr)
    this.getUserInfo()
  },
  mounted () {
  },
  methods: {
    ...mapActions({
      toAdd: 'toAdd'
    }),
    goToAdd () {
      this.toAdd(2)
    },
    canEdit (bool) {
      let isDisabled = false // 默认可编辑(02全编辑页面)
      if (this.type === '01') {
        // 查看页面
        isDisabled = true // 不可编辑
      } else if (this.type === '03') {
        // 部分编辑页面
        if (!bool) {
          isDisabled = true
        }
      }
      return isDisabled
    },
    // 校验
    checks () {
      var reg = /^\d(\.\d{1,2})?$/
      if (!reg.test(this.aa)) {
        console.log('格式不对', this.aa)
      } else {
        console.log('格式对了', this.aa)
      }
    },
    // 获取数据
    getUserInfo () {
      this.$axios({
        method: 'get',
        url: 'static/response.json'
      }).then(response => {
        var response = response.data
        this.baseInfo = response.baseInfo// 基本信息
        this.albumsInfo = response.albumsInfo// 求职意向
        this.schoolInfo = response.schoolInfo// 教育背景
        this.jboInfo = response.jboInfo// 工作经历
        this.projectInfo = response.projectInfo// 项目经验
        this.skillShortShow = response.skillShortShow// 技能展示
      }).catch(err => {

      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
