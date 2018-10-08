//华南农业大学-数学与信息学院-计算机科学与技术6班-佘跃楷
//QQ:978398138

var com = {};

//画布
com.canvas = document.getElementById('canvas');
com.context = com.canvas.getContext('2d');

//棋子是正方形的,最大为60
com.chess_width = 60;
com.chess_height = 60;

//保证棋盘宽高比为7:9
com.chessboard_width = com.chess_width * 7;
com.chessboard_height = com.chess_height * 9;

//棋子图片集合
com.chess_img = {};

//是否可以开始游戏
com.isPlay = false;

//现在操作的棋子
com.nowPlayChess = false;

//现在操作的棋子坐标
com.nowPlayChessX = 0;
com.nowPlayChessY = 0;

//现在操作棋子的提示点
com.nowPlayDot = false;

//现在操作的阵营,红方先走
com.nowPlayMy = -1;

//胜利的阵营,-1为红方赢，1为蓝方赢
com.win = 0;

//初始化地图
//l-lion,t-tiger,d-dog,c-cat,m-mouse,p-pardus(豹子),w-wolf,e-elephant
//r-river,h-hook(陷阱),n-nest(巢穴)
com.initMap = [
	["l0",    ,    ,    ,    ,    ,"t0"],
	[    ,"d0",    ,    ,    ,"c0",    ],
	["m0",    ,"p0",    ,"w0",    ,"e0"],
	[    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ],
	[    ,    ,    ,    ,    ,    ,    ],
	["e1",    ,"w1",    ,"p1",    ,"m1"],
	[    ,"c1",    ,    ,    ,"d1",    ],
	["t1",    ,    ,    ,    ,    ,"l1"]
];

// com.initMape = [
// 	["l0",    ,    ,    ,    ,    ,"t0"],
// 	[    ,"d0","e0",    ,"e0","c0",    ],
// 	["m0","e1","p0","e0","w0",    ,    ],
// 	["e1",    ,    ,    ,    ,    ,"e0"],
// 	[    ,    ,    ,    ,    ,    ,"m1"],
// 	[    ,    ,    ,    ,    ,    ,    ],
// 	["e1",    ,"w1","e1","p1","e0","m1"],
// 	[    ,"c1","e1","m0","e1","d1",    ],
// 	["t1",    ,    ,    ,    ,    ,"l1"]
// ];

// com.initMapl = [
// 	["l0",    ,    ,    ,    ,    ,"t0"],
// 	[    ,"d0",    ,"l0",    ,"c0",    ],
// 	["m1","l0","l0",    ,"w0","l1","e0"],
// 	["l0",    ,    ,"l1",    ,    ,"m1"],
// 	["e0",    ,    ,"l0",    ,	  ,"l1"],
// 	["l0",    ,    ,"t1","m1","m1",    ],
// 	["e1",    ,"p1",    ,    ,"l0","m1"],
// 	[    ,"c1",    ,    ,    ,"d1","e0"],
// 	["t1",    ,    ,    ,    ,    ,"l1"]
// ];

// com.initMapt = [
// 	["l0",    ,    ,    ,    ,    ,"t0"],
// 	[    ,"d0",    ,    ,    ,"c0",    ],
// 	["m0","e1","t1",    ,"w0",    ,"e0"],
// 	[    ,    ,    ,"e1",    ,    ,    ],
// 	[    ,    ,    ,"t0",    ,    ,    ],
// 	[    ,    ,    ,"t1",    ,    ,    ],
// 	["e1","t0","w0",    ,"p1","t0","m1"],
// 	[    ,"c1",    ,    ,    ,"d1",    ],
// 	["t1",    ,    ,    ,    ,    ,"l1"]
// ];

// com.initMapp = [
// 	["l0",    ,    ,    ,    ,    ,"t0"],
// 	[    ,"d0",    ,    ,"p1","c0",    ],
// 	["m0",    ,"p0",    ,"w0",    ,"e0"],
// 	[    ,    ,    ,"p0",    ,    ,    ],
// 	[    ,    ,    ,    ,    ,    ,    ],
// 	["p1",    ,    ,    ,    ,    ,"p0"],
// 	["e1",    ,"w1",    ,"p1",    ,"m1"],
// 	[    ,"c1",    ,    ,    ,"d1",    ],
// 	["t1",    ,    ,    ,    ,    ,"l1"]
// ];

// com.initMapm = [
// 	["l0",    ,    ,    ,    ,    ,"t0"],
// 	["m1","d0",    ,"m1","e0","c0",    ],
// 	["m0","e1","p0",    ,"w0",    ,"e0"],
// 	[    ,"m0","m1",    ,    ,    ,    ],
// 	[    ,    ,"m0",    ,    ,"m1","e0"],
// 	["m0",    ,    ,    ,    ,    ,"m1"],
// 	["e1",    ,"w1",    ,"p1","m1","m0"],
// 	[    ,"c1",    ,    ,    ,"d1",    ],
// 	["t1",    ,    ,    ,    ,    ,"l1"]
// ];

