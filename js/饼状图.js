var Cake=function(option){
	this._init(option);
}
Cake.prototype={
	_init:function(option){
		//设置圆点
		this.x=option.x;
		this.y=option.y;
		this.data=option.data;
		this.radius=option.radius;
		
		this.outerRadius=option.outerRadius;
		

		this.group=new Konva.Group({
			x:0,
			y:0
		});
		var circle=new Konva.Circle({
				x:this.x,
				y:this.y,
				radius:this.radius,
				stroke:'blue',
				strokeWidth:2
		});
		this.group.add(circle);
		
		var endAngle=0;
		var textAngle;
								
		for(var i=0;i<this.data.length;i++){
				var arc=new Konva.Arc({
					x:this.x,
					y:this.y,
					outerRadius:this.outerRadius,
					angle:this.data[i].value*360,
					fill:this.data[i].color,
					rotation:endAngle,
					name:'arc'
				});
				textAngle=endAngle+1/2*this.data[i].value*360;
				var Text=new Konva.Text({
					x:this.x+(this.radius+20)*Math.cos(textAngle*Math.PI/180),
					y:this.y+(this.radius+20)*Math.sin(textAngle*Math.PI/180),
					text:this.data[i].value*100+'%',
					fontSize:20,
					fill:this.data[i].color
				});
				endAngle+=this.data[i].value*360;
				if(textAngle>90&&textAngle<270){
					Text.x(Text.x()-Text.width());
				}
				this.group.add(arc);
				this.group.add(Text);
				
			}
	},
	moveTo:function(){
		var arcArr=this.group.find('.arc');
		arcArr.forEach(function(item,index){
			var oldAngle=item.angle();
			item.angle(0);
			item.to({
				angle:oldAngle,
				duration:2	
			});
		});
	}
}
