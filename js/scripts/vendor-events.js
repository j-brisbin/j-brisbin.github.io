$(document).ready(function(){
    $(".button-collapse").sideNav();

    if($('.photo-carousel').length > 0){
       $('.photo-carousel').slick({
          adaptiveHeight: true,
          mobileFirst: true,
          autoplay: true,
          arrows: false,
          dots: true
       });
    }
    if($('.staggered-list').length > 0) {
       Materialize.showStaggeredList(".staggered-list");
    }
});
