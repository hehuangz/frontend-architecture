module.exports = (isDev) => {
    return {
        preserveWhiteSpace: true, // template 中元素多余的空格会去掉
        extractCSS: !isDev, //为true时，打包的时候一次性将所有样式打包到一个文件夹中，但是这样不方便做异步加载，默认false
        cssModules: {}
    }
}