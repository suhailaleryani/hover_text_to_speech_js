/* 
This plugin made by suhail al-eryani to help read pages for blind people , anyone can use it , big thanks to http://creative-solutions.net/ for making there services available for free .

 */



	if( getCookie('text_to_speech') == 1 ){
		var Disable = false;
	}else{
		var Disable = true; // this should be true for normal user 
	}
	var stopVar = false;
	var isStarted = false;

    (function($) {
		

		$(document).ready(function () {
			
			
			$('option').each(function(){
				$(this).addClass('hover-option');
			});
			
			
			$('li.stop').on('click',function(e){
				e.preventDefault();
				stopper();
			});
			$('li.disable').on('click',function(e){
				e.preventDefault();
				disable();
			});
			$('li.enable').on('click',function(e){
				e.preventDefault();
				enable();
			});

			$(' button , p ,i , a, span,li a, input, strong, p a').hover(function(){
				
				if( $(this)[0].tagName == 'INPUT'){
					var text = $(this).val().trim();
				}else{
					var text = $(this).text().trim();
				}
				if( text == '' ){
					text = $(this).attr('title');
					if( text == '' ){
						text = $(this).attr('text');
					}
				}
				//console.log( text );
				
				if( Disable  ){
				  if( isStarted == false ){
					  if( text != void 0 ) reader( text );
				  }else{
					//stopVar = true;
					//if( text != void 0 ) reader( text );
				  }
				}
				
				
				}, function(){ // mouse out 
				//stopVar = true;
				
			});
			

		});
		
		
		
	})(jQuery);


        function reader( content ){
          isStarted = true;
          content = content.split(' ');
          //content = ToMultipleWords(content, 0);
		  //console.log(content);
          player(content,0,1)
        }

        function player(content,i = 0,duration = 1){
			console.log(content[i]);
          window.setTimeout(function(){p(content,i)} , duration );
        }

        function p(content,i){
		  
			if( content[i] != void 0 && content[i] != '' && content[i] != ' ' ){
				var audio = new Audio();
				audio.src = 'http://creative-solutions.net/plugins/system/gspeech/includes/streamer.php?q='+content[i].trim()+'&l=en&tr_tool=g&token=186228.319834';
			  var v = audio.addEventListener("loadeddata", function() {

			   audio.play();
			   if(i < content.length-1 && stopVar == false ){
				window.setTimeout(function(){player(content,i+1,this.duration)} , 250 ); 
				//player(content,i+1,this.duration)
			   }
			   else {
				   audio.stop;
				   stopVar = false;
				   isStarted = false; 
				}
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

        }

      function stopper(){
        stopVar = true;
        return 0
      }
      function disable(){
        Disable = false;
		setCookie('text_to_speech', 1, 336);
      }
      function enable(){
		Disable = true;
		setCookie('text_to_speech', 0, 336);
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




	  
	