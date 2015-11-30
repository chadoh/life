import ResizeActions from '../actions/ResizeActions'

var timeOut = null;
window.onresize = function(){
   if(timeOut != null) clearTimeout(timeOut);
   timeOut = setTimeout(ResizeActions.resize, 100);
}