com.value = {
	//蓝象价值
	//0是小河或己方兽穴，-2是陷阱
	e0:[
		[    ,    , -2 ,  0 , -2 ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ]
	],

	//蓝狮价值
	//0是小河，1是己方兽穴，-2是陷阱
	l0:[
		[    ,    , -2 ,  1 , -2 ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ]
	],

	//蓝虎价值
	//0是小河，1是己方兽穴，-2是陷阱
	t0:[
		[    ,    , -2 ,  1 , -2 ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ]
	],

	//蓝豹价值
	//0是小河或己方兽穴，-2是陷阱
	p0:[
		[    ,    , -2 ,  0 , -2 ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ]
	],

	//蓝狼价值
	//0是小河或己方兽穴，-2是陷阱
	w0:[
		[    ,    , -2 ,  0 , -2 ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ]
	],

	//蓝狗价值
	//0是小河或己方兽穴，-2是陷阱
	d0:[
		[    ,    , -2 ,  0 , -2 ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ]
	],

	//蓝猫价值
	//0是小河或己方兽穴，-2是陷阱
	c0:[
		[    ,    , -2 ,  0 , -2 ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ]
	],

	//蓝鼠价值
	//-1是小河，0是己方兽穴，-2是陷阱
	m0:[
		[    ,    , -2 ,  0 , -2 ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    , -1 , -1 ,    , -1 , -1 ,    ],
		[    , -1 , -1 ,    , -1 , -1 ,    ],
		[    , -1 , -1 ,    , -1 , -1 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ]
	],

	//红象价值
	//0是小河或己方兽穴，-2是陷阱
	e1:[
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,	,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    , -2 ,  0 , -2 ,    ,    ]
	],

	//红狮价值
	//0是小河，1是己方兽穴，-2是陷阱
	l1:[
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,	,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    , -2 ,  1 , -2 ,    ,    ]
	],

	//红虎价值
	//0是小河，1是己方兽穴，-2是陷阱
	t1:[
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,	,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    , -2 ,  1 , -2 ,    ,    ]
	],

	//红豹价值
	//0是小河或己方兽穴，-2是陷阱
	p1:[
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,	,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    , -2 ,  0 , -2 ,    ,    ]
	],

	//红狼价值
	//0是小河或己方兽穴，-2是陷阱
	w1:[
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,	,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    , -2 ,  0 , -2 ,    ,    ]
	],

	//红狗价值
	//0是小河或己方兽穴，-2是陷阱
	d1:[
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,	,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    , -2 ,  0 , -2 ,    ,    ]
	],

	//红猫价值
	//0是小河或己方兽穴，-2是陷阱
	c1:[
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,	,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,  0 ,  0 ,    ,  0 ,  0 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    , -2 ,  0 , -2 ,    ,    ]
	],

	//红鼠价值
	//-1是小河,0是己方兽穴，-2是陷阱
	m1:[
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,	,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    , -1 , -1 ,    , -1 , -1 ,    ],
		[    , -1 , -1 ,    , -1 , -1 ,    ],
		[    , -1 , -1 ,    , -1 , -1 ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    , -2 ,    ,    ,    ],
		[    ,    , -2 ,  0 , -2 ,    ,    ]
	]

}

// com.playMap = com.initMap;

//棋子类型
com.chesstype = {
	//蓝子 中文/图片地址/阵营/走法/权重
	"e0":{text:"蓝象",img:"blueelephant",my:1,level:8},
	"l0":{text:"蓝狮",img:"bluelion",    my:1,level:7},
	"t0":{text:"蓝虎",img:"bluetiger",   my:1,level:6},
	"p0":{text:"蓝豹",img:"bluepardus",  my:1,level:5},
	"w0":{text:"蓝狼",img:"bluewolf",    my:1,level:4},
	"d0":{text:"蓝狗",img:"bluedog",     my:1,level:3},
	"c0":{text:"蓝猫",img:"bluecat",     my:1,level:2},
	"m0":{text:"蓝鼠",img:"bluemouse",   my:1,level:1},

	//红子 中文/图片地址/阵营/走法/权重
	"e1":{text:"红象",img:"redelephant",my:-1,level:8},
	"l1":{text:"红狮",img:"redlion",    my:-1,level:7},
	"t1":{text:"红虎",img:"redtiger",   my:-1,level:6},
	"p1":{text:"红豹",img:"redpardus",  my:-1,level:5},
	"w1":{text:"红狼",img:"redwolf",    my:-1,level:4},
	"d1":{text:"红狗",img:"reddog",     my:-1,level:3},
	"c1":{text:"红猫",img:"redcat",     my:-1,level:2},
	"m1":{text:"红鼠",img:"redmouse",   my:-1,level:1}
};

