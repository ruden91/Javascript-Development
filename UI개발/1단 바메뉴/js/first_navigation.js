
(function($){
    // step #06-01
    // barMenu 플러그인
    $.fn.barMenu=function(){
        // 선택자에 해당하는 요소 개수 만큼 BarMenu 객체 생성
        this.each(function(index){
            var barMenu = new BarMenu(this);
           
        });
        return this;
    }
})(jQuery);


function BarMenu(selector){
    // step #02-02
    // 프로퍼티 생성하기 
    this.$barMenu = null;
    this._$menuBody= null;
    this._$menuItems  = null;
    this._$overItem = null;
    this._$bar = null;
    
    // step #03-01
    // 선택 메뉴 아이템
    this._$selectItem = null;
    
    this._init(selector);
    this._initEvent();   
}


// 요소 초기화 
BarMenu.prototype._init=function(selector){
    // step #02-02
    this.$barMenu = $(selector);
    
    console.log(this.$barMenu);
    this._$menuBody = this.$barMenu.find(".menu-body");
    this._$menuItems = this._$menuBody.find("li");
    this._$bar = this.$barMenu.find(".bar");
}


// 이벤트 초기화 
BarMenu.prototype._initEvent=function(){
    // step #02-02
    var objThis = this;
    
    // 오버 메뉴 효과 처리
    this._$menuItems.mouseenter(function(e){
        objThis._setOverMenuItem($(this));
    })  
    
    // step #02-03
    // 메뉴 영역을 나간 경우
    this.$barMenu.mouseleave(function(e){
        // 기존 오버메뉴 아이템이 있는 경우 제거
        objThis._removeOverItem();
        
        // step #03-03
        // 기존 선택메뉴 아이템이 있는 경우 선택처리
        objThis._reSelectMenuItem();
    
    })
    
    // step #03-01
    // 선택 메뉴 아이템 처리
    this._$menuItems.click(function(e){
        // 기존 오버메뉴 아이템이 있는 경우 제거
        objThis._removeOverItem();
        // 선택 메뉴 아이템 처리
        objThis.setSelectMenuItem($(this));
    })

}



// step #02-02
/*
* 오버 메뉴 아이템 처리 하기
* $item : 신규 오버 메뉴 아이템
*/
BarMenu.prototype._setOverMenuItem=function($item){
    // 기존 오버메뉴 아이템에서 over 스타일 제거
    if(this._$overItem){
        this._$overItem.removeClass("over");
    }   

    // step #03-02
    // 신규 오버 메뉴 아이템이 선택 메뉴 아이템과 같지 않은 경우에만 오버 메뉴 아이템 스타일 적용하기 
    // 주의! 
    // $item의 경우 mouseenter이벤트가 발생할때마다 $(this)에 의해서 인스턴스가 계속해서 만들이지기 때문에 
    // $selectItem == $item과 비교하면 안됨
    
    // 선택 메뉴 아이템 인덱스 값 구하기
    var selectIndex = -1;
    if(this._$selectItem!=null){
        selectIndex = this._$selectItem.index();
    }
            
    // 신규 오버메뉴 아이템의 인덱스 값과 선택 메뉴 아이템 인덱스 값을 비고        
    if($item.index()!=selectIndex){ 
       // 오버 효과 처리
       this._$overItem = $item;
       this._$overItem.addClass("over");
    }else {
        this._$overItem = null;
    }
    
    
    // step #02-04
    // 메뉴 바 이동
    this._moveBar($item);
}


// step #02-03
// 오버 메뉴 아이템 제거
BarMenu.prototype._removeOverItem=function(){
    if(this._$overItem){
        this._$overItem.removeClass("over");
    }   
    this._$overItem = null;
    
    // step #02-04      
    this._moveBar(null); 
}

/*
 * step #02-04
 * $item : 이동 메뉴 아이템
 */
BarMenu.prototype._moveBar=function($item, animation){
    
    var left = -100;
    var width = 0;
    if($item!=null) {
        left = $item.position(true).left+parseInt($item.css("margin-left"));
        width = $item.outerWidth();
    }

    if(animation==false){
        // 애니메이션 없이 바로 이동
        this._$bar.css({
            "left":left,
            "width":width
        });
    }else {
        // 애니메이션 이동
        this._$bar.stop().animate({
            "left":left,
            "width":width
        },300,"easeOutQuint");
    }
}


/*
 * step #03-01
 * 선택 메뉴 아이템 처리
 * $item : 선택 메뉴 아이템
 * 
 */
BarMenu.prototype.setSelectMenuItem=function($item, animation){
    
    // step #04
    var $oldItem = this._$selectItem;
    
    // 선택 메뉴 아이템 스타일 처리
    if(this._$selectItem){
        this._$selectItem.removeClass("select");
    }
    this._$selectItem = $item;
    
    console.log("___ ", this._$selectItem);
    this._$selectItem.addClass("select");

    // 메뉴 바 이동
    this._moveBar($item, animation);
    
    
        // step #04
    // 이벤트 발생
    this._dispatchSelectEvent($oldItem,$item);
}




// step #03-03
// 기존 선택메뉴 아이템이 있는 경우 선택처리
BarMenu.prototype._reSelectMenuItem=function(){
    if(this._$selectItem){
        this._moveBar(this._$selectItem);
    }
}   

/* 
 * step #03-043
 * animation : 애니메이션 이동 여부
 */
BarMenu.prototype.setSelectMenuItemAt=function(index, animation){
    this.setSelectMenuItem(this._$menuItems.eq(index), animation);
}

/*
 * step #04
 * select이벤트 발생
 * $oldItem : 기존 선택 메뉴 아이템
 * $newItem : 신규 선택 메뉴 아이템 
 */
BarMenu.prototype._dispatchSelectEvent=function($oldItem, $newItem){
    var event = jQuery.Event("select");
    
    event.$oldItem = $oldItem;
    event.$newItem = $newItem;
    this.$barMenu.trigger(event);       
   
}
