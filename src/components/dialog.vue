<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="isDialog"
      :width="width"
      :before-close="handleClose"
    >
			<slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialog = false">{{cancelText}}</el-button>
        <el-button v-if="isConfim" type="primary" @click="save">{{confimText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
	name: 'dialog',
  props: {
		value:{
			type: String,
			default:''
		},
		width:{
			type: String,
			default:'30%'
		},
		title:{
			type: String,
			default:'标题'
		},
		confimText:{
			type: String,
			default:'确定'
		},	
		isConfim:{
			type: Boolean,
			default:true
		},	
		cancelText:{
			type: String,
			default:'取消'
		},
	},
	data(){
		return{
			isDialog: false
		}
	},
	methods:{
		openDialog(){
			this.isDialog = true
		},
		save() {
			this.$emit('confim')
      this.isDialog = false;
    },
		handleClose() {
			this.isDialog = false;
		},
	},
};
</script>

<style>
</style>