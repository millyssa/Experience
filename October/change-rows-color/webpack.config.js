const path=require('path');

//1.导入html-webpack-plugin这个插件，得到插件的构造函数
const HtmlPlugin=require('html-webpack-plugin');
//2.new构造函数，创建插件的实例对象
const htmlPlugin=new HtmlPlugin({
  //指定要复制哪个页面
  template:'./src/index.html',
  //指定复制出来的文件名和存放路径
  filename:'./index.html'
}
)
//注意 左侧的{} 是解构赋值 [右边是一个 CleanWebpackPlugin function()]
const { CleanWebpackPlugin }=require('clean-webpack-plugin');
const { resolve } = require('path');

//使用node中的导出语法，向外导出一个webpack的配置对象
module.exports={
    //在开发调试阶段，建议大家都把devtool设置为eval-source-map
    //如果省略devtool选项，则最终生成的文件不包含 source Map
    // devtool:'eval-source-map',
    //在实际发布的时候，建议大家把devtool的值设置为 nosource-source-map 或直接关闭source Map
    devtool:'nosources-source-map',

    //代表 webpack运行的模式 可选值有两个development和production
    //production模式会压缩文件,体积减少,打包时间变长，
    mode:"development",
    //entry指定要处理哪个文件
    entry: path.join(__dirname, './src/index1.js'),
    // 指定生成的文件要存放到哪里
    output: {
      // 存放的目录
      path: path.join(__dirname, 'dist'),
      // 生成的文件名
      filename: 'js/bundle.js'
    },
    //3.插件的数组，将来webpack在运行时，会加载并调用这些插件,存放在内存中
    plugins:[htmlPlugin,new CleanWebpackPlugin()],

    devServer:{
      //首次打包成功后，自动打开浏览器
      open:true,
      //在http协议中，如果端口号是80，则可以被省略
      port:80,
      //指定运行的主机地址
      //host:'127.0.0.1'
    },

    module:{
      rules:[
        //定义了不同模块对应的loader
        { test:/\.css$/,use:['style-loader','css-loader']},
        //处理.less 文件的loader
        { test:/\.less$/,use:['style-loader','css-loader','less-loader']},
        //处理url路径相关的文件
        //？之后的是loader的参数源
        //limit 用来指定图片的大小，单位是字节（byte）
        //如果需要调用的loader只要一个，则只传递一个字符串也行，如果多个loader，则必须指定数组
        //在配置url-loader的时候，多个参数之间，使用&符号进行分割
        { test:/\.png|jpg|gif$/,use:'url-loader?limit=10770&outputPath=images'},
        //使用balel-loader 处理
        //在配置babel-loader 的时候，程序员只需要自己的代码转换即可，一定要排除 node_modules目录的js文件
        { test:/\.js$/,use:'babel-loader',exclude:/node_modules/}

      ]
    },

    resolve:{
      alias:{
        //告诉@是src目录
        '@':path.join(__dirname,'./src/')
      }
    }


}
