	function BarMenu(selector) {

		// 프로퍼티 생성하기
		this.$barMenu = null;
		this.$menuBody = null;
		this.$menuItems = null;
		this.$overItem = null;
		this.$bar = null;

		//선택 메뉴 아이템
		this.$selectItem = null;

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

	// 이벤트 초기화
	BarMenu.prototype.initEvent = function() {
		var that = this;

		// 오버 메뉴 효과 처리
		this.$menuItems.mouseenter(function(e) {
			that.setOverMenuItem($(this));
		});

		// 메뉴 영역을 나간 경우
		this.$barMenu.mouseleave(function(e) {

			// 기존 오버메뉴아이템이 있는 경우 제거
			that.removeOverItem();

			that.reSelectMenuItem();
		})

		// 선택 메뉴아이템 처리
		this.$menuItems.click(function(e) {

			// 기존 오버 메뉴아이템이 있는 경우 제거
			that.removeOverItem();

			// 선택 메뉴아이템 처리
			that.setSelectMenuItem($(this));
		})

	}

	// 오버 메뉴아이템 제거
	BarMenu.prototype.removeOverItem = function() {
		if (this.$overItem) {
			this.$overItem.removeClass('over');
		}

		this.$overItem = null;

		this.moveBar(null);
	}
	/*
	* 오버 메뉴 아이템 처리하기
	* $item : 신규 오버 메뉴아이템
	*/
	BarMenu.prototype.setOverMenuItem = function($item) {

		// 기존 오버 메뉴아이템에서 over 스타일 제거
		if (this.$overItem) {
			this.$overItem.removeClass('over');
		}

		//this.$overItem = $item;
		//this.$overItem.addClass('over');

		// 신규 오버 메뉴아이템이 선택 메뉴아이템과 같지 않은 경우에만 오버 메뉴아이템 스타일 적용하기
		// 선택 메뉴아이템 인덱스 값 구하기
		var selectIndex = -1;
		if (this.$selectItem != null) {
			selectIndex = this.$selectItem.index();
		}

		// 신규 오버 메뉴아이템의 인덱스 값과 선택 메뉴아이템 인덱스 값을 비교
		if ($item.index() != selectIndex) {

			// 오버 효과 처리
			this.$overItem = $item;
			this.$overItem.addClass('over');
		} else {
			this.$overItem = null;
		}

		// 메뉴 바 이동
		this.moveBar($item);
	}

	/*
	* $item : 이동 메뉴아이템
	*/

	BarMenu.prototype.moveBar = function($item) {
		var left = -100;
		var width = 0;
		if ($item != null) {
			left = $item.position(true).left + parseInt($item.css('margin-left'));
			width = $item.outerWidth();
		}

		// 애니메이션 이동
		this.$bar.stop().animate({
			'left' : left,
			'width' : width
		},300, 'easeOutQuint');
	}

	/*
	* 선택 메뉴아이템 처리
	* $item : 선택 메뉴아이템
	*/
	BarMenu.prototype.setSelectMenuItem = function($item) {

		// 선택 메뉴 아이템 스타일 처리
		if (this.$selectItem) {
			this.$selectItem.removeClass('select');
		}

		this.$selectItem = $item;
		this.$selectItem.addClass('select');

		// 메뉴 바 이동
		this.moveBar($item);
	}

	// 기존 선택 메뉴아이템이 있는 경우 선택 처리
	BarMenu.prototype.reSelectMenuItem = function() {
		if(this.$selectItem) {
			this.moveBar(this.$selectItem);
		}
	}