# javaSE
### String

charAt :获取指定位置上的字符

```java
  String line = "helloworld";
  char c = line.charAt(5);
  System.out.println(c);
```

indexOf(String str):检索给定字符串在当前字符串中的位置，如果当前字符串不包含该内容则返回值为-1

```java
String str = "thinking in java";
int index = str.indexOf("in");
System.out.println(index);//2
```

int length()：获取当前字符串的长度(字符个数)

```java
String str = "你好java!!";
System.out.println(str.length());
```

boolean startsWith(String str)
boolean endsWith(String str)
 判断字符串是否是以给定的内容开始或结束的·

```java
String str = "www.tedu.cn";
boolean starts = str.startsWith("www.");
System.out.println("starts:"+starts);

boolean ends = str.endsWith(".cn");
System.out.println("ends:"+ends);
```

String类

String是不变对象，其不可以被继承，并且String对象一旦创建内容不可改变

若改变内容则必须创建新对象

String内部维护一个char数组用来保存对应的所有字符。

```java
String s1 = "123abc";
String s2 = "123abc";//重用s1对象
String s3 = "123abc";

System.out.println(s1 == s2);//比较地址时是相同的
System.out.println(s1 == s3);

s1 = s1 + "!";//修改内容会创建新对象
System.out.println("s1:"+s1);
System.out.println("s2:"+s2);
System.out.println(s1 == s2);//false 地址不相同了
```

String substring(int start,int end): 截取当前字符串中指定范围内的字符串,注意，java API中通常使用两个数字表示范围时是"含头不含尾"的

```java
String str = "www.tedu.cn";
String sub = str.substring(4,8);
System.out.println(sub);
```

String toLowerCase()
String toUpperCase()
将字符串中的英文部分转换为全大写或全小写

```java
String str = "我爱Java";
String lower = str.toLowerCase();
System.out.println(lower);

String upper = str.toUpperCase();
System.out.println(upper);
```

String trim()

去除字符串两边的空白字符

```java
String str = "   hello          ";
System.out.println(str);
String trim = str.trim();
System.out.println(trim);
```

String提供了一组静态的方法:valueOf,作用是一致的，将其他类型转换为String
 常用于将基本类型转换为String

```java
int a = 123;
String s1 = String.valueOf(a);//"123"
System.out.println(s1);

double dou = 123.123;
String s2 = String.valueOf(dou);//"123.123"
System.out.println(s2);

s1 = a + "";
System.out.println(s1);
```

### 包装类

包装类在java.lang中作为基础类使用，他们的出现是为了解决基本类型不能直接参与,面向对象开发，让基本类型可以以"对象"的形式存在。

```java
int a = 123;
Integer i1 = Integer.valueOf(a);
Integer i2 = Integer.valueOf(a);
System.out.println(i1 == i2);
System.out.println(i1.equals(i2));
```

包装类有一个静态方法:parseXXX可以将字符串转换为基本类型
前提是该字符串正确描述了基本类型可以保存的值，否则会抛出异常:
NumberFormatException

```java
String num = "123";
int d = Integer.parseInt(num);
System.out.println(d);
double dou = Double.parseDouble(num);
System.out.println(dou);
```

DK1.5推出时推出了一个新的特性:自动拆装箱
该特性是编译器认可的而不是java虚拟机，当编译器在编译代码时发现有基本类型与
引用类型相互赋值操作时会自动添加转换代码，这样我们在源代码中就不在需要编码
来完成相互的转换。

```java
int d = 123;
/*
下面代码会触发:自动装箱特性，编译器会补全转换代码
Integer i = Integer.valueOf(d);
*/
Integer i = d;
/*
自动拆箱
d = i.intValue();
*/
d = i;
```

测试Object中经常被重写的两个方法:toString和equals

