---
category: code
layout: blog
title: Commander教程
date: 06/29-2021 16:09
coverImage: https://i.loli.net/2021/06/09/likAPwq4rTvBxfZ.png
tags:
  - Node.js
  - JavaScript
  - Tutorials
description: Commander的简单使用
stick: false
wip: true

---

## 介绍

[Commander](https://www.npmjs.com/package/commander)是[tj](https://github.com/tj/)大神开发的一款针对NodeJS的完整命令行解决方案。
广泛用于前端脚手架的开发，例如大名鼎鼎的`Vue-CLI`等，最新版本为8.x (记录于2021-06-29)


## 安装

```shell
# use NPM
npm install commander
# use Yarn
yarn add commander
```


## 使用

以`vue create`命令为例

### ![对照](https://i.loli.net/2021/06/29/Es4Ao1XtmrvScJq.png)获取Commander实例

+ 在JavaScript中使用

```javascript
// 在JavaScript中使用
const { program } = require('commander')
```

+ 在TypeScript中使用

```shell
# 安装对应type声明文件
npm i @types/commander -D
# 或者
yarn add @types/commander -D
```

```typescript
// 在TypeScript中使用, commander有对应type声明文件
import { program } from 'commander'
```

### 命令(Command)

你可以使用`.command(命令定义, 命令描述)`或者`.addCommand()`来为`program`添加指定命令.  
其中`命令定义`可以使用以下形式
+ `program.command('command')`
+ `program.command('command <argument>')`
+ `program.command('command [argument]')`
+ `program.command('command <argument1> [argument2]')`

例如:

+ 标准使用
```javascript
const { program } = require('commander')

program
    .command('create')
    .description('命令描述')
    .action(() => {
        console.log('执行 create')
    })

program
    .command('hidden-create', { hidden: true })
    .description('不会显示在帮助信息中')
    .action(() => {
        console.log('执行 hidden create')
    })

program
    .command('hidden-default', { hidden: true, isDefault: true })
    .description('不会显示在帮助信息中, 且默认执行这个命令')
    .option('-p --port <port>', '端口', 80)
    .action(async (option) => {
        console.log('执行 hidden default, port is', option.port)
        await new Promise(resolve => {
            console.log('正在执行 hidden default...')
            setTimeout(() => {
                resolve(true)
            }, 3000)
        })
        console.log('执行 hidden default 完毕')
    })
    
// 同步用parse(), 异步用这个
// 默认参数为process.argv
program.parseAsync() 

// $ node ./bin/command/basic.js create
// -> 执行 create

// $ node ./bin/command/basic.js
// -> 执行 hidden default, port is 80
// -> 正在执行 hidden default...
// -> 执行 hidden default 完毕
```

+ 嵌套命令
```javascript
const { program } = require('commander')
const drink = program.command('drink')

drink
	.command('coffee')
	.action(() => {
		console.log('喝咖啡☕️')
	})

drink
	.command('tea')
	.action(() => {
		console.log('喝茶🍵')
	})
program.parse()

// $ node ./bin/demo.js drink tea  
// 喝茶🍵
```

+ 使用`addCommand()`方法添加嵌套命令
```javascript
function eat () {
	const eat = new commander.Command('eat')
	eat
		.command('bread')
		.action(() => {
			console.log('吃面包🍞')
		})

	eat
		.command('drumstick')
		.action(() => {
			console.log('吃鸡腿🍗')
		})
	return eat
}

program.addCommand(eat())
program.parse()

// $ node ./bin/demo.js eat bread
// 吃面包🍞
```

### 参数(Argument)

`argument`用来为命令程序添加可输入的必填/选填参数  
大致有下面几种添加方式👇

+ 必填参数: 不可带默认值, 否则会抛出错误`a default value for a required argument is never used: '参数名'`
  + `.argument(<必填参数>)`: 指定必填参数
  + `.argument(<必填参数>, 参数描述)`: 指定必填参数并携带描述信息
  + `.argument(<必填参数>, 参数描述, 参数处理方法)`: 可以指定处理方法来处理参数

+ 可选参数
  + `.argument([可选参数])`: 指定可选参数
  + `.argument([可选参数], 参数描述)`: 指定可选参数并携带描述信息
  + `.argument([可选参数], 参数描述, 默认值)`: 指定可选参数,描述信息以及默认值
  + `.argument([可选参数], 参数描述, 参数处理方法, 默认值)`: 可以指定处理方法来处理参数

+ 可变数量参数
  + `.argument(<args...>, 参数描述)`: 指定可变数量必填参数
  + `.argument([args...], 参数描述, 默认值)`: 指定可变数量可选参数
  + `.argument([args...], 参数描述, 参数处理方法, 默认值)`: 指定可变数量可选参数
  
+ 单次定义多参数
  + `.arguments(<必填参数1> <必填参数2> [可选参数])`: 指定多参数, 但不能添加描述
  
+ 也可以使用下面这种**不常用**的方法来获得额外配置
	`.addArgument(Argument)`: 使用方式请看例6

🌰 例子

+ 标准写法

```javascript
const { program } = require('commander')
program
    .command('test <name> [age]')
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })
program.parse()
// $ node ./bin/command-arguments.js test lihowe           
// 名字是: lihowe
// 年龄是: undefined

// $ node ./bin/command-arguments.js test lihowe 18
// 名字是: lihowe
// 年龄是: 18
```

+ 混用

```javascript
const { program } = require('commander')
program
    .command('test [age]')
    .argument('<name>', '名字')
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })
program.parse()
// $ node ./bin/command-arguments.js test lihowe 18
// 名字是: lihowe
// 年龄是: 18
```

+ 全部使用`argument`定义`command`参数

```javascript
const { program } = require('commander')
program
    .command('test')
    .argument('<name>', '名字')
    .argument('[age]', '年龄', '18')
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })
program.parse()
// $ node ./bin/command-arguments.js test lihowe
// 名字是: lihowe
// 年龄是: 18

// $ node ./bin/command-arguments.js test lihowe 1
// 名字是: lihowe
// 年龄是: 1
```

+ 使用`arguments`一次定义多个参数

```javascript
const { program } = require('commander')
program
    .command('test')
    .arguments('<name> [age]')
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })
program.parse()
// $ node ./bin/command-arguments.js test lihowe 18
// 名字是: lihowe
// 年龄是: 18
```

+ 使用`...`来接收可变数量参数

```javascript
const { program } = require('commander')
program
    .command('test')
    .argument('<args...>')
    .action((args) => {
        console.log('多参数,分别是:', )
        args.forEach(arg => {
            console.log(arg)
        })
    })
program.parse()
// $ node ./bin/command-arguments.js test arg1 arg2 li howe lihowe
// 多参数,分别是:
// arg1
// arg2
// li
// howe
// lihowe
```

+ 添加参数处理方法来处理单参数

```javascript
const { program } = require('commander')
program
    .command('test')
    .argument('[arg]', '单参数', (value) => {
        console.log('处理器接收值为:', value)
        console.log('处理器返回值为:', value + 'suffix')
        return value + 'suffix'
    },'default value')
    .action((arg) => {
        console.log('action接收值为:', arg)
    })
program.parse()
// $ node ./bin/command-arguments.js test a
// 处理器接收值为: a
// 处理器返回值为: asuffix
// action接收值为: asuffix
```

+ 添加参数处理方法来处理多参数

```javascript
const { program } = require('commander')
const args = []
program
    .command('test8')
    .argument('[args...]', '多参数', (value) => {
        console.log('处理器接收值为:', value)
        args.push(value)
        return args
    },['arg1', 'arg2'])
    .action((args) => {
        console.log('多参数,分别是:')
        args.forEach(item => {
            console.log(item)
        })
    })

program.parse()
```

+ 使用`addArgument`来添加参数

```javascript
const { program, Argument } = require('commander')
program
    .command('test')
    .addArgument(new Argument('<name>', '名字').choices(['li', 'howe', 'lihowe'])) // 用于限制名字输入, 名字的值必须在['li', 'howe', 'lihowe']中
    .addArgument(new Argument('[age]', '年龄').default(18, '默认值描述: 年年18岁'))
    .action((name, age) => {
        console.log('名字是:', name)
        console.log('年龄是:', age)
    })
    
// $ node ./bin/command-arguments.js test lih
// error: command-argument value 'lih' is invalid for argument 'name'. Allowed choices are li, howe, lihowe.

// node ./bin/command-arguments.js test li   
// 名字是: li
// 年龄是: 18

// node ./bin/command-arguments.js test li 1
// 名字是: li
// 年龄是: 1
```

### 操作(Action)

`action`用来设置命令接收到一系列参数后的具体操作
`.action()`方法参数数量为该命令的`argument`数量 + 2(`options`, `command`)

🌰 例子

```javascript
const { program } = require('commander')

program
  .command('demo') // 如果不定义command, 则 command.name 为文件名
  .argument('<name>')
  .argument('[age]')
  .option('-t, --title <title>', 'title to use before name')
  .option('-d, --debug', 'display some debugging') // 因为不接收输入, 所以类型为boolean
  .action((name, age, options, command) => {
    if (options.debug) {
      console.error('Called %s with options %o', command.name(), options);
    }
    const title = options.title ? `${options.title} ` : '';
    console.log(`Thank-you ${title}${name} ${age}`);
  })

program.parse()
// $ node ./bin/command-action.js demo lihowe -t giao 18 -d
// Called demo with options { title: 'giao', debug: true }
// Thank-you giao lihowe 18
```

### 选项(Option)

`option`选项是指命令行中常见的如`-v`, `--save`, `-D`等参数, 这些选项参数通过`.option()`方法来定义, 定义的同时可以附加选项简介。  

每个`option`可以定义一个短名称(如`-v`, `-`后面接一个字符)以及一个长名称(如`--version`, `--`后面接一个或多个单词, 多个单词推荐用`-`连接,如`--save-dev`, 取值的时候字段名会转换为**驼峰的形式(saveDev)**), **如果定义了长名称, 则长名称将作为option的字段名, 否则使用短名称作为字段名**  

多个短选项在使用过程中可以合并进行简写, 最后一个选项可以附加参数(argument), 如`-a -b -p 80`可以写成`-ab -p80`或者 `-abp80`  

`command`实例默认定义有`-h, --help`选项, 用于显示默认生成的命令帮助(可以被覆盖掉)

+ 基本用法与`argument`很相似
  + `.option('-短名称, --长名称')`: 短名称与长名称之间的分割符可以是`逗号`，`空格`或者`|`
  + `.option('-短名称, --长名称 <必填参数>', 描述(可选), 参数默认值(可选))
  + `.option('-短名称, --长名称 [可选参数]', 描述(可选), 参数默认值(可选))
  + `.option('-短名称, --长名称 <可变数量必填参数...>', '描述(可选)')`
  + `.option('-短名称, --长名称 [可变数量可选参数...]', '描述(可选)')`

+ 可以使用`--`来表明`option`的结尾, `--`后面的参数将会被忽略掉

🌰 例子

```javascript
const { program } = require('commander')

program
    .option('-d --debug', '空格分隔')
    .option('-a, --all', '逗号分隔')
    .option('-t | --test', '|分隔')
    .option('-p <port>', '接收参数', 80) // 默认值 80
    .option('-B', '只有短名称')
    .option('--save', '只有长名称')
    .action((options) => {
        console.log(options)
    })

program.parse()

// 下面命令都是同样效果
// $ node ./bin/options.js -d -p 90
// $ node ./bin/options.js -dp 90
// $ node ./bin/options.js -dp90
// $ node ./bin/options.js -p90 -d
// $ node ./bin/options.js -p 90 -d
// $ node ./bin/options.js -p 90 -d -- -B --save
// -> { p: '90', debug: true }
```

```javascript
const { program } = require('commander')

program
    .option('-n --number [numbers...]', '可选可变数量参数', [100, 86])
    .option('-s <second...>', '必填可变数量参数')
    .action(option => {
        console.log(option)
    })

program.parse()

// $ node ./bin/option/variadic.js -n 1 2 3 -s 1 2 3
// -> { number: [ '1', '2', '3' ], s: [ '1', '2', '3' ] }

// $ node ./bin/option/variadic.js -n -s 1 2 3
// $ node ./bin/option/variadic.js -s 1 2 3 
// -> { number: [ 100, 86 ], s: [ '1', '2', '3' ] }

// $ node ./bin/option/variadic.js -n
// -> { number: [ 100, 86 ] }
```

+ 可以使用`.opts()`方法来获取`command`对象上的option定义

```javascript
const { program } = require('commander')
const a = program
    .command('simple-option')
    .option('-d --debug', 'debug', true)

console.log(a.opts())
program.parse()
```

+ 可以使用`--no-`前缀来定义默认值为`true`的长命令选项

```javascript
const { program } = require('commander')
program
    .command('negative-option')
    .option('--no-debug', '表明默认debug为true')
    .action((options) => {
        console.log(options)
    })
program.parse()

// $ node ./bin/options.js negative-option
// -> { debug: true }

// $ node ./bin/options.js negative-option --no-debug
// -> { debug: false }
```

```javascript
const { program } = require('commander')
program
    .command('negative-option')
    .option('--no-debug', '表明默认debug为true')
    .option('-d --debug', '描述', false)
    .action((options) => {
        console.log(options)
    })
program.parse()

// $ node ./bin/options.js negative-option
// -> { debug: false }

// $ node ./bin/options.js negative-option --debug
// $ node ./bin/options.js negative-option -d      
// -> { debug: true }

// $ node ./bin/options.js negative-option --debug --no-debug
// -> { debug: false }

// $ node ./bin/options.js negative-option --no-debug --debug
// -> { debug: true }
```

+ 可以使用`addOption`方法对option进行更多配置

```javascript
const { program, Option } = require('commander')

program
    .addOption(new Option('-s --secret', 'hideHelp -- 不会在命令帮助信息的Options列表中显示').hideHelp())
    .addOption(new Option('-d --delay <delay>', '设置必填参数的默认值').default(60, '一分钟'))
    .addOption(new Option('-m --mode <mode>', '限制输入选项').choices(['normal', 'debug']))
    .action(option => {
        console.log(option)
    })

program.parse()

/*
$ node ./bin/option/advanced.js -h

Usage: advanced [options]

Options:
  -d --delay <delay>  设置必填参数的默认值 (default: 一分钟)
  -m --mode <mode>    限制输入选项 (choices: "normal", "debug")
  -h, --help          display help for command
*/

// $ node ./bin/option/advanced.js
// -> { delay: 60 }

// $ node ./bin/option/advanced.js -m n
// -> error: option '-m --mode <mode>' argument 'n' is invalid. Allowed choices are normal, debug.

// $ node ./bin/option/advanced.js -m normal
// -> { delay: 60, mode: 'normal' }

```

+ 也可以自定义`option`值处理函数
与`argument`的处理函数一样, `option`定义的默认值**不会**调用处理函数

```javascript
const { program } = require('commander')

program
    .option('-d --double <number>','超级加倍', (val) => {
        return parseInt(val, 10) * parseInt(val, 10)
    }, 10)
    .action(option => {
        console.log(option.double)
    })
program.parse()

// $ node ./bin/option/processer.js -d 4
// -> 16

// $ node ./bin/option/processer.js
// -> 10
```

### 版本(Version)

`.version()`用来设置命令当前版本, 默认选项标识为`-V` 和 `--version`  
默认标识可以通过类似于`option`的语法进行覆盖, 可以参考下面例子

举🌰说明
```javascript
program
    .command('base-version')
    .version('0.0.1')

program
    .command('custom-version')
    .version('0.0.2', '-t --ver', '可以自定义版本选项')

program.parse()

// $ node ./bin/option/version.js base-version -V
// $ node ./bin/option/version.js base-version --version
// -> 0.0.1

// $ node ./bin/option/version.js custom-version -t
// $ node ./bin/option/version.js custom-version --ver
// -> 0.0.2
```


### 独立可执行(子)命令
当以`.command(命令, 描述)`方式设置命令的时候, Commander将会使用** 独立可执行文件(即 每个command都是一个单独的文件) **的形式来定义命令, 如

```javascript
// main.js
const { Command } = require('commander')
const program = new Command()

program
    .version('0.0.1')
    .description('独立运行命令')
    .command('run', '执行命令')
    .command('test', '测试').alias('t')
    .command('install [name]', '安装').alias('i') // 为install起别名i
    .command('update', '更新', { executableFile: 'basic'}) // 自定义文件名称

program.parse()

// 👆上面定义的这些命令分别对应的命令文件为
// run -> main-run
// test -> main-test
// install -> main-install
// upate -> basic
```


### 生命周期钩子(Hook)

目前支持两个生命周期阶段
+ preAction: 命令动作执行前
+ postAction: 命令动作执行后

















