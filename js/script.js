$(function(){

		$("#container").height($(document).height()-40);

		function game(){
			this.data = [
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
			];
		
			this.startX = 0;
			this.startY = 0;
			this.endX = 0;
			this.level = [];
			this.endY = 0;
			this.flag = 1;
			this.num = 1;
			this.score = 0;
			this.slide = false;		//是否是可滑动的， 默认不可以滑动，产生一个随机数
			this.init();
		}

		game.prototype = {
		
			/*0的位置产生一个随机的2或者4*/
			randomNum: function(){
				var rand = Math.ceil(Math.random() * 8); 	//产生0-4的随机整数
				if(rand != 8){
					rand = 2;
				}
				else{
					rand = 4;
				}
				var x = Math.floor(Math.random() * 4),
						y = Math.floor(Math.random() * 4);
				if(this.data[x][y] == 0){
					 this.data[x][y] = rand;
				}
				else{
					 this.randomNum();
				}
			},

			moveDirection: function(x, y){
				var direction = "";
				if(x == 0 && y == 0){
						return;
				}
				if(Math.abs(x) > Math.abs(y)){
						if(x > 0){
							direction = "right";
						}
						else{
							direction = "left";
						}
				}
				else{
						if(y > 0){	//浏览器的y坐标轴向下是正的，向上是负的
							direction = "down";
						}
						else{
							direction = "up";
						}
				}
				return direction;			//返回移动方向
			},

			move: function(direction){
				switch(direction){
						case "up":
								this.moveUp();
								break;
						case "down":
								this.moveDown();
								break;
						case "right":
								this.moveRight();
								break;
						case "left":
								this.moveLeft();
								break;
				}
			},

			//界面重绘
			repraint: function(){
				var num = 0;
				for (var i = 0; i < 4; i++){
					for (var j = 0; j < 4; j++){
						num = i * 4 + j;
						if(this.data[i][j] != 0){
							$(".div-box div").eq(num).removeClass();
							$(".div-box div").eq(num).addClass("num" + this.data[i][j]).html(this.data[i][j]);
						}
						else{
							$(".div-box div").eq(num).removeClass().html("");
						}
						if(this.data[i][j] == this.flag * 2048){
								$(".reward p span").html('"' + this.flag * 2048 + '"');
								$(".reward").css({"display": "block"});
								this.flag *= 2;
						}
					}
				}
				$(".current-score").html(this.score);
			
				for (var i = 0; i < 4; i++){	
					for (var j = 0; j < 4; j++){
							if(this.data[i][j] == 0){
								return;
							}
							if(j < 3 && this.data[i][j] == this.data[i][j + 1]){
								return;
							}
							if(i < 3 && this.data[i][j] == this.data[i + 1][j]){
								return;
							}
					}
				}
				$(".page-bg").css({"display": "block"});
				$(".skills").css({"display": "block"});
			},			

			moveUp: function(){
				for (var j = 0; j < 4; j++){
					for (var m = 0; m < 3; m++){
						for (var i = 0; i < 3; i++){
								if (this.data[i][j] == 0 && this.data[i + 1][j] != 0){
										this.data[i][j] = this.data[i + 1][j];
										this.data[i + 1][j] = 0;
										this.slide = true;
								}			
						}
					}	
				}
				for (var j = 0; j < 4; j++){
					for (var i = 0; i < 3; i++){
							if (this.data[i][j] != 0 && (this.data[i][j] == this.data[i + 1][j])){
									this.data[i][j] *= 2;
									this.data[i + 1][j] = 0;
									this.score += this.data[i][j];
									this.slide = true;
							}
					}
				}
				for (var j = 0; j < 4; j++){
					for (var m = 0; m < 2; m++){
						for (var i = 0; i < 3; i++){
								if (this.data[i][j] == 0 && this.data[i + 1][j] != 0){
										this.data[i][j] = this.data[i + 1][j];
										this.data[i + 1][j] = 0;
								}
						}
					}
				}
				if(this.slide){
					this.randomNum();
					this.repraint();
				}
				this.slide = false;
			},

			moveDown: function(){
				for (var j = 0; j < 4; j++){
					for (var m = 0; m < 3; m++){
						for (var i = 3; i > 0; i--){
								if (this.data[i][j] == 0 && this.data[i - 1][j] !=0){
									this.data[i][j] = this.data[i - 1][j];
									this.data[i - 1][j] = 0;
									this.slide = true;
								}
						}
					}
				}
				for (var j = 0; j < 4; j++){
					for (var i = 3; i > 0; i--){
							if(this.data[i][j] != 0 && (this.data[i][j] == this.data[i - 1][j])){
									this.data[i][j] *= 2;
									this.data[i - 1][j] = 0;
									this.score += this.data[i][j];
									this.slide = true;
							}
					}
				}
				for (var j = 0; j < 4; j++){
					for (var m = 0; m < 2; m++){
						for (var i = 3; i > 0; i--){
								if(this.data[i][j] == 0 && this.data[i - 1][j] != 0){
									this.data[i][j] = this.data[i - 1][j];
									this.data[i - 1][j] = 0;
								}
						}
					}
				}
				if(this.slide){
					this.randomNum();
					this.repraint();
				}
				this.slide = false;
			},

			moveRight: function(){
				for (var i = 0; i < 4; i++){
					for (var m = 0; m < 3; m++){
						for (var j = 3; j > 0; j--){
								if (this.data[i][j] == 0 && this.data[i][j - 1] !=0){
									this.data[i][j] = this.data[i][j-1];
									this.data[i][j - 1] = 0;
									this.slide = true;
								}
						}
					}
				}
				for (var i = 0; i < 4; i++){
					for (var j = 3; j > 0; j--){
							if (this.data[i][j] != 0 && (this.data[i][j] == this.data[i][j-1])){
								this.data[i][j] *= 2;
								this.data[i][j - 1] = 0;
								this.score += this.data[i][j];
								this.slide = true; 
							}
					}
				}
				for (var i = 0; i < 4; i++){
					for (var m = 0; m < 2; m++){
						for (var j = 3; j > 0; j--){
								if (this.data[i][j] == 0 && this.data[i][j - 1] != 0){
									this.data[i][j] = this.data[i][j - 1];
									this.data[i][j - 1] = 0;
								}
						}
					}
				}
				if(this.slide){
						this.randomNum();
						this.repraint();
				}
				this.slide = false;
			},

			moveLeft: function(){
				for (var i = 0; i < 4; i++){
					for (var m = 0; m < 3; m++){
						for (var j = 0; j < 3; j++){
								if (this.data[i][j] == 0 && this.data[i][j + 1] != 0){
										this.data[i][j] = this.data[i][j + 1];
										this.data[i][j + 1] = 0;
										this.slide = true;
								}
						}
					}
				}
				for (var i = 0; i < 4; i++){
					for (var j = 0; j < 3; j++){
							if (this.data[i][j] != 0 && (this.data[i][j] == this.data[i][j + 1])){
									this.data[i][j] *= 2;
									this.data[i][j + 1] = 0;
									this.score += this.data[i][j];
									this.slide = true;
							}
					}
				}
				for (var i = 0; i < 4; i++){
					for (var m = 0; m < 2; m++){
						for (var j = 0; j < 3; j++){
								if (this.data[i][j] == 0 && this.data[i][j + 1] != 0){
									this.data[i][j] = this.data[i][j + 1];
									this.data[i][j + 1] = 0;
								}
						}
					}
				}
				if (this.slide){
					this.randomNum();
					this.repraint();
				}
				this.slide = false;
			},

			touchOrMouse: function (){
				var _self = this;
				var sUserAgent = navigator.userAgent.toLowerCase();
				var bIsIpad = sUserAgent.match(/ipad/) == "ipad";
				var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
				var bIsMidp = sUserAgent.match(/midp/i) == "midp";
				var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
				var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
				var bIsAndroid = sUserAgent.match(/android/i) == "android";
				var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
				var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
				var isTouch = bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM;

				if (isTouch){
					try {
						document.getElementById("container").addEventListener("touchstart", function(e) {
								e.preventDefault();
								this.startX = e.touches[0].pageX;
								this.startY = e.touches[0].pageY;
						});
						document .getElementById("container").addEventListener("touchmove", function(e) {
								e.preventDefault();
								this.endX = e.touches[0].pageX;
								this.endY = e.touches[0].pageY;
						});
						document.getElementById("container").addEventListener("touchend", function(e) {
								e.preventDefault();
								var x = this.endX - this.startX;
								var y = this.endY - this.startY;
								_self.move(_self.moveDirection(x, y));
						});
					}
					catch(e){
							alert("移动版异常");
					}
				}
				else{
					try {
						document.getElementById("container").addEventListener("mousedown", function(e) {
								e.preventDefault();
								this.startX = Number(e.pageX);
								this.startY = Number(e.pageY);
								this.endX = this.startX;
								this.endY = this.startY;
						});
						document.getElementById("container").addEventListener("mouseup", function(e) {
								e.preventDefault();
								this.endX = Number(e.pageX);
								this.endY = Number(e.pageY);
								var x = this.endX - this.startX;
								var y = this.endY - this.startY;
								_self.move(_self.moveDirection(x, y));
						});
					}
					catch (e){
						alert("PC版异常");
					}
				}
			},
			
			init: function(){
				var _self = this;
				this.randomNum();
				this.randomNum();

				for (var i = 0; i < 4; i++){
					for (var j = 0; j < 4; j++){
						if (this.data[i][j] != 0){
							var num = i * 4 + j;
							$(".div-box div").eq(num).addClass("num" + this.data[i][j]).html(this.data[i][j]);
						}
					}
				}
				this.touchOrMouse();
				$(".refresh").bind("click", function(){
					location.reload();
				});
				$(".current-score").html(this.score);
			}
			
		};
		
		var newGame = new game();
		
		document.onkeydown = function(e){
			e = window.event || e;
			switch(e.keyCode){
				case 37: 
					newGame.move("left");
					break;
				case 38:
					newGame.move("up");
					break;
				case 39:
					newGame.move("right");
					break;
				case 40:
					newGame.move("down");
					break;
			}
		}
		$(".reward-content button").click(function(){
				$(".reward").css({"display": "none"});
		});

})