开发中将一个对象内容输出到控制台的操作很频繁，而这个方法输出对象
时输出的是这个对象toString方法返回的字符串。
Object中定义了这个方法，所以java中所有的类都有toString,但如果
不妥善重写，则使用Object提供的该方法时返回的字符串格式为:
类名@地址。这个对我们开发的帮助不大

注:java API提供类大多已经重写了toString方法，通常只有我们自己
定义类在使用它不理想时需要自行重写这个方法

```java
 Point p = new Point(1,2);
 System.out.println(p);//类名@地址
```

java中任何类型与字符串连接结果都是字符串，而实际操作是会将调用
该类型实例的toString方法并将返回的字符串与字符串进行连接操作。

```java
String line = "这个对象是" + p;
System.out.println(line);
```

Object提供的另一个方法equals，目的是比较两个对象的"内容"是否
相同。
对于引用类型变量而言保存的是对象的地址，"=="是比较变量的值，因此
就是比较地址，只有两个引用类型变量保存的地址相同(指向同一个对象)时
才会为true。
而equals并不关心他们是否为同一个对象，判断的是他们的内容是否相同

注:Object的equals内部用"=="实现，因此如果子类不重写这个方法则
没有意义。

```java
Point p2 = new Point(1,2);
System.out.println(p==p2);//比地址,判定是否为同一个对象
System.out.println(p.equals(p2));
```

### File 文件操作

```java
import java.io.File;
```

#### 使用File创建一个新文件

```java
//在当前目录下新建一个文件:test.txt
File file = new File("./test.txt");
//boolean exists()该方法是判断File表示的文件或目录是否已经存在
if(file.exists()){
	System.out.println("该文件已存在！");
}else{
	file.createNewFile();//创建该文件
	System.out.println("文件已创建!");
}
```

删除一个目录,在相对路径中，"./"是可以忽略不写的，默认就是从当前目录开始。
因此"./test.txt"与"test.txt"是一样的。

```java
//将当前目录下的demo目录删除
File dir = new File("./demo");
if(dir.exists()){
	dir.delete();//删除目录时要求该目录必须是空的
	System.out.println("目录已删除");
}else{
	System.out.println("目录不存在!");
}
```

使用File可以:
 1:访问该文件或目录的属性信息(名字，大小，修改时间等)
 2:创建或删除文件和目录
 3:访问一个目录中的所有子项
使用File不能读写文件数据，有其他API可以做到

File创建时需要指定其表示的文件或目录的路径信息，而路径有两种写法:
绝对路径:
例如:E:/idea_workspace/JSD2009_SE/demo.txt
相对路径:
例如:./demo.txt

```java
File file = new File("./demo.txt");

String name = file.getName();
System.out.println(name);

long length = file.length();
System.out.println(length+"字节");

boolean cr = file.canRead();//是否可读
boolean cw = file.canWrite();//是否可写
System.out.println("可读:"+cr);
System.out.println("可写:"+cw);

boolean ih = file.isHidden();//是否是隐藏的
System.out.println("是否隐藏:"+ih);
```

#### 创建一个目录

mkdirs vs mkdir 

mkdirs会将不存在的父目录也创建，mkdir创建失败

```java
File dir = new File("a/b/c/d/e/f");
if(dir.exists()){
	System.out.println("该目录已存在!");
}else{
	//dir.mkdir();//创建的目录所在的目录必须存在，否则创建不成功
	dir.mkdirs();//会将不存在父目录一同创建出来
	System.out.println("该目录已创建!");
}
```

#### 文件复制

#### RandomAccessFile

RAF是专门用来读写文件数据的类，其基于指针对文件进行随机访问。读写操作灵活

#### lambda表达式

JDK8推出后出现了一个新的特性:lambda表达式
lambda可以让java"以函数式编程"。比较直观的感受是可以用更精简的语法创建匿名内部类。
lambda与传统写法主要是忽略了接口的名字和方法的名字

```java
FileFilter filter = new FileFilter(){
	public boolean accept(File file) {
		return file.getName().endsWith(".txt");
	}
};
//lambda与传统写法主要是忽略了接口的名字和方法的名字
FileFilter filter = (file)->{
	return file.getName().endsWith(".txt");
};
```

