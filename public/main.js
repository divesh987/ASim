
var Player = function (x, y) {
  var self = this;

  self.checkKey = function (e) {
      e = e || window.event;

      if (/38|up/gi.test(e.keyCode)) {
          self.move(self.x - 1, self.y);
      } else if (/40|down/gi.test(e.keyCode)) {
          self.move(self.x + 1, self.y);
      } else if (/37|left/gi.test(e.keyCode)) {
        self.move(self.x, self.y - 1);
      } else if (/39|right/gi.test(e.keyCode)) {
         self.move(self.x, self.y + 1);
      }
      e.preventDefault();

  }

  self.init = function (x, y) {
    self.x = x;
    self.y = y;
    document.onkeydown = self.checkKey;

    self.socket = io();
    self.socket.on('player-moved', function (data){
        self.checkKey({ keyCode: data.key})
        console.log(data);
      
    })
  }

  self.move = function (newX, newY) {

    var isCollision = self.isCollision(newX, newY);

    if (!isCollision) {

      var $oldCell = $("[data-col='" + self.x + "'][data-index='" + self.y + "']");
      $oldCell.removeClass("player");

      var $newCell = $("[data-col='" + newX + "'][data-index='" + newY + "']");
      $newCell.addClass("player");
                     
      self.x = newX
      self.y = newY
    }


  }




  self.isCollision = function (x, y) {
   return x == '-1' || x == '18' || y == '-1' || y == '36'
  }

  self.init(x, y);
}

function setUpTable(x,y){
  $("body").append("<table id = 'grid'>")
  $("#grid").append("<tbody id = 'gridB'>");
  var gridB = $("#gridB")
  for( var i = 0; i < x; i++){
    gridB.append("<tr id =tr" + i + ">")
  
    for(var j = 0; j < y; j++ ){
        $("#tr"+i).append("<td data-col="+i+" data-index="+j+"> </td>");
    }
    $("#tr"+i).append("</tr>");
  }
  $("#grid").append("</tbody>");
  $("#grid").append("</table>");
}
  function addPlayer(person,posx,posy,tposx,tposy,speech,colour){
    $cell = $("[data-col='" + posx + "'][data-index='" + posy + "']");
    $cell.css("border-radius","15px");
    $cell.css("background-color",colour)
    var res = person.split("")
    $cell.html(res[0])
    
      var i = 0;
        $(document).keydown(function(e) {

          switch(e.which) {

            case 88:
              if (i%2==0){
                if($("[data-col='" + tposx + "'][data-index='" + tposy + "']").hasClass("player")){
                  // $("body").append("<p class='bubble'>This is now a speech bubble!</div>");
                  addSpeech(person,speech);
                  $("#"+person).addClass("bubble");
                  $("#"+person).css("color",colour);
                  console.log("here");
                  i++;
                }
              }else {
                console.log("not here ");
                $("#"+person).remove();
                $("#"+person).removeClass("bubble")
                i++;
              }
            break;
          }
        });   
  }

  function addSpeech(id,speech){
    $("body").append("<div id="+id + ">" + id + ": " +speech + "</div>");
  }

  function addColour(x,y,colour){
  $cell = $("[data-col='" + x + "'][data-index='" + y + "']");
  $cell.css("background-color",colour)
  }
  function addBG(x,y,url){
  $cell = $("[data-col='" + x + "'][data-index='" + y + "']");
  $cell.css("background-image","url("+url+")")
  }

var Game = function () {
  console.log()
  setUpTable(18,36);
  var self = this;
  addPlayer("Rich",10,2,11,2,"Good Spot!","blue");
  addPlayer("Stephen",15,26,15,25,"Sweet as a nut!","red");
  addPlayer("Sab",13,26,13,25,"Tankyouuu!","pink");
  addPlayer("Kane",11,28,11,27,"..yeah","yellow");
  addPlayer("Naren",11,30,10,30,"That's Dank!","green");
  addPlayer("Melson",13,32,12,32,"I love DevOp!","brown");
  addPlayer("Div",15,32,14,32,"Don't do it then!","grey");
  addPlayer("Joe",12,4,12,5,"Nice one, mate!","lightblue");
  addPlayer("Will",12,0,11,0,"It wasn't me","lightgreen");
  addPlayer("Melinda",14,2,14,3,"Guuuuuyss!","lightpink");
  addPlayer("Kieran",10,4,10,5,"*whips* Get back to work!","orange");

  for (var x=12;x <17; x++ ){
    for (var y =27; y<32;y++){
    addColour(x,y,"#654321");
  }
}
  addBG(15,30,"images/ig.png")
  self.init = function () {
    self.$cells = $("td");
    self.setUpGrid();
    self.player = new Player(17, 15);
    


  }

  self.setUpGrid = function () {
    self.$cells.each(function () {
      // $(this).addClass("black");
    });
  }

  self.init();
}

var game = new Game();




