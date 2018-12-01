/* Cargar las noticias de noticias.json y noticias.xml */
function loadNewsJson() {
  $.getJSON( "../data/news.json", function( data ) {
    
      $.each( data, function( key, val ) {
        var title;
        var imgUrl;
        var descripcion;
        for(k in val){
          if(k == "titulo"){
            title = val[k];
          }
          else if(k == "imagen"){
            imgUrl = val[k];
          }
          else if(k == "descripcion"){
            descripcion = val[k];
          }
        }
        addNew(title, imgUrl, descripcion);
      });
  });
}

function addNew(titulo, imgUrl, descripcion) {

  var title = $("<h5/>", {
    html: titulo
  })

  var p = $("<p/>",{
    html: descripcion
  })

  var principalRoot = $( "<div/>", {
    "class": "col-md-4"
  });

  var secundaryRoot = $( "<div/>", {
    "class": "card"
  });

  var img = $("<img/>",{
    "class":"card-img-top",
    "id":"newImg"
  });
  img.attr('alt', imgUrl);
  img.attr('src', imgUrl);
    

  secundaryRoot.appendTo(principalRoot);
  title.appendTo(secundaryRoot);
  img.appendTo(secundaryRoot);
  p.appendTo(secundaryRoot);
  principalRoot.appendTo("#noticiasSemired");

}

loadNewsJson();

