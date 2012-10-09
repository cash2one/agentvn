package com
{
	
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	
	
	
	public class Main extends MovieClip
	{
		//进度显示条
		private var _loading:Loading;
		//加载进来的flash
		private var _newGame:MovieClip;
		
		
		
		public function Main()
		{
			this.addEventListener(Event.ADDED_TO_STAGE,addStage);
		}
		
		private function addStage($evt:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE,addStage);
			this.stage.align = StageAlign.LEFT;
			this.stage.scaleMode = StageScaleMode.NO_SCALE;
			
			this._loading = new Loading(this,"new_game.swf");
			this.addChild(this._loading);
			
			this._loading.x = this.stage.stageWidth * 0.5;
			this._loading.y = this.stage.stageHeight * 0.5;
		}
		
		
		//加载完成后执行显示操作
		public function createNewGame($mc:MovieClip):void
		{
			this.removeChild(this._loading);
			this._loading = null;
			
			this._newGame = $mc;
			this.addChild(this._newGame);
		}
	}
}