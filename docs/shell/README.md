---
sidebarDepth: 2
---

# 集锦

> 日常踩坑集锦

## 在页面上如何阻止双击
  - 单击按钮，将自己删除并替换为一条消息，以阻止双击发生。在事件处理程序中删除按钮会阻止事件冒泡。只有事件目标仍然存在于文档中时，事件才会冒泡。
## 暗黑模式的一键补救
  > 一种惰性补救，并非正在的暗黑模式
  - filter属性：滤镜通常用于调整图像，背景和边框的渲染
    - invert()：函数反转输入图像：amount 的值定义转换的比例。100% 的价值是完全反转。值为 0% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。 若值未设置值，默认为 0
```html
html {
  filter: invert(1);
}
```

## git Working tree 没有变化，commit 之后发现大量的文件修改

- 问题：
  - 文件的回车换行被改
- 根因
  - 由于历史原因，window 和 linux 下的文本文件的换行不一致
  - window 的换行，同时使用回车（CR）+ 换行（LF）
  - Mac&linux 的换行，仅仅使用换行(LF)
    |Windows| Linux/Mac |Old Mac(pre-OSX|
    |----|----|----|
    CRLF |LF| CR|
    |'\n\r'| '\n'| '\r'|
  - 仓库一般都是在 linux 环境下，文件默认以 LF 结尾
  - 在 window 环境下安装 git 时，core.autocrlf 默认为 true,即会将每一个文件自动转为以 CRLF 结尾
- 解决方案

  - CRLF=>LF
    - Crtl+S
    - yarn run lint --fix
    - 配置.prettierrc 文件
  - 最佳解决方案

    - 禁用检出提交默认转化

    ```js
       git config --global core.autocrlf false
    ```

    - repo 根目录添加.gitattributes 文件
      > 统一项目开发 git 回车换行配置(解耦 git 本地 配置)

    ```js
    * text=auto eol=lf
    ```

    - 新增文件控制

      - 在 repo 根目录添加.editorconfig

      ```js
      # EditorConfig is awesome: http://EditorConfig.org

      # top-most EditorConfig file
      root = true

      # Unix-style newlines with a newline ending every file
      [*]
      end_of_line = lf
      insert_final_newline = true
      ```

    - 应用.gitattributes 配置 批量修改

    ```js
    git add --renormalize .
    ```

- 文件回车换行
  - window - git clone(core.autocrlf=true,将文件回车换行=>\r\n,CRLF)=>vscode(setting->text Editor->file->Eol) =>git commit(hooks 或 git 将 CRLF=>LF)
    > [stackoverflow](https://stackoverflow.com/questions/2517190/how-do-i-force-git-to-use-lf-instead-of-crlf-under-windows/13154031#13154031)

### typescript非空断言
