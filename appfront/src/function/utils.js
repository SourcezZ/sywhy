export default {
    getUrl () {
        var url = window.location.href
        if (url.includes(':8080')) {
            url = url.substring(0, url.lastIndexOf(":")) + ':8000/'
        }
        if (!url.includes(':8000')) {
            url = url.substring(0, url.length - 1) + ':8000/'
        }
        return url
    }
}
