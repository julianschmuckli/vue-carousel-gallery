module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "file-loader",
      {
        "name": "[hash].[ext]",
        "extensions": ["png", "jpg", "jpeg", "gif", "svg"],
        "publicPath": "/public",
        "outputPath": "/public",
        "context": "",
        "limit": 0
      }
    ]
  ]
}
