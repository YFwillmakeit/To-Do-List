<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <Header @add="add"/>
        <List :todos="todos"/>
        <Footer :todos="todos" :deleteCompleteTodos="deleteCompleteTodos" :selectAllTodos="selectAllTodos"/>
      </div>
    </div>
    <!--3、使用子组件标签-->
  </div>
</template>

<script>
//1、引入子组件
import Pubsub from 'pubsub-js' //消息订阅与发布
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'

export default {
  name: 'App',
  data () {
    return {// localStorage读取数据
      todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
    }
  },
  mounted () { // 执行异步代码
    // 订阅消息
    Pubsub.subscribe('deleteI', (msg, index) => this.deleteI(index))
  },
  components: {// 2、映射子组件标签
    Header,
    List,
    Footer

  },
  methods: {
    add (todo) {
      this.todos.unshift(todo)
    },
    deleteI (index) {
      this.todos.splice(index, 1)
    },
    // 删除所有选中的todo,也就是留下complete值为false的
    deleteCompleteTodos () {
      this.todos = this.todos.filter(todo => !todo.complete)
    },
    // 全选/全不选
    selectAllTodos (isCheck) {
      this.todos.forEach(todo => { todo.complete = isCheck })
    }

  },
  watch: {
    todos: {
      deep: true,
      handler: function (value) { // localStorage存储数据
        window.localStorage.setItem('todos_key',JSON.stringify(value))
      }
    }
  }
}
</script>

<style>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

</style>
