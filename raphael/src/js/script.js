var app = {
	init: function(id){
		this.circle(id);
	},
	circle: function(id){
		var path_size = 300;
		var path_center = path_size/2;
		var r = Raphael(id, path_size, path_size);
		var timer;
		var z;
		var color = '#000',
			total = 100,
			rad = 0;
		//
		// @param cx {Number} 円のx位置
		// @param cy {Number} 円のy位置
		// @param r {Number} 円の半径
		// @param value {Number} 弧の角度
		// @return {Object} 円弧のパス文字列
		r.customAttributes.arc = function (cx, cy, r, value) {
			var a =(90-value)*Math.PI/180,
			    x = cx+r*Math.cos(a),
			    y = cy-r*Math.sin(a),
			    path;
			if(value==360){
				path=[["M",cx,cy-r],["A",r,r,0,1,1,cx-0.001,cy-r]];
			}else{
				path=[["M",cx,cy-r], ["A",r,r,0,+(value>180),1,x,y]];
			}
			return {path: path, stroke: '#000'};
		};
		z = r.path().attr({
			'arc': [path_center, path_center, path_size/4, rad],
			'stroke-width': 30
		});
		// 弧の角度を0から360に増やしていく
		var init = true;
		function update(){
			var spd = 500;
			if (init) {
				spd = 0;
			}
			z.animate({
				'arc': [path_center, path_center, path_size/4, rad]
			}, spd, '<', function(){
				if (rad == 360) {
					rad = 360;
					z.attr({
						'arc': [path_center, path_center, path_size/4, rad],
						'stroke-width': 30
					});
					rad = 0;
					init = true;
					return;
				}else{
					init = false
					rad += 36;
				}
			});
		}
		// 弧の角度を0にリセットしてタイマーを動かす
		function reset(){
			rad = 0;
			timer = setInterval(function () {
				update();
			}, 1000);
		}
		reset();
	}
};
$(function(){
	app.init('canvas');
});
