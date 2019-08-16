<template>
    <div class="helloworld">
        <h1>{{ msg }}</h1>
        <h1 v-for='post in posts' :key='post.id' :content='post.content' :post="post">
            {{ post.id + '：' + post.content }}
        </h1>
    </div>
</template>

<script>
export default {
    name: "helloworld",
    props: ["title1", "post"],
    data () {
        return {
            msg: this.title1,
            posts: [{ id: 1, content: "im one" }, { id: 2, content: "im two" }]
        };
    },
    methods: {
        put: function () {
            alert("hello");
        }
    }
};
</script>