//加载所有图片
com.loadImage = function () {
	//棋盘
	com.chessboard_img = new Image();
	com.chessboard_img.src = "img/chessboard.bmp";

	//棋子
	for (var i in com.chesstype) {
		com.chess_img[i] = {};
		com.chess_img[i] = new Image();
		com.chess_img[i].src = "img/" + com.chesstype[i].img + ".bmp";
	}

	//外框
	com.pane_img = new Image();
	com.pane_img.src = "img/pane.png";

	//提示点
	com.dot_img = new Image();
	com.dot_img.src = "img/dot.png";
}

//绘制棋盘
com.drawChessboard = function() {
	com.context.drawImage(com.chessboard_img,0,0,com.chessboard_width,com.chessboard_height);
}

//清除棋盘
com.clearChessboard = function() {
	com.context.clearRect(0,0,com.chessboard_width,com.chessboard_height);
}

//绘制棋子
com.drawChess = function (key,x,y) {
	var key;
	var x;
	var y;
	com.context.drawImage(com.chess_img[key],com.chess_width * x,com.chess_height * y,com.chess_width,com.chess_height);
}
//绘制提示框
com.drawPane = function(x,y) {
	var x;
	var y;
	com.context.drawImage(com.pane_img,com.chess_width * x,com.chess_height * y,com.chess_width,com.chess_height);
}

//绘制提示点
com.drawDot = function(x,y) {
	com.context.drawImage(com.dot_img,com.chess_width * x,com.chess_height * y,com.chess_width,com.chess_height);
}

//绘制地图
com.drawMaps = function (map) {
	for (var i = 0; i < map.length; i++) {//行
		for (var j = 0; j < map[i].length; j++) {//列
			var key = map[i][j];
			if(key){
				com.drawChess(key,j,i);
			}
		}
	}
}

//棋子能走的着点
com.chessBylaw = {};

//象
com.chessBylaw.e0 = function (map,x,y,my,level) {
	var dot = [];
	//上侧检索

	//top必须在棋盘内
	if (y-1 >= 0) {
		//top的value不为0,则不是小河或己方兽穴
		if(com.value[map[y][x]][y-1][x]  != 0){
			//top处没有棋子
			if(!map[y-1][x]){
				dot.push([x,y-1]);
			}
			//top处有棋子，但不是我方棋子
			else if(com.chesstype[map[y-1][x]].my != my){
				//top处的位置是己方陷阱
				if(com.value[map[y][x]][y-1][x] == -2){
					dot.push([x,y-1]);
				}
				//top处的位置不是己方陷阱,top处的棋子不是对方的鼠
				else if((com.chesstype[map[y-1][x]].level != 1) && (com.chesstype[map[y-1][x]].level <= level)){
					dot.push([x,y-1]);
				}
			}
		}
	}

	//右侧检索

	//right必须在棋盘内
	if (x+1 <= 6) {
		//right的value不为0,则不是小河或己方兽穴
		if(com.value[map[y][x]][y][x+1]  != 0){
			//right处没有棋子
			if(!map[y][x+1]){
				dot.push([x+1,y]);
			}
			//right处有棋子，但不是我方棋子
			else if(com.chesstype[map[y][x+1]].my != my){
				//right处的位置是己方陷阱
				if(com.value[map[y][x]][y][x+1] == -2){
					dot.push([x+1,y]);
				}
				//right处的位置不是己方陷阱,right处的棋子不是对方的鼠
				else if((com.chesstype[map[y][x+1]].level != 1) && (com.chesstype[map[y][x+1]].level <= level)){
					dot.push([x+1,y]);
				}
			}
		}
	}

	//下侧检索

	//bottom必须在棋盘内
	if (y+1 <= 8) {
		//bottom的value不为0,则不是小河或己方兽穴
		if(com.value[map[y][x]][y+1][x]  != 0){
			//bottom处没有棋子
			if(!map[y+1][x]){
				dot.push([x,y+1]);
			}
			//bottom处有棋子，但不是我方棋子
			else if(com.chesstype[map[y+1][x]].my != my){
				//bottom处的位置是己方陷阱
				if(com.value[map[y][x]][y+1][x] == -2){
					dot.push([x,y+1]);
				}
				//bottom处的位置不是己方陷阱,bottom处不是对方的鼠
				else if((com.chesstype[map[y+1][x]].level != 1) && (com.chesstype[map[y+1][x]].level <= level)){
					dot.push([x,y+1]);
				}
			}
		}
	}

	//左侧检索

	//left必须在棋盘内
	if (x-1 >= 0) {
		//left的value不为0,则不是小河或己方兽穴
		if(com.value[map[y][x]][y][x-1]  != 0){
			//left处没有棋子
			if(!map[y][x-1]){
				dot.push([x-1,y]);
			}
			//left处有棋子，但不是我方棋子
			else if(com.chesstype[map[y][x-1]].my != my){
				//left处的位置是己方陷阱
				if(com.value[map[y][x]][y][x-1] == -2){
					dot.push([x-1,y]);
				}
				//left处的位置不是己方陷阱,left处不是对方的鼠
				else if((com.chesstype[map[y][x-1]].level != 1) && (com.chesstype[map[y][x-1]].level <= level)){
					dot.push([x-1,y]);
				}
			}
		}
	}

	return dot;
}

