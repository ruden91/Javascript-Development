	function FolderAccordionMenu(selector) {
		this.$accordionMenu = null;
		this.$mainMenuItems = null;

		// 선택 서브 메뉴아이템
		this.$selectSubItem = null;

		this.init(selector);
		this.initSubMenuPanel();
		this.initEvent();
	}

	/*
	* 요소 초기화
	*/
	FolderAccordionMenu.prototype.init = function(selector) {
		this.$accordionMenu = $(selector);
		this.$mainMenuItems = this.$accordionMenu.children('li');
	}

	/*
	* 이벤트 초기화
	*/
	FolderAccordionMenu.prototype.initEvent = function() {
		var that = this;
		this.$mainMenuItems.children('.main-title').click(function(e) {
			var $item = $(this).parent();
			that.toggleSubMenuPanel($item);
		})

		this.$mainMenuItems.find('.sub li').click(function(e) {
			that.selectSubMenuItem($(this));
		})
	}

	/*
	* 서브 메뉴 아이템 선택
	*/
	FolderAccordionMenu.prototype.selectSubMenuItem = function($item) {
		if(this.$selectSubItem != null) {
			this.$selectSubItem.removeClass('select');
		}

		this.$selectSubItem = $item;
		this.$selectSubItem.addClass('select');
	}
	/*
	* 서브 메뉴패널 열고 닫기
	*/
	FolderAccordionMenu.prototype.toggleSubMenuPanel = function($item) {
		var extension = $item.attr('data-extension');

		// 서브가 없는 경우 취소
		if(extension == 'empty') {
			return;
		}

		if(extension == 'open') {
			this.closeSubMenu($item);
		} else {
			this.openSubMenu($item);
		}
	}
	/*
	* 폴더 상태 설정
	*/
	FolderAccordionMenu.prototype.setFolderState = function($item, state) {
		var $folder = $item.find('.main-title .folder');

		// 기존 클래스를 모두 제거
		$folder.removeClass();
		$folder.addClass('folder ' + state);
	}

	/*
	* 서브 패널 초기화 - 초기 시작 시 닫힌 상태로 만들기
	*/
	FolderAccordionMenu.prototype.initSubMenuPanel = function() {
		var that = this;

		this.$mainMenuItems.each(function(index) {
			var $item = $(this);
			var $subMenu = $item.find('.sub');

			// 서브가 없는 경우
			if($subMenu.length == 0) {
				$item.attr('data-extension', 'empty');
				that.setFolderState($item, 'empty');
			} else {
				if($item.attr('data-extension') == 'open') {
					// that.setFolderState($item);
					that.openSubMenu($item, false);
				} else {
					//$item.attr('data-extension', 'close');
					//that.setFolderState($item);
					that.closeSubMenu($item,false);
				}
			}
		})
	}

	/*
	* 서브 메뉴패널 열기
	* animation 기본값은 true 
	*/
	FolderAccordionMenu.prototype.openSubMenu = function($item, animation) {
		if($item != null) {
			$item.attr('data-extension', 'open');
			var $subMenu = $item.find('.sub');
			
			if(animation == false) {
				$subMenu.css({
					marginTop : 0
				});				
			} else {
				$subMenu.stop().animate({
					marginTop : 0,
				},600,'easeInCubic');
			}

			// 폴더 상태를 open 상태로 만들기
			this.setFolderState($item, 'open');
		}
	}

	/*
	* 서브 메뉴패널 닫기
	*/
	FolderAccordionMenu.prototype.closeSubMenu = function($item, animation) {
		if($item != null) {
			$item.attr('data-extension', 'close');

			var $subMenu = $item.find('.sub');
			var subMenuPanelHeight = -$subMenu.outerHeight(true);

			if(animation == false) {
				$subMenu.css({
					marginTop : subMenuPanelHeight
				});
			} else {
				$subMenu.stop().animate({
					marginTop : subMenuPanelHeight
				}, 600, 'easeInCubic');
			}

			// 폴더 상태를 close 상태로 만들기
			this.setFolderState($item, 'close');
		}
	}
