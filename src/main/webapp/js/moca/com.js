
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
	
	getDevice (){
	    ['toSingleMdi']; 
	    var sw = screen.width;
		var _m = 'pc';
		(sw < 1280)?_m="mobile":_m = "pc";
		return _m;
	},
	
	setValue (__comp,__value,_keyMask){
	    var _value;
	    var _comp;
	    _comp = __comp;
	    if(__comp != null && __value == null){ 
	        _value = __comp.value.trim();
	    }else{
	        _value = __value;   
	    }
		
		_type = _comp.getAttribute('type');
		_compType = _comp.getAttribute('compType');
	    if('inputCalendar' == _type || 'inputCalendar' == _compType){
	        var v = $m.getDisplayFormat_value(_comp,_value);
	        
	        if(_comp != null && _comp.tagName == 'INPUT'){
	        	_comp.value = v;
	        }else{
	        	_comp.querySelector('input[type="text"]').value = v;
	        }
	        
	        var df = _comp.getAttribute('displayFunction');
	        
	        if(df){
	            var reValue='';
	            try{
	                reValue = eval(df)(_value);
	            }catch(e){
	                reValue = _value;
	            }
	            if(_comp.tagName == 'INPUT'){
					_comp.value = _comp.value = v;;
	            }else{
					_comp.querySelector('input[type="text"]').value = reValue;
	            }
	        }
	    }else if('combo' == _type || 'combo' == _compType){
	        var v = $m.getDisplayFormat_value(_comp,_value);
	        try{
		        if($(_comp).attr('readonly')){
		        	if($m.trim(v) != '' && _comp.codeToDispLabelMap[v] != null &&_comp.codeToDispLabelMap[v].length > 0){
		        		_comp.setAttribute('code', v);
						_comp.setAttribute('label', _comp.codeToLabelMap[v]);
		        		$(_comp).find('input[type=text]').val(_comp.codeToDispLabelMap[v]);
		        	}
		        }else{
		        	$(_comp).find('select>option[value="'+_value+'"]').prop("selected",true);
		        }
	        }catch(e){
	            console.log(e);
	        }
	    }else if('searchCombo' == _type){
	        var v = _comp.codeToDispLabelMap[_value];
	        try{
	            $(_comp).attr('value',_value);
	            $(_comp).attr('text',v);
	            var ipt = $(_comp).find('.moca_input');
	            ipt.val(v);
	        }catch(e){
	            console.log(e);
	        }       
	    }else if('radio' == _type || 'radio' == _compType){
	        __value = $m.trim(__value);
	        $(_comp).find('input[value='+__value+']').prop('checked', true); 
	    }else if('color' == _type || 'color' == _compType){
	    	_value = String(_value);
	    	//$(_comp).find('input[type=color]').val(_value);
	    	$(_comp).val(_value);
	    	
	    }else{
	    	var df =  _comp.getAttribute('displayFunction');
			// 1) 모바일 + INPUT이면 grid 스크롤Y 표시
			if (_comp && _comp.tagName === 'INPUT' && this.getDevice() === 'mobile') {
			  var _grd = _comp.closest('div[type="grid"]');
			  if (_grd) {
			    var _scrollY = _grd.querySelector('#' + CSS.escape(_grd.id + '_moca_scroll_y'));
			    if (_scrollY) {
			      // jQuery :visible 대체
			      var isVisible = !!(_scrollY.offsetWidth || _scrollY.offsetHeight || _scrollY.getClientRects().length);
			      if (!isVisible) {
			        _scrollY.style.display = 'block';
			      }
			    }
			  }
			}

			// 2) _type이 input이면 내부 input[type=text]로 대상 변경
			if (_type === 'input') {
			  var innerInput = _comp ? _comp.querySelector('input[type="text"]') : null;
			  if (innerInput) _comp = innerInput;
			}

			// 3) df 처리
			if (df === 'null') df = '';
			df = String(df);

			var reValue = '';
			if (df.trim() !== '') {
			  try {
			    var parent = _comp ? _comp.parentElement : null;

			    if (parent && parent.displayChar != null) {
			      _value = String(_value).replaceAll(parent.displayChar, '');
			    } else {
			      _value = String(_value);
			    }

			    reValue = eval(df)(_value);

			    if (String(reValue).length < String(_value).length) {
			      reValue = _value;
			    }
			  } catch (e) {
			    reValue = _value;
			  }
			} else {
			  reValue = _value;
			}

			reValue = String(reValue);
			_value = String(_value);

			if (reValue.length !== _value.length) {
			  for (var k = 0; k < reValue.length; k++) {
			    var aChar = reValue.charAt(k);
			    var reValue2 = reValue.replaceAll(aChar, '');
			    if (reValue2 === _value) {
			      var parent2 = _comp ? _comp.parentElement : null;
			      if (parent2) {
			        parent2.displayChar = aChar;
			        break;
			      }
			    }
			  }
			}
			if (_comp && _comp.tagName === 'INPUT') {
			  var parent3 = _comp.parentElement;
			  if (parent3) {
			    parent3.originalValue = _value.trim();
			  }

			  var masked = this.displayKeyMask(reValue, _keyMask);

			  // jQuery: attr('value', ..) + val(..) 동시 세팅과 동일하게
			  _comp.setAttribute('value', masked); // attribute
			  _comp.value = masked;                // property (현재값)

			} else {
			  // jQuery: $(_comp).find('input[type=text]').val(reValue);
			  if (_comp) {
			    var input2 = _comp.querySelector('input[type="text"]');
			    if (input2) input2.value = reValue;
			  }
			}
		}
	},
	
	stopEvent (_evt) {
	    _evt.stopPropagation();
	    _evt.stopImmediatePropagation();
	},
	
	offset(el) {
	  const rect = el.getBoundingClientRect();
	  return {
	    top: rect.top + window.pageYOffset,
	    left: rect.left + window.pageXOffset
	  };
	},
	
	getSize(el) {
	  if (!el) return { width: 0, height: 0 };
	  return {
	    width: el.clientWidth,
	    height: el.clientHeight
	  };
	},
	
	displayKeyMask (_value,_keyMask){
	    if(_keyMask != null && _keyMask.indexOf('onlyNumber') > -1){
	        return _value.replace(/-/g,'');
	    }else{
	        return _value;
	    }
	},
	
	//addEvent="enterSearchEvt|onlyMoneyEvt"
	keydown (_comp,_value,_keyMask){
	    var keyMask = _keyMask.trim();
	    if(event.key == 'Enter'){
	    	this.setValue(_comp,_value);
	        if(keyMask.indexOf('enterSearch') > -1){
	            $m.default_keyup(event.srcElement);
	        }else{
	            _comp.blur();
	            if($(_comp).closest('td').next().length > 0){
	                $(_comp).closest('td').next().find('input').focus().select();
	            }else{
	                $(_comp).closest('tr').next().find('td:nth(0) input').focus().select();
	            }
	        }
	    }else{
	        //자연수
	        if(keyMask.indexOf('onlyNumber') > -1){
	            if($m.isBasisKey(event.keyCode)){
	                return true;
	            }else if(event.keyCode == 188){ 
	                //(,)쉼표차단
	                event.preventDefault();return false;
	            }else if(event.shiftKey && event.keyCode > 47 && event.keyCode < 58){   
	                //특수문자차단
	                event.preventDefault();return false;    
	            }else if(event.keyCode > 47 && event.keyCode < 58){
	                //숫자 허용
	                return true;
	            }else if(event.keyCode > 95 && event.keyCode < 106){
	                //키패드숫자 허용
	                return true;        
	            }else if(event.keyCode == 109 || event.keyCode == 189){ 
	                //마이너스(-) 차단
	                event.preventDefault();return false;    
	            }else if(event.keyCode == 110 || event.keyCode == 190){ 
	                //.(쩜) 차단
	                event.preventDefault();return false;    
	            }else if(event.keyCode > 64 && event.keyCode < 91){
	                //소문자 차단
	                event.preventDefault();return false;
	            }else if(event.keyCode == 229){
	                //한글 차단
	                event.preventDefault(); 
	                var o = event.srcElement;
	                setTimeout(function(){
	                    o.value = o.value.replace(/[\ㄱ-ㅎ ㅏ-ㅣ 가-힣]/g,'');
	                },1);
	                return false;
	            }else{
	                console.log('onlyNumber 기타차단됨--->',event.keyCode);
	                //기타 차단
	                event.preventDefault(); 
	                //특수문자차단추가수행
	                /*
	                var o = event.srcElement;
	                setTimeout(function(){
	                    var replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>\/.\`:\"\\,\[\]?|{}]/gi;
	                    var replaceNotFullKorean = /[ㄱ-ㅎㅏ-ㅣ]/gi;
	                    o.value = o.value.replace(replaceChar,'');
	                    o.value = o.value.replace(replaceNotFullKorean,'');
	                },1);   
	                */          
	                return false;
	            }
	        }else if(keyMask.indexOf('onlyMoney') > -1){
	            if($m.isBasisKey(event.keyCode)){
	                //편집을 위한 기본적인 허용키
	                return true;
	            }else if(event.keyCode == 188){ 
	                //(,)쉼표허용
	                return true;
	            }else if(event.shiftKey && event.keyCode > 47 && event.keyCode < 58){   
	                //특수문자차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 109 || event.keyCode == 189){ 
	                //마이너스(-) 허용
	                return true;
	            }else if(event.keyCode > 47 && event.keyCode < 58){
	                //숫자 허용
	                return true;
	            }else if(event.keyCode > 95 && event.keyCode < 106){
	                //키패드숫자 허용
	                return true;                
	            }else if(event.keyCode > 64 && event.keyCode < 91){
	                //소문자 차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 229){
	                //한글 차단
	                event.preventDefault(); 
	                var o = event.srcElement;
	                setTimeout(function(){
	                    o.value = o.value.replace(/[\ㄱ-ㅎ ㅏ-ㅣ 가-힣]/g,'');
	                },1);
	                return false;
	            }else{
	                console.log('onlyMoney 기타차단됨--->',event.keyCode);
	                //기타 차단
	                event.preventDefault(); 
	                //특수문자차단추가수행
	                var o = event.srcElement;
	                setTimeout(function(){
	                    var replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>\/.\`:\"\\,\[\]?|{}]/gi;
	                    var replaceNotFullKorean = /[ㄱ-ㅎㅏ-ㅣ]/gi;
	                    o.value = o.value.replace(replaceChar,'');
	                    o.value = o.value.replace(replaceNotFullKorean,'');
	                },1);
	                return false;
	            }
	        }else if(keyMask.indexOf('onlyPhone') > -1){
	            if($m.isBasisKey(event.keyCode)){
	                //편집을 위한 기본적인 허용키
	                return true;
	            }else if(event.keyCode == 188){ 
	                //(,)쉼표차단
	                event.preventDefault();
	                return false;
	            }else if(event.shiftKey && event.keyCode > 47 && event.keyCode < 58){   
	                //특수문자차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 109 || event.keyCode == 189){ 
	                //마이너스(-) 허용
	                return true;
	            }else if(event.keyCode > 47 && event.keyCode < 58){
	                //숫자 허용
	                return true;
	            }else if(event.keyCode > 95 && event.keyCode < 106){
	                //키패드숫자 허용
	                return true;                
	            }else if(event.keyCode > 64 && event.keyCode < 91){
	                //소문자 차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 229){
	                //한글 차단
	                event.preventDefault(); 
	                var o = event.srcElement;
	                setTimeout(function(){
	                    o.value = o.value.replace(/[\ㄱ-ㅎ ㅏ-ㅣ 가-힣]/g,'');
	                },1);
	                return false;
	            }else{
	                console.log('onlyPhone 기타차단됨--->',event.keyCode);
	                //기타 차단
	                event.preventDefault(); 
	                //특수문자차단추가수행
	                var o = event.srcElement;
	                setTimeout(function(){
	                    var replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>\/.\`:\"\\,\[\]?|{}]/gi;
	                    var replaceNotFullKorean = /[ㄱ-ㅎㅏ-ㅣ]/gi;
	                    o.value = o.value.replace(replaceChar,'');
	                    o.value = o.value.replace(replaceNotFullKorean,'');
	                },1);
	                return false;
	            }
	        }else if(keyMask.indexOf('onlyFloat') > -1){
	            if($m.isBasisKey(event.keyCode)){
	                //편집을 위한 기본적인 허용키
	                return true;
	            }else if(event.keyCode == 188){ 
	                //(,)쉼표차단
	                event.preventDefault();
	                return false;
	            }else if(event.shiftKey && event.keyCode > 47 && event.keyCode < 58){   
	                //특수문자차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 109 || event.keyCode == 189){ 
	                //마이너스(-) 차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 110 || event.keyCode == 190){ 
	                //.(쩜) 허용
	                return true;
	            }else if(event.keyCode > 47 && event.keyCode < 58){
	                //숫자 허용
	                return true;
	            }else if(event.keyCode > 95 && event.keyCode < 106){
	                //키패드숫자 허용
	                return true;                
	            }else if(event.keyCode > 64 && event.keyCode < 91){
	                //소문자 차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 229){
	                //한글 차단
	                event.preventDefault(); 
	                var o = event.srcElement;
	                setTimeout(function(){
	                    o.value = o.value.replace(/[\ㄱ-ㅎ ㅏ-ㅣ 가-힣]/g,'');
	                },1);
	                return false;
	            }else{
	                console.log('onlyFloat 기타차단됨--->',event.keyCode);
	                //기타 차단
	                event.preventDefault(); 
	                //특수문자차단추가수행
	                /*
	                var o = event.srcElement;
	                setTimeout(function(){
	                    var replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>\/.\`:\"\\,\[\]?|{}]/gi;
	                    var replaceNotFullKorean = /[ㄱ-ㅎㅏ-ㅣ]/gi;
	                    o.value = o.value.replace(replaceChar,'');
	                    o.value = o.value.replace(replaceNotFullKorean,'');
	                },1);
	                */
	                return false;
	            }
	        }else if(keyMask.indexOf('onlyPercent') > -1){
	            console.log(event.keyCode);
	            if($m.isBasisKey(event.keyCode)){
	                //편집을 위한 기본적인 허용키
	                return true;
	            }else if(event.keyCode == 188){ 
	                //(,)쉼표차단
	                event.preventDefault();
	                return false;
	            }else if(event.shiftKey && event.keyCode == 53){    
	                //% 허용
	                return true;
	            }else if(event.shiftKey && event.keyCode > 47 && event.keyCode < 58){   
	                //특수문자차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 109 || event.keyCode == 189){ 
	                //마이너스(-) 허용
	                return true;
	            }else if(event.keyCode == 110 || event.keyCode == 190){ 
	                //.(쩜) 허용
	                return true;
	            }else if(event.keyCode > 47 && event.keyCode < 58){
	                //숫자 허용
	                return true;
	            }else if(event.keyCode > 95 && event.keyCode < 106){
	                //키패드숫자 허용
	                return true;                
	            }else if(event.keyCode > 64 && event.keyCode < 91){
	                //소문자 차단
	                event.preventDefault();
	                return false;
	            }else if(event.keyCode == 229){
	                //한글 차단
	                event.preventDefault(); 
	                var o = event.srcElement;
	                setTimeout(function(){
	                    o.value = o.value.replace(/[\ㄱ-ㅎ ㅏ-ㅣ 가-힣]/g,'');
	                },1);
	                return false;
	            }else{
	                console.log('onlyPercent 기타차단됨--->',event.keyCode);
	                //기타 차단
	                event.preventDefault(); 
	                //특수문자차단추가수행
	                /*
	                var o = event.srcElement;
	                setTimeout(function(){
	                    var replaceChar = /[~!@\#$%^&*\()\-=+_'\;<>\/.\`:\"\\,\[\]?|{}]/gi;
	                    var replaceNotFullKorean = /[ㄱ-ㅎㅏ-ㅣ]/gi;
	                    o.value = o.value.replace(replaceChar,'');
	                    o.value = o.value.replace(replaceNotFullKorean,'');
	                },1);
	                */
	                return false;
	            }
	        }
	    }
	},

	code (_config,_callback,_url,_pageId,_srcId) {
	    ['common code binder'];
	    var u;
	    if(_url != null){
	        u = _url;
	    }else{
	        u = this._domain+this._contextRoot+"/code_json.do";
	    }
	   
		var response = data.list2;
        var ks = Object.keys(_config);
        for(var i=0; i < ks.length; i++){
            var compId = ks[i];
            if(!compId.startsWith("data___")){
                var v = _config[compId];
                //var l = response[compId]; ---임시
                var l = response;
				var cid = compId;
                var gridAndCellArr = cid.split('.');
                if(gridAndCellArr.length == 1){
                    //일반
                    var compId = gridAndCellArr[0];
                    var compObj = this.getObj(compId,null,_pageId,_srcId);
                    if(compObj != null ){//&& compObj['list'] == null
                        compObj['list'] = l;
                        compObj['codeOpt'] = v;
                        if(compObj.getAttribute("type") == "searchCombo"){
                            $m.renderSearchCombo(compObj,null,'normal',_pageId,_srcId);
                        }else if(compObj.getAttribute("type") == "combo"){
                            $m.renderCombo(compObj,null,'normal',_pageId,_srcId);
                        }
                    }                   
                }else{
                    //그리드
                    var gridId = gridAndCellArr[0];
                    var cellId = gridAndCellArr[1];
                    var g_obj = this.getObj(gridId,null,_pageId,_srcId);
                    if(g_obj[cellId] == null){
                        g_obj[cellId] = {};
                    } 
                    g_obj[cellId]['list'] = l;
                    g_obj[cellId]['codeOpt'] = v;
					debugger;
                    g_obj[cellId]['map'] = this.listToMap(l,v);
                }
            }else{
                
                
            }
        }
        if(_callback != null){
            _callback(response);
        }
	},
	
	getObj(_objId,_tag,_pageId,_srcId){
	    ['고유한 obj찾기'];
	    var re;
	    if(_tag == null){
	        if(_pageId != null){
	            re = document.querySelector(`div[id="${_objId}"][pageId="${_pageId}"]`);
	        }else if(this.pageId != null){
				re = document.querySelector(`div[id="${_objId}"][pageId="${this.pageId}"]`);
	        }else{
				re = document.querySelector(`div[id="${_objId}"]`);
	        }
	    }else{
	        if(_pageId != null){
				re = document.querySelector(`${_tag}[id="${_objId}"][pageId="${_pageId}"]`);
	        }else if(this.pageId != null){
	            re = document.querySelector(`${_tag}[id="${_objId}"][pageId="${this.pageId}"]`); 
	        }else{
				re = document.querySelector(`div[id="${_objId}"]`);
	        }       
	    }
		
		if (re != null) {

		  re.getCheckbox = function (_checkboxId) {
		    // grid toolbar 내 checkbox 정보 가져오기
		    const cObj = this.querySelector('#' + CSS.escape(_checkboxId));

		    if (cObj != null) {
		      return {
		        id: _checkboxId,
		        checked: cObj.checked,
		        value: cObj.value
		      };
		    } else {
		      return null;
		    }
		  };

		  re.getInput = function (_inputId) {
		    // grid toolbar 내 input 정보 가져오기
		    const cObj = this.querySelector('#' + CSS.escape(_inputId));

		    if (cObj != null) {
		      return {
		        id: _inputId,
		        value: cObj.value
		      };
		    } else {
		      return null;
		    }
		  };

		  if (re.length > 1) {
		    alert('중복된 아이디가 있습니다. ID(' + _objId + ')를 변경해주세요');
		  }

		  return re;

		} else {
		  return null;
		}
	},

	getAttrObj(_grdObj,_attr){
	   	var attrObj = (_grdObj.getAttribute(_attr) != null)? JSON.parse(_grdObj.getAttribute(_attr)):{};
	   	return attrObj;
	},
	
	listToMap (_list,_option,filterableId) {
	    var re = {};
	    if(_option != null){
	        var _code = '';
	        var _name = '';
	        if(_option.metaInfo != null){
	            _code = _option.metaInfo.codeCd;
	            _name = _option.metaInfo.codeNm;
	        }
	        for(var i=0,j=_list.length; i < j; i++){
	            var row = _list[i];
	            if(_code == ''){
	                re[row.code] = row.codeNm;
	            }else{
	                re[row[_code]] = row[_name];
	            }
	        }
	    }else{
	        for(var i=0,j=_list.length; i < j; i++){
	            var row = _list[i];
	            var value = row[filterableId];
	            re[value] = value;
	        }
	    }

	    return re;
	},

};