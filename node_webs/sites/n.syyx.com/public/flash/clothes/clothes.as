package  {
	import flash.display.*;
	import flash.events.MouseEvent;
	import flash.events.Event;
	import flash.net.*;
	import flash.text.*;
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	
	public class clothes extends Sprite {

		private var rotateLeft:Sprite = new Sprite();
		private var rotateRight:Sprite = new Sprite();
		private var clothesBg:Loader = new Loader();
		private var linkClothes:Loader = new Loader();
		private var containerLeft:MovieClip = new MovieClip();
		private var totalFramesSwf = new Number();
		
		public function clothes() {
			clothesBg.load(new URLRequest("bg.jpg"));
			addChild(clothesBg);
			 
			linkClothes.contentLoaderInfo.addEventListener(Event.COMPLETE,loaderComplete);
			
			function loaderComplete(evt:Event):void{
			containerLeft = linkClothes.content as MovieClip;
			containerLeft.x = -40;
			containerLeft.y = -40;
			addChild(containerLeft);
			containerLeft.gotoAndStop(1);
			totalFramesSwf = containerLeft.totalFrames;
			}
			
			
			linkClothes.load(new URLRequest("1.swf"));
			
			rotateLeft.graphics.beginFill(0xff0000,0);
			rotateLeft.graphics.drawCircle(0, 0, 50);
			rotateLeft.graphics.endFill();	
			rotateLeft.x = 84;
			rotateLeft.y = 280;
			rotateLeft.buttonMode = true;
			rotateLeft.addEventListener(MouseEvent.CLICK,rotateLeftStart);//监听开始按钮
			addChild(rotateLeft);
			
			
			rotateRight.graphics.beginFill(0xff0000,0);
			rotateRight.graphics.drawCircle(0, 0, 50);
			rotateRight.graphics.endFill();	
			rotateRight.x = 360;
			rotateRight.y = 280;
			rotateRight.buttonMode = true;
			rotateRight.addEventListener(MouseEvent.CLICK,rotateRightStart);//监听开始按钮
			addChild(rotateRight);
			
		}
		
		public function rotateLeftStart(event:MouseEvent):void{
				var currentFrameSwf = containerLeft.currentFrame;
				if(currentFrameSwf==totalFramesSwf)
				{
					containerLeft.gotoAndStop(1);
				}
				containerLeft.nextFrame();
		}
		
		public function rotateRightStart(event:MouseEvent):void{
				var currentFrameSwf = containerLeft.currentFrame;
				if(currentFrameSwf == 1)
				{
					containerLeft.gotoAndStop(totalFramesSwf);
				}
				containerLeft.prevFrame();
		}
		
		
		

	}
	
}