//狮
com.chessBylaw.l0 = function (map,x,y,my,level) {
	var dot = [];
	//上侧检索

	//top必须在棋盘内
	if(y-1 >= 0){
		//top的value不为0和1,则不是小河和己方兽穴
		if((com.value[map[y][x]][y-1][x]  != 0) && (com.value[map[y][x]][y-1][x]  != 1)){
			//top处没有棋子
			if(!map[y-1][x]){
				dot.push([x,y-1]);
			}
			//top处有棋子，但不是我方棋子
			else if(com.chesstype[map[y-1][x]].my != my){
				//top处的位置是己方陷阱
				if(com.value[map[y][x]][y-1][x] == -2){
					dot.push([x,y-1]);
				}
				//top处的位置不是己方陷阱,top处棋子的等级比我低
				else if(com.chesstype[map[y-1][x]].level <= level){
					dot.push([x,y-1]);
				}
			}
		}
		//top的value为0或1，则是小河或己方兽穴
		//河对面的位置在棋盘内，则必定是小河
		else if(y-4 >= 0){
			//河中间没有棋子
			if((!map[y-1][x])&&(!map[y-2][x])&&(!map[y-3][x])){
				//河对岸没有棋子
				if(!map[y-4][x]){
					dot.push([x,y-4]);
				}
				//河对岸有棋子,且不是我方棋子
				else if(com.chesstype[map[y-4][x]].my != my){
					//河对岸棋子的等级比我低
					if(com.chesstype[map[y-4][x]].level <= level){
						dot.push([x,y-4]);	
					}
				}
			}
		}
	}	

	//右侧检索

	//right必须在棋盘内
	if (x+1 <= 6) {
		//right的value不为0和1,则不是小河和己方兽穴
		if((com.value[map[y][x]][y][x+1]  != 0) && (com.value[map[y][x]][y][x+1] != 1)){
			//right处没有棋子
			if(!map[y][x+1]){
				dot.push([x+1,y]);
			}
			//right处有棋子，但不是我方棋子
			else if(com.chesstype[map[y][x+1]].my != my){
				//right处的位置是陷阱
				if(com.value[map[y][x]][y][x+1] == -2){
					dot.push([x+1,y]);
				}
				//right处的位置不是陷阱,right处棋子的等级比我低
				else if(com.chesstype[map[y][x+1]].level <= level){
					dot.push([x+1,y]);
				}
			}
		}

		//right的value为0，则是小河
		if(com.value[map[y][x]][y][x+1] == 0){
			//河中间没有棋子
			if((!map[y][x+1])&&(!map[y][x+2])){
				//河对岸没有棋子
				if(!map[y][x+3]){
					dot.push([x+3,y]);
				}
				//河对岸有棋子,且不是我方棋子
				else if(com.chesstype[map[y][x+3]].my != my){
					//河对岸棋子的等级比我低
					if(com.chesstype[map[y][x+3]].level <= level){
						dot.push([x+3,y]);	
					}
				}
			}
		}	
	}

	//下侧检索

	//bottom必须在棋盘内
	if(y+1 <= 8){
		//bottom的value不为0和1,则不是小河和己方兽穴
		if((com.value[map[y][x]][y+1][x]  != 0) && (com.value[map[y][x]][y+1][x]  != 1)){
			//bottom处没有棋子
			if(!map[y+1][x]){
				dot.push([x,y+1]);
			}
			//bottom处有棋子，但不是我方棋子
			else if(com.chesstype[map[y+1][x]].my != my){
				//bottom处的位置是己方陷阱
				if(com.value[map[y][x]][y+1][x] == -2){
					dot.push([x,y+1]);
				}
				//bottom处的位置不是己方陷阱,bottom处棋子的等级比我低
				else if(com.chesstype[map[y+1][x]].level <= level){
					dot.push([x,y+1]);
				}
			}
		}
		//bottom的value为0或1，则是小河或己方兽穴
		//河对面的位置在棋盘内，则必定是小河
		else if(y+4 <= 8){
			//河中间没有棋子
			if((!map[y+1][x])&&(!map[y+2][x])&&(!map[y+3][x])){
				//河对岸没有棋子
				if(!map[y+4][x]){
					dot.push([x,y+4]);
				}
				//河对岸有棋子,且不是我方棋子
				else if(com.chesstype[map[y+4][x]].my != my){
					//河对岸棋子的等级比我低
					if(com.chesstype[map[y+4][x]].level <= level){
						dot.push([x,y+4]);	
					}
				}
			}
		}
	}	

	//左侧检索

	//left必须在棋盘内
	if (x-1 >= 0) {
		//left的value不为0和1,则不是小河和己方兽穴
		if((com.value[map[y][x]][y][x-1]  != 0) && (com.value[map[y][x]][y][x-1] != 1)){
			//left处没有棋子
			if(!map[y][x-1]){
				dot.push([x-1,y]);
			}
			//left处有棋子，但不是我方棋子
			else if(com.chesstype[map[y][x-1]].my != my){
				//left处的位置是陷阱
				if(com.value[map[y][x]][y][x-1] == -2){
					dot.push([x-1,y]);
				}
				//left处的位置不是陷阱,left处棋子的等级比我低
				else if(com.chesstype[map[y][x-1]].level <= level){
					dot.push([x-1,y]);
				}
			}
		}

		//left的value为0，则是小河
		if(com.value[map[y][x]][y][x-1] == 0){
			//河中间没有棋子
			if((!map[y][x-1])&&(!map[y][x-2])){
				//河对岸没有棋子
				if(!map[y][x-3]){
					dot.push([x-3,y]);
				}
				//河对岸有棋子,且不是我方棋子
				else if(com.chesstype[map[y][x-3]].my != my){
					//河对岸棋子的等级比我低
					if(com.chesstype[map[y][x-3]].level <= level){
						dot.push([x-3,y]);	
					}
				}
			}
		}	
	}

	return dot;
}

