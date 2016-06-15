    var Disable = checkCookie('text_to_speech',true);
    var stopVar = false;
    var isStarted = false;

    $(function() {


      //  document.addEventListener("mouseover", function(){
      //     console.log(this);
      //  });

      $('span , button , p ,i ').on('mouseover', function(){
        // console.log(Disable);
        if( Disable ){
          if( isStarted == false ){
            reader($(this).text());
          }else{
            stopVar = true;
            reader($(this).text());
          }
        }
      });
        function reader( content ){
          // var content = document.getElementById('readthis').innerText;
          isStarted = true;
          content = content.split(' ');
          content = ToMultipleWords(content, 1);
          player(content,0,1)
        }

        function player(content,i = 0,duration){
          window.setTimeout(function(){p(content,i)} , duration*600 );
        }

        function p(content,i){
          var audio = new Audio();
          // audio.src = 'https://ssl.gstatic.com/dictionary/static/sounds/de/0/'+content[i]+'.mp3';
          // audio.src = 'https://translate.google.com/translate_tts?ie=UTF-8&q='+content[i]+'&tl=en&total=1&idx=0&textlen='+content[i].length+'&tk=689718.832913&client=f&ttsspeed=0.24';
          // content[i] = content[i].replace('.','').replace('!','').replace('?','').replace(',','').replace(';','').toLowerCase();
          // if(content[i].substr(content[i].length - 1) == 's'){
          //   content[i] = content[i].substr( 0, content[i].length - 1);
          // }
          // audio.src = 'http://packs.shtooka.net/eng-wcp-us/ogg/En-us-'+content[i]+'.ogg';

          audio.src = 'http://creative-solutions.net/plugins/system/gspeech/includes/streamer.php?q='+content[i]+'&l=en&tr_tool=g&token=186228.319834';
          var v = audio.addEventListener("loadeddata", function() {

           audio.play();
           if(i < content.length-1 && stopVar == false )player(content,i+1,this.duration)
           else {audio.stop; stopVar = false; isStarted = false; }
          });
          audio.addEventListener('error', function failed(e) {
             switch (e.target.error.code) {
               case e.target.error.MEDIA_ERR_ABORTED:
                  player(content,i+1,this.duration)
                 break;
               case e.target.error.MEDIA_ERR_NETWORK:
                  player(content,i+1,this.duration)
                 break;
               case e.target.error.MEDIA_ERR_DECODE:
                  player(content,i+1,this.duration)
                 break;
               case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                  player(content,i+1,this.duration)
                 break;
               default:
                  player(content,i+1,this.duration)
                 break;
             }
           }, true);
        }




      });


      function stopper(){
        stopVar = true;
        return 0
      }
      function disable(){
        Disable = checkCookie('text_to_speech',false);;
      }
      function enable(){
        Disable = checkCookie('text_to_speech',true);
      }

      function ToMultipleWords(content, nr){
        var result = [];
        var temp = '';
        var counter = 0;
        if( nr <= content.length ){
          for(var i = 0 ; i < content.length ; i++){
            // console.log( content[i] );
            temp = temp+' '+content[i];
            if( counter == nr ){
              result.push( temp );
              temp = '';
              counter = 0;
            }
            counter++ ;
          }
        }else{
          return content;
        }

        return result;
      }


      function setCookie(cname, cvalue, exdays) {
          var d = new Date();
          d.setTime(d.getTime() + (exdays*24*60*60*1000));
          var expires = "expires="+d.toUTCString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
      }

      function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                  c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                  return c.substring(name.length, c.length);
              }
          }
          return "";
      }

      function checkCookie(cname ,  value ) {
          var cookie = getCookie(cname);
          if (cookie != "" && cookie != void 0 ) {
              return cookie;
          } else {
              setCookie(cname, value , 1 );
              console.log(cname+' now is set to: '+ value);
              return value;
          }
      }