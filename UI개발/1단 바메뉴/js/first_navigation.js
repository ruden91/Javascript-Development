	function BarMenu(selector) {

		//프로퍼티 생성
		this.$barMenu = null;
		this.$menuBody = null;
		this.$menuItems = null;
		this.$overItem = null;
		this.$bar = null;

		this.init(selector);
		this.initEvent();
	}

	//요소 초기화
	BarMenu.prototype.init = function(selector) {
		this.$barMenu = $(selector);
		this.$menuBody = this.$barMenu.find('.navMenu');
		this.$menuItems = this.$menuBody.find('li');
		this.$bar = this.$barMenu.find('.bar');
	}

	//이벤트 초기화
	BarMenu.prototype.initEvent = function() {
		var that = this;

		// 오버 메뉴 효과 처리
		this.$menuItems.mouseenter(function(e) {
			that.setOverMenuItem($(this));
		})
	}

	/*
	*	오버 메뉴아이템 처리하기
	*	$item : 신규 오버 메뉴아이템
	*/
	BarMenu.prototype.setOverMenuItem = function($item) {

		//기존 오버 메뉴아이템에서 over 스타일 제거
		if(this.$overItem) {
			this.$overItem.removeClass('over');
		}

		this.$overItem = $item;
		this.$overItem.addClass('over');
	}