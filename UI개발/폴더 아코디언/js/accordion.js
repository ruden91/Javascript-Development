
// step #02-01
function FolderAccordionMenu(selector){
    // 내부에서 사용하는 변수는 반드시 생성자에 선언한 후 사용해주세요.
    this.$accordionMenu = null;
    this.$mainMenuItems = null;
    

    this.init(selector);
    this.initSubMenuPanel();
}


/* step #02-01
* 요소 초기화
*/
FolderAccordionMenu.prototype.init=function(selector){
    this.$accordionMenu = $(selector);
    this.$mainMenuItems = this.$accordionMenu.children("li");   
}



/* step #02-01
*  서브 패널 초기화 - 초기 시작히 닫힌 상태로 만들기 
*/
FolderAccordionMenu.prototype.initSubMenuPanel=function(){    
    var objThis =  this;
    this.$mainMenuItems.each(function(index){
        var $item = $(this);
        var $subMenu = $item.find(".sub");
        
        // 서브가 없는 경우 
        if($subMenu.length==0){
            $item.attr("data-extension","empty");           
            objThis.setFolderState($item, "empty");
        
        }else {
            if($item.attr("data-extension")=="open"){                           
                objThis.setFolderState($item, "open");
            }else{
                $item.attr("data-extension","close");           
                objThis.setFolderState($item, "close");
            }
        }
    })
}


/* step #02-01
* 폴더 상태 설정
*/  
FolderAccordionMenu.prototype.setFolderState=function($item,state){
    var $folder = $item.find(".main-title .folder");
    // 기존 클래스를 모두 제거
    $folder.removeClass();
    $folder.addClass("folder "+state);

}
