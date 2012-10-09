package com
{
	import com.net.LoadSwfOrBitmap;
	import flash.display.MovieClip;
	import flash.events.Event;
	
	
	public class Loading extends MovieClip
	{
		private var _main:Main;
		
		private var _url:String;
		
		private var _l:LoadSwfOrBitmap;
		
		
		
		
		
		
		public function Loading($main:Main,$url:String)
		{
			this._main = $main;
			this._url = $url;
			
			
			this.bar.stop();
			this.msg.text = "1%";
			
			this.addEventListener(Event.ADDED_TO_STAGE,addStage);
		}
		
		private function addStage($evt:Event):void
		{
			this._l = new LoadSwfOrBitmap(this._url);
			this._l.addEventListener(LoadSwfOrBitmap.PROGRESS,progressFunction);
			this._l.addEventListener(LoadSwfOrBitmap.COMPLETE,completeFunction);
		}
		
		private function progressFunction($evt:Event):void
		{
			this.bar.gotoAndStop(this._l.loadNum);
			this.msg.text = String(this._l.loadNum) + "%";
		}
		
		private function completeFunction($evt:Event):void
		{
			this._main.createNewGame(this._l.getSwf)
		}
	}
}