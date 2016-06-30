	function BarMenu() {

		//프로퍼티 생성
		this.init();
		this.initEvent();
	}

	//요소 초기화
	BarMenu.prototype.init = function() {
		console.log('init');
	}

	//이벤트 초기화
	BarMenu.prototype.initEvent = function() {
		console.log('initEvent');
	}