## 概要
medirはツリー構造でメモを保持し共有するサービスです
memo + directory で medir（中々気に入ってる
ユーザー認証機能は実装しない予定（やりたいならprivate機能を実装する形で

## 動かし方

1. git clone する

2. npm install

3. migrate.sql があるのでDB生成

4. node app.js

## 用語集

- room → 一つのメモ群を保持するもの
- dir → ディレクトリ
- memo → メモ

## 実装済み機能

- トップページ（roomの生成 + roomへのjoin)


## 未実装機能（必須）

- dir + memo の表示
- dir + memo の新規作成、保存、編集

## 未実装機能（気分で && 自由に追加して良い）

- 更新日の表示
- 更新履歴兼他ユーザーへのメッセージを残せるもの
