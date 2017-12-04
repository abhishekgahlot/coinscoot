var scrollBar = () => {
  if ($('.scrollbar').length > 0) {
    $('.scrollbar').mCustomScrollbar({
      theme: "minimal-dark",
            scrollInertia: 1000,
      mouseWheel: {
        preventDefault: true
      }
    });
  }
  $("#app_main-menu-wrapper.scrollbar").mCustomScrollbar("scrollTo", ".nav-dropdown.active", {scrollInertia: 0});
}
var otherScrollbarOptions = () => {
  if ($('.scrollbar-minimal-light').length > 0) {
    $('.scrollbar-minimal-light').mCustomScrollbar({
      theme: "minimal",
      scrollInertia: 1000,
      mouseWheel: {
        preventDefault: true
      }
    });
  }
  if ($('.scrollbar-light').length > 0) {
    $('.scrollbar-light').mCustomScrollbar({
      theme: "light",
      scrollInertia: 1000,
      mouseWheel: {
        preventDefault: true
      }
    });
  }
  if ($('.scrollbar-dark').length > 0) {
    $('.scrollbar-dark').mCustomScrollbar({
      theme: "dark",
      scrollInertia: 1000,
      mouseWheel: {
        preventDefault: true
      }
    });
  }



}
export {
  scrollBar,
  otherScrollbarOptions

}
