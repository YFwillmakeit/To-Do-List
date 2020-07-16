<template>
  <li @mouseenter="mouseEnter(true)" @mouseleave="mouseEnter(false)" :style="{background:bgColor}">
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>

<script>
  import Pubsub from 'pubsub-js'
  export default {
    name: "Item",
    props: {
      todo: {
        type: Object,
        required: true
      },
      index: Number,
      // deleteI: Function
    },
    data () {
      return {
        bgColor: 'white',
        isShow:false
      }
    },
    methods: {
      mouseEnter (isEnter) {
        if(isEnter){
          this.bgColor = 'gray';
          this.isShow = true

        }else{
          this.bgColor = 'white';
          this.isShow = false
        }

      },
      deleteItem () {
        const {deleteI,index} = this
        if(window.confirm(`真的要删除吗？`)){
          // deleteI(index)
          PubSub.publish('deleteI',index);
        }
      }
    }
  }
</script>

<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    /*display: none;*/
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
