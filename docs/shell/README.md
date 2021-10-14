---
sidebarDepth: 2
---

# 集锦

> 日常踩坑集锦

## 在页面上如何阻止双击

- 单击按钮，将自己删除并替换为一条消息，以阻止双击发生。在事件处理程序中删除按钮会阻止事件冒泡。只有事件目标仍然存在于文档中时，事件才会冒泡。

## 暗黑模式的一键补救

> 一种惰性补救，并非正在的暗黑模式

- filter 属性：滤镜通常用于调整图像，背景和边框的渲染
  - invert()：函数反转输入图像：amount 的值定义转换的比例。100% 的价值是完全反转。值为 0% 则图像无变化。值在 0% 和 100% 之间，则是效果的线性乘数。 若值未设置值，默认为 0

```html
html { filter: invert(1); }
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

- [vscode 设置\n & core.autocrlf false,文件还是没有切换诚 LF](https://stackoverflow.com/questions/49228693/how-to-change-eol-for-all-files-from-clrf-to-lf-in-visual-studio-code)

  - 方法一:删除分支，重新拉没能解决问题
  - 方法二:删除缓存

  ```js
  git config core.autocrlf false
  git rm --cached -r .
  git reset --hard
  ```

  > [stackoverflow](https://stackoverflow.com/questions/2517190/how-do-i-force-git-to-use-lf-instead-of-crlf-under-windows/13154031#13154031)

## Angular 组件继承

- 公共类需要添加@Decorator
  - 父类定义的 input，子类校验不通过
  ```js
    Error: src/app/routes/benefit-management/pages/benefit-recommend-edit/benefit-recommend-edit.component.html:27:13 - error NG8002: Can't bind to 'form' since it isn't a known property of 'app-benefit-company'.
  ```
  - 解决方式是
    - 虽然父类不需要 selector&template，任需添加@Component 装饰
- 继承不适用于 HTML 和 CSS 即 子类无法继承父类 template

  - 根因：template 是通过@Decorator 添加的
  - 解决方案

    - 这是一种对象组合，而不是继承
      ```js
      @Component({
        selector: 'eg-child',
        template: `<eg-base></eg-base>`,
      })
      export class ChildComponent {
        // ...
      }
      ```
      - 访问 base 属性和方法,需要将要访问的属性和方法设置为 public
        ```js
           @ViewChild(BaseComponent) baseComponent;
        ```
      - 无法覆盖 base 的属性和方法
    - clean inherit

      - 在 childComponent 中的@Component 引用&覆盖 base

      ```js
          @Component({
            selector: 'eg-entity-form',
            templateUrl: './entity-form.component.html',
            styleUrls: ['./entity-form.component.scss'],
        })
        export class EntityFormComponent implements OnInit {

            private entityService: SomeEntityService<any>;

            private entityFormGroup: FormGroup;

            protected set entityType(val: string): void {
                this.entityService = this.entityServices.getEntityService(val);
            }

            constructor(
                private entityServices: SomeEntityServicesMasterService,
                private route: ActivatedRoute,
            ) {
                console.log('Base class called!');
            }

            ngOnInit() {
                this.init();
            }

            private id$(): Observable<int> {
                return this.route.params.pipe(map(params => params['id']));
            }

            private init(): void {
                this.id$.pipe(
                    switchMap(id => this.entityService.getById(id)),
                    map(data => this.initFormGroup(data)),
                )
                    .subscribe();
            }

            protected initFormGroup(data): void {
                this.entityFormGroup = new FormGroup();
                // Whatever generic-form-building implementation
            }

        }

        @Component({
            selector: 'eg-user-form',
            templateUrl: './../shared/entities/entity-form/entity-form.component.html',
            styleUrls: [
                './../shared/entities/entity-form/entity-form.component.scss',
                './user-form.component.scss',
            ],
        })
        export class UserFormComponent extends EntityFormComponent {
            constructor(
                entityServices: SomeEntityServicesMasterService,
                route: ActivatedRoute,
            ) {
                super(entityServices, route);
                this.entityType = 'User';
            }

            protected initFormGroup(data): void {
                console.log('Child initFormGroup called');
                super.initFormGroup(data);
            }

        }
      ```

      - 存在的问题
        - childComponent vs base 的 constructor，
          - 我们必须注入相同的依赖项集，并将它们以相同的顺序通过 super()传递给父组件
        - 生命周期
          - 子类覆盖父类，需要执行父类生命周期是需要通过 super 执行
      - 参考
      > [Angular — Maintenance issue caused by component inheritance](https://lukeliutingchun.medium.com/angular-maintenance-issue-caused-by-component-inheritance-61fe4af85163)
      > 
      > [How to inherit a component in Angular and reuse its template](https://medium.com/acute-angular/how-to-inherit-a-component-in-angular-and-reuse-its-template-88b9cbb4b55)
