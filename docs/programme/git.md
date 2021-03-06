# git 操作

## 配置查看

- config 配置指令

```js
git config
```

- 查看系统 config

```js
git config --system --list
```

- 查看当前用户（global）配置

```js
git config --global  --list
```

- 查看当前仓库配置信息

```js
git config --local  --list
```

## SSH 免密与 Token 登录配置

- ssh
  - 查看 ssh 目录
    - ls -al ~/.ssh
  - 新建一个新的 SSH KEY
    ```js
      ssh-keygen -t rsa -b 4096 -C "631486004@qq.com"
    ```
    - 接着会提示这个公钥私钥的保存路径-建议直接回车就好（默认目录里)
    - 接着提示输入私钥密码 passphrase
    - 如果不想使用私钥登录的话，私钥密码为空，直接回车
  - add github id_rsa.pub
    - Github --> Settings --> SSH and GPG keys--> New SSH key
    - 把 id_rsa.pub 拷贝到 github 新建的 SSH keys 中
  - git 修改远程仓库地址
    - git remote set-url origin 新仓库地址
- Token

  - Token 申请
    - Github --> Settings --> Developer settings --> Personal access tokens
  - git 修改远程仓库地址

  ```js
    git remote set-url origin https://<TOKEN>@github.com/<user_name>/<repo_name>.git
  ```

## commit 撤销

- 查看提交记录
  ```js
      git log  (或 git log --pretty=oneline)
  ```
- 回退提交点
  - --soft
    - 不删除工作空间改动代码，撤销 commit，上次 commit 的内容以 git add 状态出现在工作区
      ```js
      git reset --soft HEAD^
      ```
      - 撤销 add 状态,回到未追踪状态
      ```js
      git restore --staged package-lock.json
      ```
  - --mixed
    - 不删除工作空间改动代码，撤销 commit，上次 commit 的内容为未追踪状态(即 git add . 操作之前的状态)
    - 这个为默认参数,git reset --mixed HEAD^ 和 git reset HEAD^ 效果是一样的。
      ```js
      git reset HEAD^
      ```
  - --hard
    - 删除工作空间改动代码，撤销 commit，撤销 git add .
    - 注意完成这个操作后，就恢复到了上一次的 commit 状态
      ```js
      git reset --hard HEAD^
      ```
- 强制提交
  ```js
  git push origin master --force
  ```
- 合并 commit 到当前分支

```js
   git cherry-pick [commit]
```

- revert 撤回提交点

```js
   git revert [commit]
```

- revert vs reset
  > revert 创建新的提交点，以撤销之前提交的更改，不改变历史提交记录
  > reset 根据不同的操作会修改历史提交记录

## git add 撤回

```js
<!-- 用库里文件直接覆盖暂存区 -->
  git reset <file>
```

## 分支同步

- fork 远程分支
  - fork 到本地不改分支名
  ```js
    git fetch
    git checkout 远程分支名
  ```
  - fork 之后改分支名
  ```js
    git checkout -b origin/远程分支名 本地分支名
    <!-- 不建立追踪时 -->
    git push origin远程分支名:本地分支名
    <!-- 建立远程追踪 -->
    git branch --set-upstream-to origin/localBranchName
  ```
- 基于远程 master 创建本地分支

```js
  git checkout -b newBrach origin/master
```

- 删除本地分支

```js
  git branch -d [branch-name]
```

- 删除远程分支

```js
  git push origin --delete [branch-name]
```

- 分支重命名

```js
    git branch -m 原分支名 新分支名
```

- 本地分支推送远程

```js
git push <远程主机名> <本地分支名>:<远程分支名>
```

## 好用常用的命令

- 使用一次新的 commit，替代上一次提交、不新增commit 记录，对已提交的需要强制push
  - 提交文案不改变
  ```js
     <!-- 按照提示修改信息就行啦 -->
     git commit --amend
  ```
  - 简写改变
  ```js
    git commit --amend --only -m 'xxxxxxx'
  ```
  - 改变提交文案
  ```js
    git commit --amend --no-edit(对已提交的且已push的commit 不好用)
  ```
  
- git stash
  - git stash save "save message":存储 stash 时 msg
  - git stash apply : 应用某个存储点 git stash apply stash@{$num} ，  比如第二个：git stash apply stash@{1}，不删除缓存
  - git stash pop ：应用所有存储点，并删除缓存
  - 对新增文件 git stash 无法识别，可以先 add 进行追踪再存储
- 分支重命名 local&remote
  - 切到要重命名的分支
  ```js
    git checkout branch_to_rename
  ```
  - 重命名当前分支
  ```js
    git branch -m new_name
  ```
  - 推到远端
  ```js
    git push origin :old_name new_name
  ```
  
  
  ## git 找回删除分支

- 查找 commitId
  > 只要提交过产生 commitId,在本地 git 的 log 历史中依然是存在的
  ```js
  git log -g
  ``` 
- 根据 commitId 创建新分分支
  ```js
    git branch branch_Name commitId
  ```
  
 ## git 删除已merge 分支
  > grep | xargs 是 linux 提供的命令，首先要了解一下 linux 的 KISS 理念，即一个命令只做一件事，但是为了协同多任务有提供了管道符，xargs 配合管道符，将上一个管道的流，作为下个命令的参数, -v 参数输出不包含指定模式的行
  
  ```js
        git branch | grep -v "main" | xargs git branch -D
  ```
### 别名配置

```JS
$ vim ~/.gitconfig
...
// [alias]
//     # compare:
//     foo = "! echo begin arg=$1/$2/end"
//     foo2 = "!f() { echo "begin arg=$1/$2/end"; }; f"
// 1. !f() { 为自执行函数 2. -D 可以删除未合并的分支，-d会抛出error中断操作
// git操作常用别名设置https://gist.github.com/natescode/aed203bb2826628993a67dfadb22302a
br-clean = "!f() {git branch | grep -v "master\|main" | xargs git branch -D }; f"
```
### 配置别名执行指定 bash 脚本

```js
// https://stackoverflow.com/questions/1309430/how-to-embed-bash-script-directly-inside-a-git-alias
// 'diffall.sh' into your $PATH anyway,
git config --global alias.diffall '!sh diffall.sh'
```
