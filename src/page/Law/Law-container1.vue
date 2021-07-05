<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      person :[{name:"Rom",age:12 },{name:"Bob",age:22},{name:"Ma",age:5},{name:"Tony",age:6}]
    }
  },
  async created() {
    // console.log( this.arrSort(this.person,'age'))
    await this.planA()
    this.playB()
  },
  
  methods: {
    arrSort(arr,key){
      arr.sort((a,b)=>{
      // console.log(11,b[key])
        return a[key] - b[key]
      })
      return arr
    },
    planA(){
      return new Promise(resolve =>{
        setTimeout(()=>{
          console.log('planA')
          resolve(true)
        },2000)
        
      })
    },
    playB(){
      console.log('playB')
    }
  },

}
</script>

<style>

</style>