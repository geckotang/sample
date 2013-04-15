# node-imagemagickとGruntを組み合わせてみる。

Windows7で、AIファイルを、JPGに変換したい…！

## 必要なもの

+ node
+ npm (npm installでGruntを動かす上で必要な物はインストールされる)
+ [コマンドライン版ImageMagick](http://www.imagemagick.org/script/binary-releases.php#windows)よりImageMagick-6.8.4-9-Q16-x64-dll.exeをインストール
+ [Ghostscript](http://www.ghostscript.com/download/gsdnld.html)よりGhostscript 9.07 for Windows (64 bit)をインストール

## 変換

inputフォルダにaiやpsdを入れて、

```shell
$grunt imagemagick
```

すると、outputフォルダにjpgで変換されたものが生成される。
