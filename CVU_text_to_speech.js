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
	var timeOut ;
	var audio = new Audio();
	var audioL = new Audio();
	var content;

    (function($) {
		

		$(document).ready(function () {
			
			
			/* $('option').each(function(){
				$(this).addClass('hover-option');
			}); */
			
			
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

			$(' button , p ,i , a, span,li a, input, strong, p a, h1,h2,h3,h4,h5,h6').hover(function(){
				stopVar = false;
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
					  stopVar = false;
					  if( text != void 0 ){
						  text = text.replace('&','and');
						  content = text.split(' ');
						  content = ToMultipleWords(content, 0);
						  timeOut = setTimeout( function(){  reader( content ) ; } , 200 );
					  } 
				  }else{
					stopVar = true;
					if( text != void 0 ){
						content = text.split(' ');
						content = ToMultipleWords(content, 0);
						timeOut = setTimeout( function(){  reader( content ) ; } , 200 );
					}
				  }
				}
				
				
				}, function(){ // mouse out 
					stopper();
			});
			

		});
		
		
		
	})(jQuery);


        function reader( content ){
          isStarted = true;

		  console.log(content);
          player(content,0,1)
        }

        function player(content,i ,duration){
			
           setTimeout( function(){ p( content , i ); }, duration) ;
        }

        function p(content,i){
		  
			if( content[i] != void 0 && content[i] != '' && content[i] != ' '  ){
				console.log(content[i]);
				if( content.length > 1 ){
					audioL = new Audio();
					audioL.src = 'http://creative-solutions.net/plugins/system/gspeech/includes/streamer.php?q='+content[i].trim()+'&l=en&tr_tool=g&token=186228.319834';
					var v = audioL.addEventListener("loadeddata", function() {
						audioL.play();
						if(i < content.length && stopVar == false ){
							setTimeout( function(){  player( content,i+1 , this.duration ); } , this.duration*600 ) ; 
							//player(content,i+1,this.duration)
						}
						else {
							clearTimeout( timeOut );
							audioL.addEventListener('loadeddata',function(){
								audioL.pause();
								audioL.currentTime = 0;
							});
							//stopVar = true;
							isStarted = false;
							
						}
					});
				}else{
					audio.src = 'http://creative-solutions.net/plugins/system/gspeech/includes/streamer.php?q='+content[i].trim()+'&l=en&tr_tool=g&token=186228.319834';
					var v = audio.addEventListener("loadeddata", function() {

						audio.play();
						if(i < content.length && stopVar == false ){
							timeOut = setTimeout(  function(){  player(content,i+1,this.duration); }  , this.duration*600 ); 
							//player(content,i+1,this.duration)
						}
						else {
							stopper();
						}
					});	
				}


			}

        }

      function stopper(){
		clearTimeout( timeOut );
		//audio.addEventListener('loadeddata',function(){
			audio.pause();
			audio.currentTime = 0;
		//});
		//audioL.addEventListener('loadeddata',function(){
			audioL.pause();
			audioL.currentTime = 0;
		//});
		stopVar = true;
		isStarted = false;
		audio.src = '';
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
		for(var i = 0 ; i < content.length ; i++ ){
			if( content[i] != void 0 && content[i+1] != void 0 && content[i+2] != void 0 ){
				result.push( content[i]+' '+content[i+1]+' '+content[i+2] );
				i++;i++;
				//console.log(i);
			}else {
				if( content[i] != void 0 && content[i+1] != void 0){
					result.push( content[i]+' '+content[i+1] );
					i++;
					//console.log(i);
				}else{
					if( content[i] != void 0  ){
						result.push( content[i] );
						//console.log(i);
					}else{
						;
					}
				}
			}
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