//虎
com.chessBylaw.t0 = com.chessBylaw.l0;

//豹
com.chessBylaw.p0 = function (map,x,y,my,level) {
	var dot = [];
	//上侧检索

	//top必须在棋盘内
	if (y-1 >= 0) {
		//top的value不为0,则不是小河或己方兽穴
		if(com.value[map[y][x]][y-1][x]  != 0){
			//top处没有棋子
			if(!map[y-1][x]){
				dot.push([x,y-1]);
			}
			//top处有棋子，但不是我方棋子
			else if(com.chesstype[map[y-1][x]].my != my){
				//top处的位置是己方陷阱
				if(com.value[map[y][x]][y-1][x] == -2){
					dot.push([x,y-1]);
				}
				//top处的位置不是己方陷阱,top处棋子的等级比我低
				else if(com.chesstype[map[y-1][x]].level <= level){
					dot.push([x,y-1]);
				}
			}
		}
	}

	//右侧检索

	//right必须在棋盘内
	if (x+1 <= 6) {
		//right的value不为0,则不是小河或己方兽穴
		if(com.value[map[y][x]][y][x+1]  != 0){
			//right处没有棋子
			if(!map[y][x+1]){
				dot.push([x+1,y]);
			}
			//right处有棋子，但不是我方棋子
			else if(com.chesstype[map[y][x+1]].my != my){
				//right处的位置是己方陷阱
				if(com.value[map[y][x]][y][x+1] == -2){
					dot.push([x+1,y]);
				}
				//right处的位置不是己方陷阱,right处棋子的等级比我低
				else if(com.chesstype[map[y][x+1]].level <= level){
					dot.push([x+1,y]);
				}
			}
		}
	}

	//下侧检索

	//bottom必须在棋盘内
	if (y+1 <= 8) {
		//bottom的value不为0,则不是小河或己方兽穴
		if(com.value[map[y][x]][y+1][x]  != 0){
			//bottom处没有棋子
			if(!map[y+1][x]){
				dot.push([x,y+1]);
			}
			//bottom处有棋子，但不是我方棋子
			else if(com.chesstype[map[y+1][x]].my != my){
				//bottom处的位置是己方陷阱
				if(com.value[map[y][x]][y+1][x] == -2){
					dot.push([x,y+1]);
				}
				//bottom处的位置不是己方陷阱,bottom处棋子的等级比我低
				else if(com.chesstype[map[y+1][x]].level <= level){
					dot.push([x,y+1]);
				}
			}
		}
	}

	//左侧检索

	//left必须在棋盘内
	if (x-1 >= 0) {
		//left的value不为0,则不是小河或己方兽穴
		if(com.value[map[y][x]][y][x-1]  != 0){
			//left处没有棋子
			if(!map[y][x-1]){
				dot.push([x-1,y]);
			}
			//left处有棋子，但不是我方棋子
			else if(com.chesstype[map[y][x-1]].my != my){
				//left处的位置是己方陷阱
				if(com.value[map[y][x]][y][x-1] == -2){
					dot.push([x-1,y]);
				}
				//left处的位置不是己方陷阱,left处棋子的等级比我低
				else if(com.chesstype[map[y][x-1]].level <= level){
					dot.push([x-1,y]);
				}
			}
		}
	}

	return dot;
}

