/**
 *加载外部swf或者bim图片
 * 
 * 使用方法：
 * 先初始化，然后注册监听，等待载入完毕后，调用getSwf()返回movieClip，如果加载的图片调用getBim()返回的是Bitmap
 * 
 * import com.cn.net.LoadSwfOrBitmap;
 * import flash.events.Event;
 * var l:LoadSwfOrBitmap = new LoadSwfOrBitmap("http://www.qz828.com/pic/0/10/15/87/10158726_966060.jpg");
 * l.addEventListener("LOAD_COMPLETE",comp);
 * function comp(e:Event){addChild(l.getBim);}
 * 
 * @作者：陈庚荣
 * @时间：20110413 
 */
package com.net{
	import flash.events.EventDispatcher;
	import flash.display.MovieClip;
	import flash.events.ProgressEvent;
	import flash.system.ApplicationDomain;
	import flash.system.LoaderContext;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.net.URLRequest;
	import flash.display.Loader;
	import flash.display.Bitmap;
	
	
	
	
	
	
	
	public class LoadSwfOrBitmap extends EventDispatcher {
		//加载完成
		public static const COMPLETE:String = "LOAD_COMPLETE";
		//进度
		public static const PROGRESS:String = "LOAD_PROGRESS";
		//IO 错误
		public static const IO_ERROR:String = "LOAD_IO_ERROR";
		//loader
		private var _loader:Loader;
		//加载进度
		private var _loadNum:uint = 0;
		/**
		 *获取加载进度 
		 * @return 
		 * 
		 */		
		public function get loadNum():uint{
			return _loadNum;
		}
		/**
		 *获取加载完成的swf 
		 * @return 
		 * 
		 */		
		public function get getSwf():MovieClip {
			var instance:MovieClip = _loader.content as MovieClip;
			return instance;
		}
		/**
		 *获取加载完成的图片
		 * @return 
		 * 
		 */		
		public function get getBim():Bitmap{
			var bim:Bitmap = _loader.content as Bitmap;
			return bim;
		}
		
		
		
		
		
		
		
		
		public function LoadSwfOrBitmap($url:String) {
			var url:URLRequest= new URLRequest($url);
			_loader = new Loader();
			_loader.load (url);
			_loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS,gonProgress);
			_loader.contentLoaderInfo.addEventListener(Event.COMPLETE,gonComplete);
			_loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR,gonIOError);
		}
		/**
		 * 加载进度
		 * @param $evt ProgressEvent事件
		 * 
		 */		
		private function gonProgress ($evt:ProgressEvent):void {
			_loadNum = uint($evt.bytesLoaded/$evt.bytesTotal * 100);
			//发送事件
			dispatchEvent(new Event(LoadSwfOrBitmap.PROGRESS));			
		}
		/**
		 * 加载完成
		 * @param $evt
		 * 
		 */		
		private function gonComplete($evt:Event):void
		{
			_loader.contentLoaderInfo.removeEventListener(ProgressEvent.PROGRESS,gonProgress);
			_loader.contentLoaderInfo.removeEventListener(Event.COMPLETE,gonComplete);
			_loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR,gonIOError);
			//发送事件
			dispatchEvent (new Event(LoadSwfOrBitmap.COMPLETE));
		}
		/**
		 * 加裁出错，超时或者地址错误
		 * @param $evt
		 * 
		 */		
		private function gonIOError ($evt:IOErrorEvent):void {
			dispatchEvent (new Event(LoadSwfOrBitmap.IO_ERROR));
		}
	}
}