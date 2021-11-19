# git 操作

- 配置查看

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

- SSH 免密与 Token 登录配置

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

- 撤销某单一文件已 commit 并 push 操作
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
