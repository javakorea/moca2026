
const com = {
	cloneDiv(frame) {
		var div = document.createElement("div");
		div.style.display = "block";
		div.style.width = "100%";
		div.style.height = "100%";
		div.style.minHeight = "1px";
		div.style.boxSizing = "border-box";
		// moca-frame의 속성 복사 (src/type 제외)
		for (var j = 0; j < frame.attributes.length; j++) {
		  var attr = frame.attributes[j];
		  //if (attr.name === "src" || attr.name === "type") continue;
		  div.setAttribute(attr.name, attr.value);
		}		
		return div;
	},		
	getDocAsync(src) {
	    return new Promise(function(resolve, reject) {
	        com.getDoc(src, null, function(doc) {
	            resolve(doc);
	        });
	    });
	},	
	getDoc(url, params, callbacks = {}){
		const xhr = new XMLHttpRequest();
		const query = new URLSearchParams(params).toString();

		xhr.open("GET", url + "?" + query, false); // 동기
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

		try {
		  xhr.send(null);

		  if (xhr.status >= 200 && xhr.status < 300) {
			const parser = new DOMParser();
			const doc = parser.parseFromString(xhr.responseText, "text/html");
		    callbacks && callbacks(doc);
		  } else {
		    callbacks &&callbacks(xhr, xhr.status, xhr.statusText);
		  }
		} catch (e) {
		  callbacks && callbacks(xhr, "exception", e);
		} finally {
		  callbacks && callbacks(xhr);
		}
	},
	
	
	executeScripts(scripts) {
	  scripts.forEach(oldScript => {
	    const script = document.createElement("script");

	    if (oldScript.src) {
	      // 외부 script
	      script.src = oldScript.src;
	    } else {
	      // 인라인 script
	      script.textContent = oldScript.textContent;
	    }

	    document.head.appendChild(script);
	    script.remove(); // 중복 방지
	  });
	},
	
	comma(__num){ 
      var _num = '';
      if(__num != null){
          _num = (__num+'').replace(/,/g,'');
      }else{
          _num = '';
      }
      try{
          
          Number(_num);
      }catch(e){
          return _num;
      }
      
      
      if(_num == null || _num.trim() == ''){
          _num = '';
      }
      if(isNaN(_num+'')){
          return _num;
      }
      var temp = _num+"";
      var leng = temp.length;
      var re = '';
      for(var i=leng-1,j=0; i > -1; i--,j++){
          if(j !=0 && j%3 == 0){
              re = temp.charAt(i)+","+re;
          }else{
              re = temp.charAt(i)+re;
          }
          
      }
      return re;
      
	},
	
	getType (_thisObj) {
		var _type = null;

		if (_thisObj) {
		  // jQuery 객체면 DOM으로 변환, 아니면 그대로 사용
		  var el = _thisObj instanceof Element ? _thisObj : _thisObj[0];
		  var parent = el?.closest('div[type]');
		  _type = parent?.getAttribute('type') ?? null;
		}
	    return _type;
	},

	getTypeObj (_thisObj) {
		if (!_thisObj) return null;

		var el = _thisObj instanceof Element ? _thisObj : _thisObj[0];
		return el?.closest('div[type]') ?? null;
	},
		
};