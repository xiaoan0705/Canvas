var Histogram=function(option){
	this._init(option);
}

Histogram.prototype={
	_init:function(option){
		//设置底线的原点
		this.x=option.x;
		this.y=option.y;
		this.data=option.data;
		//最大的宽度
		this.width=option.width;
		//最大的高度
		this.height=option.height;
		this.group=new Konva.Group({
			x:this.x,
			y:this.y
		});
		var line = new Konva.Line({
	      	points: [0,0,this.width,0],
	      	stroke: 'red',
	      	strokeWidth: 2,
	      	lineCap: 'round',
	      	lineJoin: 'round'
		});
		this.group.add(line);
		//画矩形
		var dataWidth=this.width/this.data.length;
		for(var i=0;i<this.data.length;i++){
			var rect=new Konva.Rect({
				x:(i+1/4)*dataWidth,
				y:-this.height*this.data[i].value,
				width:1/2*dataWidth,
				height:this.data[i].value*this.height,
				fill:this.data[i].color,
				cornerRadius:10,
				shadowColor:'teal',
				shadowBlur:10,
				name:'rect'
			});
			this.group.add(rect);
			
			//加文字
			var uptext=new Konva.Text({
				x:i*dataWidth,
				y:-this.height*this.data[i].value-20,
				width:dataWidth,
				fill:this.data[i].color,
				align:'center',
				text: this.data[i].value*100+'%',
				name:'uptext'
			});
			this.group.add(uptext);
			var downtext=new Konva.Text({
				x:(i+1/2)*dataWidth,
				y:10,
				fill:this.data[i].color,
				align:'center',
				text: this.data[i].name,
				rotation:30
			});
			this.group.add(downtext);
			}
		
		
	},

	moveTo:function(){
		//得到group中所有的圆柱
		var rectArr=this.group.find('.rect'); 
		//得到柱状图的原始高度
		rectArr.forEach(function(item,index){
			var oldH=item.height();//获取柱状图的高度
			item.height(0);//设置起始高度
			var oldY=item.y();
			item.y(0);
			item.to({
				y:oldY,
				height:oldH,
				duration:1
			});
		});
		
		var uptextArr=this.group.find('.uptext'); 
		uptextArr.forEach(function(item,index){
			var oldY=item.y();
			item.y(-item.fontSize());
			item.to({
				y:oldY,
				duration:1
			});
		});
	}
}
