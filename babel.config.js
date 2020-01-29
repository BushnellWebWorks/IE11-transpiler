const presets = [
    ["@babel/preset-env", {
      "targets":{
        "ie":"11"
      },
      "useBuiltIns": "usage",
      //"debug": true
    }]
]
module.exports = { presets }
