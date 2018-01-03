SET NAMES UTF8;
DROP DATABASE IF EXISTS meituan;
CREATE DATABASE meituan CHARSET=UTF8;
USE meituan;
CREATE TABLE shoplist(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    sturn INT,
    min_spend INT,
    spend_delivery INT,
    simg VARCHAR(50),
    month_sell INT,
    pre_spend INT,
    dec_activity VARCHAR(100),
    discount VARCHAR(100)
);
INSERT INTO shoplist VALUES(
    null,'爱鲜蜂网上超市',1,20,5,'axf.png',780,15,'满35减12；满55减20','折扣商品4.71折起'
),
(null,'南城香（富丰桥店）',2,15,3,'ncx.png',200,13,'满40减23；满63减30','折扣商品5折起')
;
CREATE TABLE dishs(
    id INT PRIMARY KEY AUTO_INCREMENT,
    sid INT,
    classifies VARCHAR(20),
    month_sell INT,
    zan INT,
    price DOUBLE(10,2),
    pre_weight VARCHAR(20),
    dimg VARCHAR(30),
    name VARCHAR(50),
    intro VARCHAR(60),
    did INT,
    largeImg VARCHAR(50)
);
INSERT INTO dishs VALUES
(null,1,'冰淇淋',99,4,9,'一支','xg01.png','梦龙卡布基诺口味冰淇淋','口感细腻，丝滑',1,'xg01_large.jpg'),
(null,1,'进口零食',437,10,5,'65g','ls01.png','美国科克兰盐烤扁桃仁','椒香酥脆',2,'ls01_large.jpg'),
(null,2,'热销',2417,111,20,'','agsf.jpg','安格斯肥牛饭','甜蜜，口感丝滑',3,'agsf_large.jpg')
;
CREATE TABLE cart(
    id INT PRIMARY KEY AUTO_INCREMENT,
    cid INT,
    name VARCHAR(50),
    count INT,
    img VARCHAR(100),
    price DOUBLE(10,2)
);
INSERT INTO cart VALUES
(null,1,'芝麻烧饼1',3,'ls01.png',2.75),
(null,2,'芝麻烧饼2',6,'ls04.png',2.45),
(null,3,'芝麻烧饼3',1,'xg01.png',2.35);