//狼
com.chessBylaw.w0 = com.chessBylaw.p0;

//狗
com.chessBylaw.d0 = com.chessBylaw.p0;

//猫
com.chessBylaw.c0 = com.chessBylaw.p0;

//鼠
com.chessBylaw.m0 = function (map,x,y,my,level) {
	var dot = [];
	//上侧检索

	//top必须在棋盘内
	if (y-1 >= 0) {
		//top的value不为0,则不是己方兽穴
		if(com.value[map[y][x]][y-1][x]  != 0){
			//top处没有棋子
			if(!map[y-1][x]){
				dot.push([x,y-1]);
			}
			//top处有棋子，但不是我方棋子
			else if(com.chesstype[map[y-1][x]].my != my){
				//top处的位置是己方陷阱
				if(com.value[map[y][x]][y-1][x] == -2){
					dot.push([x,y-1]);
				}
				//top处的位置不是己方陷阱,且上方和我都在陆地或都在河里
				else if(com.value[map[y][x]][y-1][x] == com.value[map[y][x]][y][x]){
					//top处棋子是对方的鼠或者是对方的象
					if((com.chesstype[map[y-1][x]].level <= level) || (com.chesstype[map[y-1][x]].level == 8)){
						dot.push([x,y-1]);
					}
				}
			}
		}
	}

	//右侧检索

	//right必须在棋盘内
	if (x+1 <= 6) {
		//right的value不为0,则不是己方兽穴
		if(com.value[map[y][x]][y][x+1]  != 0){
			//right处没有棋子
			if(!map[y][x+1]){
				dot.push([x+1,y]);
			}
			//right处有棋子，但不是我方棋子
			else if(com.chesstype[map[y][x+1]].my != my){
				//right处的位置是己方陷阱
				if(com.value[map[y][x]][y][x+1] == -2){
					dot.push([x+1,y]);
				}
				//right处的位置不是己方陷阱,且右方和我都在陆地或都在河里
				else if(com.value[map[y][x]][y][x+1] == com.value[map[y][x]][y][x]){
					//right处棋子是对方的鼠或者是对方的象
					if((com.chesstype[map[y][x+1]].level <= level) || (com.chesstype[map[y][x+1]].level == 8)){
						dot.push([x+1,y]);
					}
				}
			}
		}
	}

	//下侧检索

	//bottom必须在棋盘内
	if (y+1 <= 8) {
		//bottom的value不为0,则不是己方兽穴
		if(com.value[map[y][x]][y+1][x]  != 0){
			//bottom处没有棋子
			if(!map[y+1][x]){
				dot.push([x,y+1]);
			}
			//bottom处有棋子，但不是我方棋子
			else if(com.chesstype[map[y+1][x]].my != my){
				//bottom处的位置是己方陷阱
				if(com.value[map[y][x]][y+1][x] == -2){
					dot.push([x,y+1]);
				}
				//bottom处的位置不是己方陷阱,且下方和我都在陆地或都在河里
				else if(com.value[map[y][x]][y+1][x] == com.value[map[y][x]][y][x]){
					//bottom处棋子是对方的鼠或者是对方的象
					if((com.chesstype[map[y+1][x]].level <= level) || (com.chesstype[map[y+1][x]].level == 8)){
						dot.push([x,y+1]);
					}
				}
			}
		}
	}

	//左侧检索

	//left必须在棋盘内
	if (x-1 >= 0) {
		//left的value不为0,则不是己方兽穴
		if(com.value[map[y][x]][y][x-1]  != 0){
			//left处没有棋子
			if(!map[y][x-1]){
				dot.push([x-1,y]);
			}
			//left处有棋子，但不是我方棋子
			else if(com.chesstype[map[y][x-1]].my != my){
				//left处的位置是己方陷阱
				if(com.value[map[y][x]][y][x-1] == -2){
					dot.push([x-1,y]);
				}
				//left处的位置不是己方陷阱,且下方和我都在陆地或都在河里
				else if(com.value[map[y][x]][y][x-1] == com.value[map[y][x]][y][x]){
					//left处棋子是对方的鼠或者是对方的象
					if((com.chesstype[map[y][x-1]].level <= level) || (com.chesstype[map[y][x-1]].level == 8)){
						dot.push([x-1,y]);
					}
				}
			}
		}
	}

	return dot;
}