lambda表达式中如果只有一句代码，那么可以忽略方法体的"{}",并且如果这句
代码有return关键字时这个关键字也要一同忽略。

```JAVA
FileFilter filter = (file)->file.getName().indexOf("s")!=-1;
```

#### io 使用文件输入流读取文件数据

```JAVA
import java.io.*;
```

java标准的IO
Input和Output:输入与输出
输入是从外界到程序的方向，作用是用来"读"的
输出是从程序到外界的方向，作用是用来"写"的

java.io.InputStream和OutputStream是两个抽象类，分别为字节输入流
与字节输出流，里面定义了若干抽象方法，规定了输入流读取字节和输出流写出字节
的相关方法。所有的字节流实现类(比如读写文件的，读写网络的等等)都继承自它们
因此无论我们将来读写什么设备，只要使用对应的流用相同的读写字节方法就可以了。
java将流划分为两类:
节点流:也称为低级流，特点:真实连接我们程序与另一端的”管道“，负责实际读写
 		数据的流。注意:读写数据一定是建立在低级流基础上进行的。
处理流:也称为高级流，特点:不能独立存在，必须连接在其他流上，目的是当数据
 		流经当前流时对其作某些加工处理，简化我们的读写操作。

文件流:java.io.FileOutputStream和FileInputStream
它们是常用的一对低级流，用于读写文件数据

```JAVA
/*
构造方法:
FileOutputStream(String path)
FileOutputStream(File file)
以上构造方法创建的文件输出流是覆盖模式，即:如果指定的文件已经
存在，则会将该文件原有数据全部抹除。然后将通过当前流写出的数据
保存到文件中。

FileOutputStream(String path,boolean append)
FileOutputStream(File file,boolean append)
当第二个参数传入的为true则是追加模式，文件原数据保留，新写入的
内容会被追加到文件中


与RandomAccessFile写文件的区别:
RAF是基于指针的随机读写形式，可以对文件任意位置写操作进行局部的
覆盖，但是文件流不行，由于java标准的IO是顺序读写形式，对于写操
作而言只能顺序向后写不能回退。因此写操作的灵活性不如RAF。
但是后期基于流连接，我们可以串联若干高级流完成复杂读写操作，这一点
是RAF所不及的。

*/
FileOutputStream fos = new FileOutputStream("fos.txt",true);
//        RandomAccessFile fos
//                = new RandomAccessFile("fos.txt","rw");

String str = "你存在，我深深的脑海里.";
byte[] data = str.getBytes("UTF-8");
fos.write(data);
str = "我的梦里，我的心里，我的歌声里。";
data = str.getBytes("UTF-8");
fos.write(data);
System.out.println("写出完毕!");
fos.close();
```

* 使用文件流完成文件的复制操作
* 流程:
* 1:创建一个文件输入流用于读取原文件
* 2:创建一个文件输出流用于写复制的文件
* 3:循环从原文件读取字节写入到复制文件中完成复制操作
* 要求:使用块读写形式完成复制
* 可参考RAF案例中的操作。

```JAVA
FileInputStream fis = new FileInputStream("2009.pptx");
FileOutputStream fos = new FileOutputStream("2009_cp.pptx");

int len;
byte[] data = new byte[1024*10];
while((len = fis.read(data))!=-1){
	fos.write(data,0,len);
}
System.out.println("复制完毕!");
fis.close();
fos.close();
```

缓冲输出流的缓冲区问题

java.io.BufferedReader缓冲字符输入流,块读文本数据，并且可以按行读取字符串

缓冲流:java.io.BufferedInputStream和OutputStream,缓冲字节输入流与输出流是一对高级字节流，作用是加快读写效率。

使用文件输入流读取文件数据

转换流,使用转换流的输入流来读取文本数据

对象输入流，用来读取一个java对象
