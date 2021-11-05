module.exports={
    //声明babel可用的插件
    //特殊 webpack在调用babel-loader的时候 会先加载plugins 插件来使用
    plugins:[['@babel/plugin-proposal-decorators',{ legacy:true}]]
  }