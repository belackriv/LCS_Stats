function anonymous(locals) {
var buf = [];
var locals_ = (locals || {}),title = locals_.title,players = locals_.players;buf.push("<!DOCTYPE html><html><head><title>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</title><link rel=\"stylesheet\" href=\"/css/site.css\"><link rel=\"stylesheet\" href=\"/css/bootstrap.css\"><link rel=\"stylesheet\" href=\"/css/bootstrap-theme.css\"><script src=\"/js/jquery-2.0.3.js\"></script><script src=\"/js/json2.js\"></script><script src=\"/js/underscore.js\"></script><script src=\"/js/bootstrap.js\"></script><script src=\"/js/bootstrap.js\"></script><script src=\"/js/backbone.js\"></script></head><body><h1>" + (jade.escape(null == (jade.interp = title) ? "" : jade.interp)) + "</h1><ul class=\"media-list\">");
// iterate players
;(function(){
  var $$obj = players;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var player = $$obj[$index];

buf.push("<li class=\"player media\"><a class=\"pull-left\"><img" + (jade.attrs({ terse: true, 'src':(player.picPath), "class": [('media-object')] }, {"src":true})) + "></a><div class=\"media-body\"><h2 class=\"media-heading\">" + (jade.escape(null == (jade.interp = player.nick) ? "" : jade.interp)) + "</h2><ul><li>Name: " + (jade.escape((jade.interp = player.name) == null ? '' : jade.interp)) + "</li><li>Position: " + (jade.escape((jade.interp = player.position) == null ? '' : jade.interp)) + "</li><li>Info: " + (jade.escape((jade.interp = player.info) == null ? '' : jade.interp)) + "</li></ul></div></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var player = $$obj[$index];

buf.push("<li class=\"player media\"><a class=\"pull-left\"><img" + (jade.attrs({ terse: true, 'src':(player.picPath), "class": [('media-object')] }, {"src":true})) + "></a><div class=\"media-body\"><h2 class=\"media-heading\">" + (jade.escape(null == (jade.interp = player.nick) ? "" : jade.interp)) + "</h2><ul><li>Name: " + (jade.escape((jade.interp = player.name) == null ? '' : jade.interp)) + "</li><li>Position: " + (jade.escape((jade.interp = player.position) == null ? '' : jade.interp)) + "</li><li>Info: " + (jade.escape((jade.interp = player.info) == null ? '' : jade.interp)) + "</li></ul></div></li>");
    }

  }
}).call(this);

buf.push("</ul></body></html>");;return buf.join("");
}