//红——蓝
com.chessBylaw.e1 = com.chessBylaw.e0;
com.chessBylaw.l1 = com.chessBylaw.l0;
com.chessBylaw.t1 = com.chessBylaw.t0;
com.chessBylaw.p1 = com.chessBylaw.p0;
com.chessBylaw.w1 = com.chessBylaw.w0;
com.chessBylaw.d1 = com.chessBylaw.d0;
com.chessBylaw.c1 = com.chessBylaw.c0;
com.chessBylaw.m1 = com.chessBylaw.m0;


//初始化：加载图片，绘制棋盘
com.init = function () {	
	//加载图片
	com.loadImage();
	//绘制棋盘
	com.drawChessboard();
}

//强制刷新页面
com.refresh = function(){
	window.location.reload();
}

//点击按钮开始游戏
com.button = document.getElementById("start-button");
com.button.addEventListener("click",function(){
	//初始化棋子布局
	com.clearChessboard();
	com.drawChessboard();
	com.drawMaps(com.initMap);
	//可以开始游戏
	com.isPlay = true;
	//红方先走
	com.nowPlayMy = -1;
	//初始化棋子布局
	com.playMap = [
		["l0",    ,    ,    ,    ,    ,"t0"],
		[    ,"d0",    ,    ,    ,"c0",    ],
		["m0",    ,"p0",    ,"w0",    ,"e0"],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		[    ,    ,    ,    ,    ,    ,    ],
		["e1",    ,"w1",    ,"p1",    ,"m1"],
		[    ,"c1",    ,    ,    ,"d1",    ],
		["t1",    ,    ,    ,    ,    ,"l1"]
	];
})

//动态变更节点
com.addClass = function(id,className){
	var element = document.getElementById(id);
	element.className = " " + className;
}

//点击按钮查看游戏规则
com.rule = document.getElementById("rule-button");
com.rule.addEventListener("click",function(){
	com.addClass("rule","rule");
})

//点击按钮关闭游戏规则
com.close = document.getElementById("close-button");
com.close.addEventListener("click",function(){
	com.addClass("rule","rule-hide");
})

//绑定点击棋盘事件
com.canvas.addEventListener("click",function(e) {
	com.clickCanvas(e);
})

//点击棋盘事件
com.clickCanvas = function(e) {
	// body...
	if (!com.isPlay) return false;
	var key = com.getClickChess(e);
	var point = com.getClickPoint(e);
	
	var x = point.x;
	var y = point.y;

	//key存在，才能定义变量，否则报错
	//点击棋子
	if(key){
		var my = com.chesstype[key].my;
		var level = com.chesstype[key].level;
		var dot = com.chessBylaw[key](com.playMap,x,y,my,level);
		com.clickChess(key,my,dot,x,y);
	}
	//点击棋盘
	else {
		com.clickPoint(x,y);
	}	
}

//判断棋子是否在别的棋子的着点内
com.inDot = function (dot,x,y){
	var a = x;
	var b = y;
	for (var i = 0; i < dot.length; i++) {
		if(dot[i][0]==a && dot[i][1]==b) return true;
	}
	return false;
}

//获取元素左上角的坐标
com.getDomXY = function (dom){
	var left = dom.offsetLeft;
	var top = dom.offsetTop;
	var current = dom.offsetParent;
	while (current !== null){
		left += current.offsetLeft;
		top += current.offsetTop;
		current = current.offsetParent;
	}
	return {x:left,y:top};
}

//获取点击棋子在二位数组地图中的坐标
com.getClickPoint = function(e) {
	//获取棋盘左上角的坐标
	var domXY = com.getDomXY(com.canvas);
	//e.pageX和e.pageY代表着点在页面的坐标
	//（x,y）代表在二位数组地图中的位置
	var x = Math.round((e.pageX-domXY.x-com.chess_width/2)/com.chess_width);
	var y = Math.round((e.pageY-domXY.y-com.chess_height/2)/com.chess_height);
	return {"x":x,"y":y}
}

//获得点击的棋子
com.getClickChess = function(e){
	var clickXY = com.getClickPoint(e);
	var x = clickXY.x;
	var y = clickXY.y;
	if (x < 0 || x > 6 || y < 0 || y > 8) return false;
	return (com.playMap[y][x] && com.playMap[y][x] != null) ? com.playMap[y][x] : false;
}

