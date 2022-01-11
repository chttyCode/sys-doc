-   style
    -   全局样式定义
        -   reset
            -   https://github.com/shannonmoeller/reset-css/blob/master/sass/_reset.scss
        -   mixin
            -   定义工具函数
        -   variables
            -   定义项目变量
        -   文件以下划线命名标识为代码片段，不会编辑成 css 文件
-   component
    -   props 类型定义
        -   集成支持原生属性
        -   集成支持原生属性
    -   default 默认值设置
-   storybook

    -   配置

        -   storybook 是一个用于开发 UI 组件的开源工具，是 UI 组件的开发环境
        -   @storybook/react 是 React 的运行环境
        -   @storybook/addon-essentials 是 storybook 最好插件的合集

        ```js
            npm i @storybook/react   @storybook/addon-essentials @storybook/addon-links @storybook/addon-postcss @storybook/preset-scss   @storybook/builder-webpack5 @storybook/manager-webpack5   -D
        ```

        -   不支持 scss
            -   https://www.npmjs.com/package/@storybook/preset-scss
        -   TypeError: this.getOptions is not a function

            -   sass-loader 版本 vs webpack(storybook cli ) 版本冲突，尝试降级 sass-loader[未能解决问题](https://www.ouyanting.com/archives/2021/12/e3ba245d.html)
            -   手动升级 storybook 的 webpack 至 5

            ```js
                npm i  @storybook/builder-webpack5 @storybook/manager-webpack5   -D

                core: {
                    builder: 'webpack5',
                },

            ```

        -   script

        ```js
        "storybook": "start-storybook -p 6006",
        "build-storybook": "build-storybook"
        ```

    -   支持的 story 格式
        -   mdx 类似 jsx
        -   \*.tsx

-   test

    -   配置

        -   https://jestjs.io/docs/configuration
        -   jest 是一个令人愉快的 JavaScript 测试框架
        -   Enzyme 用于 React 的 JS 测试工具
        -   puppeteer 是一个控制 headless Chrome 的 Node.js API
        -   jest-image-snapshot 执行图像比较的 Jest 匹配器,对于视觉回归测试非常有用
        -   sinon 提供测试工具函数[sinon](https://segmentfault.com/a/1190000010372634)
        -   chai equal、a/an、ok、match 工具函数的断言库

        ```js
           npm i  jest @types/jest  @wojtekmaj/enzyme-adapter-react-17 puppeteer@10.4.0 @types/puppeteer jest-environment-puppeteer  @types/jest-environment-puppeteer jest-puppeteer  jest-image-snapshot @types/jest-image-snapshot  enzyme  @types/enzyme   --ignore-scripts   --D
        ```

        -   e2e

            -   ERROR: Failed to set up Chromium r938248! Set "PUPPETEER_SKIP_DOWNLOAD" env variable to skip download.

            ```js
                npm i puppeteer --ignore-scripts
            ```

            或.npmrc

            ```js
            PUPPETEER_SKIP_DOWNLOAD = true;
            ```

            -   error
                ```js
                    Error: Jest: Got error running globalSetup - C:\Users\k00557313\Desktop\Tmp\reactTmp\node_modules\jest-environment-puppeteer\setup.js, reason: Could not find expected browser (chrome) locally. Run `npm install` to download the correct Chromium revision (938248).
                ```
                -   解决方案
                    -   设置 npm 源
                    ```js
                        npm config set puppeteer_download_host==https://registry.npmmirror.com
                        npm i puppeteer
                    ```
                    -   使用 cnpm
                    ```js
                    npm install -g cnpm --registry=https://registry.npmmirror.com
                    cnpm i puppeteer
                    ```
                    -   手动操作
                        -   设置.nrmrc PUPPETEER_SKIP_DOWNLOAD 跳过 puppeteer
                        -   下载[Chromium 镜像](https://npm.taobao.org/mirrors/chromium-browser-snapshots/)/[Chromium](https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html)
                        -   默认路劲设置
                            -   node_modules/puppeteer/.local-chromium/win64-938248(系统类型-版本号)/chrome-win(解压下载的文件名)
                            ```js
                                C:\Users\k00557313\Desktop\Tmp\reactTmp\node_modules\puppeteer\.local-chromium\win64-938248\chrome-win
                            ```
                            -   版本号来自 puppeteer
                            ```js
                                node_modules\puppeteer\lib\cjs\puppeteer\node\install.js=>node_modules\puppeteer\lib\cjs\puppeteer\revisions.js
                            ```
                        -   调用设置 executablePath 参数
                            ```js
                            puppeteer.launch({ executablePath: 'ChromiumExePath' });
                            ```

        -   unit

            -   Enzyme vs @testing-library/react

                -   概念差异
                    -   Enzyme 使用 state、props 来测，组件变更会引起 test 失败
                    -   @testing-library/react 从与用户的交互角度来测试，使用 DOM 来测试
                -   渲染差异
                    -   @testing-library/react 通过全量 dom 来测试，不存再深浅测试
                    -   Enzyme 可以选择深浅测试，浅渲染即不渲染子组件
                -   使用方式
                    -   Enzyme 不仅可以测试 dom 还可测试状态即 state、props
                    -   @testing-library/react 只能通过 dom
                -   设置

                    -   不同版本 React 需兼容

                    ```js
                    import Enzyme from 'enzyme';
                    import Adapter from 'enzyme-adapter-react-16';

                    Enzyme.configure({ adapter: new Adapter() });
                    ```

                -   按需选择即可

-   publish

