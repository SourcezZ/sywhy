//const STORAGE_KEY = 'todos-vuejs'
export default {
    fetchTodoList() {
        return JSON.parse(window.localStorage.getItem('todoList')||'[]')
    },
    saveTodoList(items) {
        window.localStorage.setItem('todoList', JSON.stringify(items))
    },
    fetchStar() {
        return (Number(window.localStorage.getItem('star'))||null)
    },
    saveStar(star){
        window.localStorage.setItem('star', star)
    },
    fetchUsername(){
        return (window.sessionStorage.getItem('username'))
    },
}