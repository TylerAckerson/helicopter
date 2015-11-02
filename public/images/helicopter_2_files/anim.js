    $=function(id){return document.getElementById(id);}
    function IEorFX(ie, fx){if(navigator.appName.indexOf('Netscape')!=-1) return fx; else return ie;}
    function remove_node(anode){return anode.parentNode.removeChild(anode);}
    function H(n){if (n == 0)return "00";if (n == 1)return "1C";if (n == 2)return "38";if (n == 3)return "54";if (n == 4)return "70";if (n == 5)return "8C";if (n == 6)return "A8";if (n == 7)return "C4";if (n == 8)return "E0";if (n == 9)return "FF";return n;}
        drawColors=function(k){
            colors.innerHTML='';
            for(i=0;i<10;i++)
                for(j=0;j<10;j++){
                        b=document.createElement('DIV');
                        b.className='aColor';
                        b.color='#'+H(i)+H(j)+H(k);
                        b.style.background=b.color;
                        b.onmouseover=function(){$('animationHolder').style.background=this.color; $('colorHex').innerHTML=this.color;}
                        colors.appendChild(b);
                    }
        }
    
    function log(txt){
        $('log').innerHTML+=txt+'<br />';
    }
    
    function animProcess(anim){
        if(navigator.appName.indexOf('Netscape')>-1)
        {
            if(anim.width>120){
                width=100;
                height=width*anim.height / anim.width
                anim.width=width;
                anim.height=height;
            }
            anim.onload=null;
            return;            
        }
        img=document.createElement('img');
        img.src=anim.src;
        img.id2=anim.id;
        img.onload=function(){second(this);}
        $('hidden').appendChild(img);
        anim.onload=null;
    }
    
    function second(anim){
        $('dim'+anim.id2).innerHTML=IEorFX(anim.width+'px X '+anim.height+'px <br /><b>File Size: </b>'+parseInt(anim.fileSize)/1000+' kb<br />',anim.width+'px X '+anim.height+'px <br />');
        return;
        rImg=$(anim.id2);
        nw=rImg.width;
        if(parseInt(rImg.width)>120)
            nw=120;
            
        nh=nw*anim.height/anim.width;
        do
        {
            nw-=3;
            nh=nw*anim.height / anim.width;
        }while(nh>140);
        
        
        rImg.width=nw;
        rImg.height=nh;
        anim.onload=null;
    }
    
    function revisitImage(){
        im=anim=document.getElementById('mainImg');
        $('animDim').innerHTML=IEorFX(anim.width+'px X '+anim.height+'px <br /><b>File Size: </b>'+parseInt(anim.fileSize)/1000+' kb<br />',anim.width+'px X '+anim.height+'px <br />');
        if(parseInt(im.width)>200){
            $('animationHolder').className='reLocate';
            $('colorSection').style.margin=150+im.height+'px 0px 0px 0px';
            im.width=300;
        }
        im.onload=null;
    }

    function popResult(dbID){
        c=window.open('/animation_download/'+dbID+'/',null,'height=700,width=600,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no'); 
	return false;
    }
    
    function searchFocused(b){
        if(b.value=='Search Collection')
        {
            b.value='';
            b.style.color='black';
        }
            
    }
    
    function searchBlured(b){
        if(b.value=='')
        {
            b.value='Search Collection';
            b.style.color='#AAAAAA';
        }
    }
