### 基于React Redux Antd design Django...开发
**儿童服务器到期啦。页面跑起来看吧**

**提示：**
- 是一个迎接新生到来的一个项目，新生可以到这个网页上了解更多关于学校的东西。可以分享周边信息，可以发帖交流等等。
- 项目已经部署至阿里云，由于我学生的身份还有两个月就没了。心里还是不怎么好受的。买了两个月的阿里云轻应用服务器，所以这个线上的东西只能存活2个月啦。以后有机会再重启好了。
- 用七牛云搭建的图床。很喜欢七牛云，只需要一个上传凭证就可以以接口的形式上传图片并返回外链。[图床用法](https://gzhiyi.github.io/2018/04/17/React-Antd-Design%E7%BB%84%E4%BB%B6%E5%BA%93%E6%90%AD%E9%85%8D%E4%B8%83%E7%89%9B%E4%BA%91%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87/)
- 额。后端用的是Django，所以，对一个前端来说，不值得看。当你知道那些接口是我一个礼拜搞出来的，你就不想看后端了哈哈。不过整体而言，用Django写Rest还是很舒服的。
- 这是我的毕业设计。当然，通过答辩了，虽然问题问的。。。。。

### 命令行提示
- 命令行以`$`开头的，是用户权限（user）就可以跑的命令。
- 以`#`开头需要root privileges。

### 拉取代码
```bash
$ git clone git@github.com:GzhiYi/school.git
$ git checkout develop
```

### 安装（Running NO DOCKER）
- 安装node工具
```bash
$ wget -qO- https://deb.nodesource.com/setup_6.x | sudo bash -
$ apt-get install --yes nodejs
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.
$ sudo apt-get update && sudo apt-get install yarn
```
- 这样子你就可以用yarn啦。
- 编译项目然后跑起来
```bash
$ yarn
$ yarn run dev # 开发模式，保存代码webpack就会自动编译
```
- 你有安装postgreSQL数据库吗？没有就去安装
```bash
# 创建数据库 guangyao_dev
$ sudo su - postgres
$ createdb guangyao_dev
```
- 开另一个terminal窗口，创建虚拟环境
```bash
$ [sudo] pip install virtualenv # 如果你没安装就需要安装
$ virtualenv -p /usr/bin/python3 virtualenv # 创建python虚拟环境virtualenv
$ source qodstarenv/bin/activate # 进入虚拟环境
$ pip install -r requirements/base.txt # 安装基本python依赖包
$ pip install -r requirements/prod.txt # 安装开发依赖包
$ cd src
$ python manage.py migrate
$ python manage.py runserver
```
- 跑起来之后就可以访问。[http://localhost:8000/](http://localhost:8000/)