//点击棋子，有两种情况：选中或者吃子
com.clickChess = function (key,my,dot,x,y) {
	//已经点击过棋子
	if(com.nowPlayChess){
		//判断棋子是否在上一个棋子的着点内
		var indot = com.inDot(com.nowPlayDot,x,y);
		//点击的是己方棋子，则选中棋子
		if(my == com.nowPlayMy){
			//刷新并显示该棋子的边框和提示点
			com.clearChessboard();
			com.drawChessboard();	
			com.drawMaps(com.playMap);
			com.drawPane(x,y);
			for (var i = 0; i < dot.length; i++) {
				var a = dot[i][0];
				var b = dot[i][1];
				com.drawDot(a,b);
			}
			
			com.nowPlayChess = key;
			com.nowPlayDot = dot;	
			com.nowPlayChessX = x;
			com.nowPlayChessY = y;	
		}
		//点击的是对方棋子
		else if(indot){
			// 被选中敌方棋子在我方棋子的提示点内，可以吃子
			com.playMap[com.nowPlayChessY][com.nowPlayChessX] = null;
			com.playMap[y][x] = com.nowPlayChess;

			com.nowPlayChess = false;
			com.nowPlayMy = -com.nowPlayMy;

			com.clearChessboard();
			com.drawChessboard();
			com.drawMaps(com.playMap);
			//吃子后显示棋子的运动轨迹
			com.drawPane(x,y);
			com.drawPane(com.nowPlayChessX,com.nowPlayChessY);
			//吃子后判断胜负
			com.win();
		}
	}
	//在第一次加载时有效，com.nowPlayChess = false
	//在移动棋子或吃子后，com.nowPlayChess = false
	else{
		if(my == com.nowPlayMy){
			// 显示该棋子的边框和提示点
			com.clearChessboard();
			com.drawChessboard();	
			com.drawMaps(com.playMap);
			com.drawPane(x,y);
			for (var i = 0; i < dot.length; i++) {
				var a = dot[i][0];
				var b = dot[i][1];
				com.drawDot(a,b);
			}
			com.nowPlayChess = key;
			com.nowPlayDot = dot;
			com.nowPlayChessX = x;
			com.nowPlayChessY = y;
		}				
	}
}

//点击着点
com.clickPoint = function (x,y) {
	//判断棋子是否在上一个棋子的着点内
	if(com.nowPlayChess){
		var indot = com.inDot(com.nowPlayDot,x,y);
		if(indot){
			// 落点在棋子的提示点内，可以移动
			com.playMap[com.nowPlayChessY][com.nowPlayChessX] = null;
			com.playMap[y][x] = com.nowPlayChess;
			com.nowPlayChess = false;
			com.nowPlayMy = -com.nowPlayMy;

			com.clearChessboard();
			com.drawChessboard();
			com.drawMaps(com.playMap);
			//显示棋子的移动轨迹
			com.drawPane(x,y);
			com.drawPane(com.nowPlayChessX,com.nowPlayChessY);
			//移动棋子后判断
			com.win();
		}
		else{
			// 落点不在棋子的提示点内，刷新
			com.clearChessboard();
			com.drawChessboard();
			com.drawMaps(com.playMap);
		}
	}
}

//判断胜负
com.win = function(){
	var rednum = 0;
	var bluenum = 0;
	for (var i = 0; i < com.playMap.length; i++) {
		for (var j = 0; j < com.playMap[i].length; j++) {
			if(com.playMap[i][j]){
				//如果蓝方兽穴有棋子，游戏结束，红方胜利，跳出循环
				if((i == 0) && (j == 3)){
					com.win = -1;
					com.showWin();	
					break;				
				}
				//如果红方兽穴有棋子，游戏结束，蓝方胜利，跳出循环
				if((i == 8) && (j == 3)){
					com.win = 1;
					com.showWin();	
					break;				
				}

				if(com.chesstype[com.playMap[i][j]].my == -1) {
					rednum++;
				}
				if(com.chesstype[com.playMap[i][j]].my == 1) {
					bluenum++;
				}
			}
		}
	}
	//当红方场上没有棋子时，游戏结束，蓝方胜利
	if(rednum == 0){
		com.isPlay = false;
		com.win = 1;
		com.showWin();
	}
	//当蓝方场上没有棋子时，游戏结束，红方胜利
	if(bluenum == 0){
		com.isPlay = false;
		com.win = -1;
		com.showWin();
	}
}

//游戏结束，显示胜负
com.showWin = function () {
	if(com.win == 1){
		alert("游戏结束，蓝方胜利！请重新开始游戏。")
		com.refresh();
		com.init();
	}
	if(com.win == -1){
		alert("游戏结束，红方胜利！请重新开始游戏。")
		com.refresh();
		com.init();
	}
}

//执行初始化函数
com.init();





