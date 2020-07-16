<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isAllChecked"/>
    </label>
    <span>
          <span>已完成{{computedSize}}</span> / 全部{{todos.length}}
        </span>
    <button class="btn btn-danger" @click="deleteCompleteTodos" v-show="computedSize">清除已完成任务</button>
  </div>
</template>

<script>
  export default {
    name: "Footer",
    props: {
      todos: Array,
      deleteCompleteTodos: Function,
      selectAllTodos: Function
    },
    computed: {
      computedSize () {
        return (this.todos.filter(todo => todo.complete === true)).length
        // return this.todos.reduce((preTotal,todo) => preTotal + (todo.complete?1:0),0)
      },
      isAllChecked: {
        get () {//返回当前isAllChecked的属性数据
          return this.computedSize === this.todos.length && this.computedSize>0
        },
        set (value) {//value是当前isAllChecked的属性数据
          this.selectAllTodos(value)
        }
      }
    }
  }
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
