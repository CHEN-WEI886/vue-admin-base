<template>
  <div>法律法规入库</div>
</template>

<script>
import { toTree } from '@/assets/commonJs/until'
export default {
  data() {
    return {
      json: [
      {
        id: "01",
        pId: "",
      },
      {
        id: "01_01",
        pId: "01",
      },
      {
        id: "01_02",
        pId: "01",
      },
      {
        id: "01_02_01",
        pId: "01_02",
      },
      {
        id: "02",
        pId: "",
      },
      {
        id: "02-01",
        pId: "02",
      },
      {
        id: "02-02",
        pId: "02",
      },
      {
        id: "03",
        pId: "",
      },
      {
        id: "03_01",
        pId: "03",
      },
    ]
    };
  },
  mounted() {
    console.log(toTree(this.json))
    
  },
  methods: {

  },
};
</script>

<style>
</style>