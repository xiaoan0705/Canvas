var Schedule=function(obj){
	this._init(obj);
}
Schedule.prototype={
	_init:function(obj){
		//外部矩形的坐标、宽高、边框颜色以及圆角
		//内部矩形的宽、填充颜色
		this.x=obj.x||0;
		this.y=obj.y||0;
		this.innerW=obj.innerW||0;
		this.height=obj.height||0;
		this.stroke=obj.stroke||'red';
		this.cornerRadius=obj.CornerRadius||0;
		this.outW=obj.outW||0;
		this.fill=obj.fill||'blue';
		this.stage=obj.stage;
		this.text=obj.text;
		this.fontSize=obj.fontSize;
		this.group=new Konva.Group({
			x:this.x,
			y:this.y
		});
			//开始绘制矩形
		this.outRect=new Konva.Rect({
			x:0,
			y:0,
			width:this.outW,
			height:this.height,
			stroke:this.stroke,
			cornerRadius:this.cornerRadius
		});
		this.group.add(this.outRect);
		
		this.innerRect=new Konva.Rect({
			x:0,
			y:0,
			width:this.innerW,
			height:this.height,
			fill:this.fill,
			cornerRadius:this.cornerRadius
		});
		this.group.add(this.innerRect);
		
		this.simpletext=new Konva.Text({
			x:0,
			y:-this.fontSize-4,
			text:this.text,
			width:this.outW,
			fontSize:this.fontSize,
			fontFamily:'Calibri',
			fill:'#555',
			align:'center'
		});
		
		this.group.add(this.simpletext);
	},
	addToGroupOrLayer:function(layerOrGroup){
		layerOrGroup.add(this.group);
	},
	changeVal:function(val){
		if(val>1){
			val/=100;
		}
		var _this=this;
		_this.innerRect.to({
			width:val*_this.outW,
			duration:2
		});
		window.setInterval(window.this);
		this.simpletext.text('努力加载中：'+val*100+'%');
		
	}
}
