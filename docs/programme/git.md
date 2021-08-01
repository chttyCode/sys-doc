# git 操作

- 时光机(回滚)
  - 查找 commitId
    - git log
    - git reflog
  - 使用 revert
    - git revert commitid
    - git push -f
  - 使用 reset
    - git reset --hard commitId
    - git push -f
  - revert vs reset
    - revert 是放弃指定提交的修改，但是会生成一次新的提交，需要填写提交注释，以前的历史记录都在；
    - reset 是指将 HEAD 指针指到指定提交，历史记录中不会出现放弃的提交记录。
  - 删除某些历史 commitId
    - 使用 git revert <commit> 可以撤销指定的提交， 要撤销一串提交可以用 <commit1>..<commit2> 语法。 注意这是一个前开后闭区间，即不包括 commit1，但包括 commit2.

```js
    - 982d4f6 (HEAD -> master) version 6
    - 54cc9dc version 5
    - 551c408 version 4, harttle screwed it up again
    - 7e345c9 version 3, harttle screwed it up
    - f7742cd version 2
    - 6c4db3f version 1
```

    - --no-commit 后可以最后一起手动提交

```js
    git revert --no-commit f7742cd..551c408
```

    - commit记录

```js
    * 8fef80a (HEAD -> master) This reverts commit 7e345c9 and 551c408
    * 982d4f6 version 6
    * 54cc9dc version 5
    * 551c408 version 4, harttle screwed it up again
    * 7e345c9 version 3, harttle screwed it up
    * f7742cd version 2
    * 6c4db3f version 1
```
