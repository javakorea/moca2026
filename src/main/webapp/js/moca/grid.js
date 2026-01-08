



const gridProto = {
	codeCd : 'code',
	codeNm : 'codeNm',
	rowSelectedColor : '#434e5f',
	renderGrid() {
	    ['renderGrid'];
		let _divObj = this;
	    var _id = _divObj.id;
	    var pageid = _divObj.getAttribute("pageid");
	    var srcid = _divObj.getAttribute("srcid");
	    com.getObj(_id,null,pageid,srcid);//id중복체크
	    
	    var _default_cell_height = _divObj.getAttribute("default_cell_height");
	    var _label = _divObj.getAttribute("label");
	    var _subLabel = _divObj.getAttribute("subLabel");
	    var _toolbar =_divObj.classList.contains("toolbar");
	    var _header_body = _divObj.innerHTML;
	    var _rowSelectedColor = _divObj.getAttribute("rowSelectedColor");
	    var _onRowSelectedFunc = _divObj.getAttribute("onRowSelected");
	    var _onDblClickFunc = _divObj.getAttribute("onDblClick");
	    var _onBeforeClick = _divObj.getAttribute("onBeforeClick");
	    var _onAfterClick = _divObj.getAttribute("onAfterClick");
	    
	    
	    var toolbar_search_size = _divObj.getAttribute("toolbar_search_size");
	    var toolbar_col_showhide = _divObj.getAttribute("toolbar_col_showhide");
	    var toolbar_detail = _divObj.getAttribute("toolbar_detail");
	    var toolbar_exup = _divObj.getAttribute("toolbar_exup");
	    var toolbar_exdn = _divObj.getAttribute("toolbar_exdn");
	    var toolbar_addrow = _divObj.getAttribute("toolbar_addrow");
	    var toolbar_delrow = _divObj.getAttribute("toolbar_delrow");
	    var toolbar_nextbtn = _divObj.getAttribute("toolbar_nextbtn");
	    var toolbar_full = _divObj.getAttribute("toolbar_full");
	    var toolbar_dblclick = _divObj.getAttribute("toolbar_dblclick");
	    var toolbar_fold = _divObj.getAttribute("toolbar_fold");
	    
	    if(com.getDevice() == 'pc'){
	    	if(_divObj.getAttribute('toolbar_common_btns_pc')){
	        	var _commBtnsStr = _divObj.getAttribute('toolbar_common_btns_pc');
	        	var _commBtnsObj = JSON.parse(_commBtnsStr);
	        	if(_commBtnsObj.detail == 'true' || _commBtnsObj.detail == 'dblclick'){
	        		toolbar_detail = _commBtnsObj.detail;
	        	}
	        	if(_commBtnsObj.exup == 'true'){toolbar_exup = _commBtnsObj.exup;}
	        	if(_commBtnsObj.exdn == 'true'){toolbar_exdn = _commBtnsObj.exdn;}
	        	if(_commBtnsObj.addrow == 'true'){toolbar_addrow = _commBtnsObj.addrow;}
	        	if(_commBtnsObj.delrow == 'true'){toolbar_delrow = _commBtnsObj.delrow;}
	        	if(_commBtnsObj.full == 'true'){toolbar_full = _commBtnsObj.full;}
	        	if(_commBtnsObj.dblclick == 'true'){toolbar_dblclick = _commBtnsObj.dblclick;}
	    	}
	    	
	    	/*if(mocaConfig.grid.toolbar_common_btns_pc){
	        	if(mocaConfig.grid.toolbar_common_btns_pc.priority == 'config'){
	        		var _commBtnsStr = mocaConfig.grid.toolbar_common_btns_pc.attr;
	            	var _commBtnsObj = JSON.parse(_commBtnsStr);      		
	            	if(_commBtnsObj.detail) toolbar_detail = _commBtnsObj.detail;
	            	if(_commBtnsObj.exup) toolbar_exup = _commBtnsObj.exup;
	            	if(_commBtnsObj.exdn) toolbar_exdn = _commBtnsObj.exdn;
	            	if(_commBtnsObj.addrow) toolbar_addrow = _commBtnsObj.addrow;
	            	if(_commBtnsObj.delrow) toolbar_delrow = _commBtnsObj.delrow;
	            	if(_commBtnsObj.full) toolbar_full = _commBtnsObj.full;
	            	if(_commBtnsObj.dblclick) toolbar_dblclick = _commBtnsObj.dblclick;
	        	}
	    	}*/
	    }else{
	    	if(_divObj.getAttribute('toolbar_common_btns_mobile')){
	        	var _commBtnsStr = _divObj.getAttribute('toolbar_common_btns_mobile');
	        	var _commBtnsObj = JSON.parse(_commBtnsStr);
	        	
	        	if(_commBtnsObj.detail == 'true' || _commBtnsObj.detail == 'dblclick'){
	        		toolbar_detail = _commBtnsObj.detail;
	        	}else if(_commBtnsObj.detail == 'dblclick'){
	        		toolbar_dblclick = _commBtnsObj.dblclick;
	        	}
	        	if(_commBtnsObj.exup == 'true'){toolbar_exup = _commBtnsObj.exup;}
	        	if(_commBtnsObj.exdn == 'true'){toolbar_exdn = _commBtnsObj.exdn;}
	        	if(_commBtnsObj.addrow == 'true'){toolbar_addrow = _commBtnsObj.addrow;}
	        	if(_commBtnsObj.delrow == 'true'){toolbar_delrow = _commBtnsObj.delrow;}
	        	if(_commBtnsObj.full == 'true'){toolbar_full = _commBtnsObj.full;}
	        	if(_commBtnsObj.dblclick == 'true'){toolbar_dblclick = _commBtnsObj.dblclick;}
	        	
	    	}
	    	
	    	if(mocaConfig.grid.toolbar_common_btns_mobile){
	        	if(mocaConfig.grid.toolbar_common_btns_mobile.priority == 'config'){
	            	var _commBtnsStr = mocaConfig.grid.toolbar_common_btns_mobile.attr;
	            	var _commBtnsObj = JSON.parse(_commBtnsStr);      		
	            	if(_commBtnsObj.detail) toolbar_detail = _commBtnsObj.detail;
	            	if(_commBtnsObj.exup) toolbar_exup = _commBtnsObj.exup;
	            	if(_commBtnsObj.exdn) toolbar_exdn = _commBtnsObj.exdn;
	            	if(_commBtnsObj.addrow) toolbar_addrow = _commBtnsObj.addrow;
	            	if(_commBtnsObj.delrow) toolbar_delrow = _commBtnsObj.delrow;
	            	if(_commBtnsObj.full) toolbar_full = _commBtnsObj.full;
	            	if(_commBtnsObj.dblclick) toolbar_dblclick = _commBtnsObj.dblclick;
	        	}
	    	}
	    }

	    var paging = (_divObj.getAttribute('paging') != null)? JSON.parse(_divObj.getAttribute('paging')):{};
	    var _html = '';
	    if(_toolbar){
	        _html += '<div class="moca_grid_toolbar" grdkey="'+_id+'" default_cell_height="'+_default_cell_height+'" >';
	        _html += '<div class="lta" grdkey="'+_id+'">';
	        if(_label != null){
	            _html += '<div class="grid_title" grdkey="'+_id+'">';               
	            _html += _label;                            
	            _html += '</div>';
	        } 
	        if(_subLabel != null){
	            _html += '<div class="moca_table_title" grdkey="'+_id+'">';             
	            _html += '<i class="fas fa-angle-right"></i>'+'<span>'+_subLabel+'</span>';                         
	            _html += '</div>';
	        } 
	        _html += '<div class="mr5 grid_total" grdkey="'+_id+'">';
	        if(paging.type == 'numberList'){
	        	 _html += '<span>총<em class="txt_blue ml2"></em>건</span>';
	        }else{
	        	if(_label != null || _subLabel != null){
	                _html += '<span><em class="txt_blue"></em>건</span>';
	            }else{
	                _html += '<span>Fetch : <em class="txt_blue"></em>건</span>';            
	            }
	        }
	        
	        _html += '</div>';
	        var attArray = _divObj.getAttributeNames();
	        for(var k=0; k <attArray.length; k++){
	            var attrName = attArray[k];
	            var attValue = _divObj.getAttribute(attrName);
				if (attValue?.trim()) {
	                try{
	                    var x1Obj = JSON.parse(attValue);
	                    if(x1Obj.position == 'left'){
	                        if(attrName.indexOf('toolbar_grid_checkbox') > -1){
	                            _html += this.renderGridToolbarCheckbox(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_input') > -1){
	                            _html += this.renderGridToolbarInput(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_button') > -1){
	                            _html += this.renderGridToolbarButton(x1Obj,_divObj.id);
	                        }else if(attrName.indexOf('toolbar_grid_label_span') > -1){
	                            _html += this.renderGridToolbarLabelSpan(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_label_input') > -1){
	                            _html += this.renderGridToolbarLabelInput(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_label_combo') > -1){
	                            _html += this.renderGridToolbarLabelCombo(x1Obj,_divObj.id);
	                        }else if(attrName.indexOf('toolbar_grid_combo') > -1){
	                            _html += this.renderGridToolbarCombo(x1Obj,_divObj.id);
	                        }else if(attrName.indexOf('toolbar_grid_label') > -1){
	                            _html += this.renderGridToolbarLabel(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_radio') > -1){
	                            _html += this.renderGridToolbarRadio(x1Obj);
	                        }
	                        
	                        
	                        
	                    }
	                }catch(e){
	                    
	                }
	            }
	        }
	        
	        if(toolbar_search_size == "true") {
	            _html += '<div class="moca_combo" style="width:60px" grdkey="'+_id+'">';
	            _html += '<select class="moca_select" id="_grid_count_per_page">';
	            _html += '<option value="800" selected>800건</option>';  
	            _html += '<option value="20">20건</option>';     
	            _html += '<option value="50">50건</option>';
	            _html += '<option value="100">100건</option>';
	            _html += '<option value="400">400건</option>';
	            _html += '</select>';
	            _html += '</div>';
	        }


	        _html += '</div>';
	        _html += '<div class="rta" grdkey="'+_id+'">';

	        if(toolbar_col_showhide == "true") _html += '<button type="button" id="'+_id+'_col_showhide" class="button col_showhide" title="컬럼숨기기" grdkey="'+_id+'" onclick="'+_id+'_col_showhide(this)"></button>';
	        
	        if(toolbar_detail == "true") _html += '<button type="button" id="'+_id+'_btn_detail" class="button grid_detail" title="디테일뷰" grdkey="'+_id+'" onclick="'+_id+'._detailview(this)"></button>';
	        else if(toolbar_detail == "dblclick") _html += '<button type="button" id="'+_id+'_btn_detail" class="button grid_detail" title="디테일뷰" grdkey="'+_id+'" onclick="'+_onDblClickFunc+'(this)"></button>';
	        
	        if(toolbar_exup == "true") _html += '<button type="button" id="'+_id+'_btn_exup" class="button excel_up" title="엑셀업로드" grdkey="'+_id+'" onclick="'+_id+'._excel_up(this)"></button>';
	        if(toolbar_exdn == "true") _html += '<button type="button" id="'+_id+'_btn_exdn" class="button excel_dn" title="엑셀다운로드" grdkey="'+_id+'" onclick="'+_id+'._excel_down(this)"></button>';
	        if(toolbar_addrow == "true") _html += '<button type="button" id="'+_id+'_btn_addrow" class="button add_row" title="행추가" grdkey="'+_id+'" onclick="'+_id+'._row_add(this)"></button>';
	        if(toolbar_delrow == "true") _html += '<button type="button" id="'+_id+'_btn_delrow" class="button del_row" title="행삭제" grdkey="'+_id+'" onclick="'+_id+'._row_del(this)"></button>';
	        if(toolbar_nextbtn == "true") _html += '<button type="button" id="'+_id+'_btn_nextbtn" class="button read_next" title="다음" grdkey="'+_id+'" onclick="'+_id+'._next(this)"></button>';
	        if(toolbar_full == "true") _html += '<button type="button" id="'+_id+'_btn_full" class="button grid_full" title="그리드 전체화면"  grdkey="'+_id+'" onclick="'+_id+'._fullScreenGrid(this)"></button>';
	        if(toolbar_dblclick == "true") _html += '<button type="button" id="'+_id+'_btn_dblclick" class="button grid_dblclick" title="그리드 더블클릭"  grdkey="'+_id+'" onclick="'+_onDblClickFunc+'(this)"></button>';
	        if(toolbar_fold == "true") _html += '<button type="button" id="'+_id+'_btn_fold" class="button grid_fold" title="그리드 접기"  grdkey="'+_id+'" onclick="'+_id+'._foldGrid(this)"></button>';
	        
	        for(var k=0; k <attArray.length; k++){
	            var attrName = attArray[k];
	            var attValue = _divObj.getAttribute(attrName);
				if (attValue?.trim()) {
	                try{
	                    var x1Obj = JSON.parse(attValue);
	                    if(x1Obj.position == 'right'){
	                        if(attrName.indexOf('toolbar_grid_checkbox') > -1){
	                            _html += this.renderGridToolbarCheckbox(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_input') > -1){
	                            _html += this.renderGridToolbarInput(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_button') > -1){
	                            _html += this.renderGridToolbarButton(x1Obj,_divObj.id);
	                        }else if(attrName.indexOf('toolbar_grid_label_span') > -1){
	                            _html += this.renderGridToolbarLabelSpan(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_label_input') > -1){
	                            _html += this.renderGridToolbarLabelInput(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_label_combo') > -1){
	                            _html += this.renderGridToolbarLabelCombo(x1Obj,_divObj.id);
	                        }else if(attrName.indexOf('toolbar_grid_combo') > -1){
	                            _html += this.renderGridToolbarCombo(x1Obj,_divObj.id);
	                        }else if(attrName.indexOf('toolbar_grid_label') > -1){
	                            _html += this.renderGridToolbarLabel(x1Obj);
	                        }else if(attrName.indexOf('toolbar_grid_radio') > -1){
	                            _html += this.renderGridToolbarRadio(x1Obj);
	                        }
	                    }
	                }catch(e){
	                    
	                }

	            }
	        }
	        
	        
	        
	        _html += '</div>';
	        _html += '</div>';

	        

	    }
	    
	    var __onclick = '';
	    var __ondblclick = '';
	    var __swipeStyle = '';
	    if(com.getDevice() != 'pc'){
	    	__onclick = 'onclick="'+_id+'.swaipClickScroll(this)"';
	    	__ondblclick = 'ondblclick="'+_id+'.swaipDblScroll(this)"';
	    	__swipeStyle = 'width: 100%; left: 0px;';
	    }    
	    
	    _html += '<div class="moca_grid_list fauto" default_cell_height="'+_default_cell_height+'" grdkey="'+_id+'">';
	        _html += '<div class="moca_grid_body" style="right:18px;">';
	        _html += _header_body;
	        _html += '</div>';
	        _html += '<div id="'+_id+'_moca_scroll_y" componentid="'+_id+'" class="moca_scrollY_type1" '+__onclick+' '+__ondblclick+' onscroll="'+_id+'.sFunction(this);" style="'+__swipeStyle+'">';
	        _html += '<div id="'+_id+'_grid_height" style="height: 0px; position: absolute; top: 0px; left: 0px; width: 18px;"></div>';
	        _html += '</div>';
	        _html += '<div id="lin_dashed" style="position:absolute; top:0px; bottom:0px; border-left:1px dashed #000; z-index:100; height:100%; left:340px;display:none"></div>';
	    _html += '</div>';
	    
	    
	    if(paging.type == 'numberList'){
	        _html += '<div class="moca_grid_paging" id="grid_paging">';
	        _html += '<button type="button" class="first" onclick="'+_id+'.pagingFirst(this)"><span>첫 페이지로 이동</span></button>';
	        _html += '<button type="button" class="prev" onclick="'+_id+'.pagingPrev(this)"><span>이전페이지로 이동</span></button>';
	        _html += '<span class="num" id="numGrp">';
	        _html += '</span>';
	        _html += '<button type="button" class="next" onclick="'+_id+'.pagingNext(this)"><span>다음페이지로 이동</span></button>';
	        _html += '<button type="button" class="last" onclick="'+_id+'.pagingLast(this)"><span>마지막 페이지로 이동</span></button>';
	        _html += '</div>';
	    }
	    
	    _html +='   <div class="gridDetail_body" style="display:none" grdkey="'+_id+'"> ';
	    _html +='       <div class="moca_grid_toolbar_detail"> ';
	    _html +='           <div class="rta"> ';
		_html += '               <button type="button" id="btn_colTh1" class="button colTh1" style="" title="그리드th1단"  onclick="' + _id +'._detailView1(this)"></button> ';
	    _html +='               <button type="button" id="btn_colTh2" class="button colTh2" style="" title="그리드th2단"  onclick="'+_id+'._detailView2(this)"></button> ';
	    if(com.getDevice() != "mobile"){
	    	_html +='           <button type="button" id="btn_colTh3" class="button colTh3" style="" title="그리드th3단"  onclick="'+_id+'._detailView3(this)"></button>'; 
	    }
	    _html +='               <button type="button" id="" class="button grid_detail_close" style="" title="" onclick="'+_id+'._detailViewClose(this)"></button>';
	    _html +='           </div> ';   
	    _html +='       </div> ';
	    _html +='       <table class="gridDetail mb5" id="gridDetail1"> ';
	    _html +='           <tr> ';
	    _html +='               <th>제목'+_id+'</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='           </tr> ';

	    _html +='       </table> ';
	    _html +='       <table class="gridDetail mb5" id="gridDetail2" > ';
	    _html +='           <tr> ';
	    _html +='               <th>제목1</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='               <th>제목2</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='           </tr> ';
	    _html +='           <tr> ';
	    _html +='               <th>제목3</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='               <th>제목4</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='           </tr> ';        
	    _html +='           <tr> ';
	    _html +='               <th>제목5</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='               <th>제목6</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='           </tr> ';        
	    _html +='       </table> ';
	    _html +='       <table class="gridDetail mb5" id="gridDetail3"> ';
	    _html +='           <tr> ';
	    _html +='               <th>제목1</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='               <th>제목2</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='               <th>제목3</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='           </tr> ';
	    _html +='           <tr> ';
	    _html +='               <th>제목4</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='               <th>제목5</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='               <th>제목6</th> ';
	    _html +='               <td><div contenteditable="true" placeholder=""></div></td> ';
	    _html +='           </tr> ';
	    _html +='       </table> ';
	    _html +='   </div> ';
	    
	    
	    
	    
	    _html +='   <div id="col_showhide" class="PopColgroup p5" style="display:none" onclick="$m.preven(this)">';
	    _html +='       <div class="groupListHeader">';
	    _html +='           <div class="fr">';
	    _html +='               <button type="button" class="button btn_save"  onclick="$m._col_showhideApply(this)"><span>적용</span></button>';
	    _html +='               <button type="button" class="button btn_close" style="" title="" onclick="$m._col_showhideClose(this)"></button>';
	    _html +='           </div>';
	    _html +='       </div>';    
	    _html +='       <div class="ly_column col_2">';
	    _html +='           <div class="ly_col_cont">';
	    _html +='               <table class="groupListSet">';
	    _html +='                   <colgroup>';
	    _html +='                   <col>';
	    _html +='                   <col style="width:37px">';
	    _html +='                   </colgroup>';
	    _html +='                   <tr>';
	    _html +='                       <td><div class="moca_ibn"><input type="text" class="moca_input" style="" id="grpNm_'+_id+'" placeholder="그룹명을 입력해주세요"><input type="color" class="moca_input_color"></div></td>';
	    _html +='                       <td><button type="button" class="button btn_plus" onclick="$m.createColGroup(this)"><i class="fas fa-plus"></i></button></td>';
	    _html +='                   </tr>';
	    _html +='               </table>';
	    _html +='               <table class="groupList mb5">';
	    _html +='               </table>';
	    _html +='           </div>';
	    _html +='       </div>';
	    _html +='       <div class="ly_column col_8">';
	    _html +='           <div class="ly_col_cont">';
	    _html +='               <div class="ly_col_cont">';
	    _html +='                   <h3 class="txt_red p10">*그룹으로 묶을 컬럼을 선택해주세요</h3>';
	    _html +='                   <ul class="groupColList pl10">';
	    _html +='                   </ul>';
	    _html +='               </div>';
	    _html +='           </div>';
	    _html +='       </div>';
	    _html +='   </div>';

	    //_html = $m.addPageId(_html,pageid,srcid);
	    _divObj.innerHTML = _html;
	    _divObj.onRowSelectedFunction = function(){
	        var tdObj;
	        if(event.srcElement.tagName == 'TD'){
	            tdObj = event.srcElement;
	        }else if(event.srcElement.parentElement != null && event.srcElement.parentElement.parentElement != null && event.srcElement.parentElement.parentElement.tagName == 'TD'){
	            tdObj = event.srcElement.parentElement.parentElement;   
	        }else if(event.srcElement.parentElement != null && event.srcElement.parentElement.tagName == 'TD'){
	            tdObj = event.srcElement.parentElement; 
	        }
	        //event.srcElement.parentElement.parentElement 트리일 경우.
	        if(tdObj != null && tdObj.tagName == 'TD'){
	            this._setSelectRowIndex(tdObj);
	            this._setRowSelection(this,tdObj);
	            
	            var onRowSelectedFunc = _divObj.getAttribute("onRowSelected");
	            if(onRowSelectedFunc != undefined){
	                var _realIndex = _divObj.getAttribute("selectedRealRowIndex");
	                this.pageId = this.getAttribute("pageId");
	                this.srcId =  this.getAttribute("srcId");
	                eval(onRowSelectedFunc)(_divObj,_realIndex,tdObj,this);
	            }
	        }
	        
	    };
		
		_divObj.addEventListener('click', _divObj.onRowSelectedFunction);

		var _cellMap = {};
		var _cellIndex = {};

		// jQuery: $(_divObj).find('colgroup:first col');
		var colArray = _divObj.querySelectorAll('colgroup col');

		// jQuery: $(_divObj).find('tbody:first td');
		var _cellArr = _divObj.querySelectorAll('tbody td');

		// jQuery: $(_divObj).find('thead:first th[id]');
		var thArray = _divObj.querySelectorAll('thead th[id]');

		var _thMap = {};
		for (var i = 0; i < thArray.length; i++) {
		  var thObj = thArray[i];
		  _thMap[thObj.id] = thObj;
		}

		for (var i = 0; i < colArray.length; i++) {
		  var aCol = colArray[i];

		  var aTh = _thMap[aCol.getAttribute("thid")];
		  if (aTh == null) {
		    aTh = thArray[i] || null;
		  }

		  var aTd = _cellArr[i] || null;
		  if (aTd) {
		    _cellMap[aTd.id] = aTd;
		    _cellIndex[aTd.id] = i;

		    var required = aTd.getAttribute("required");
		    var celltype = aTd.getAttribute("celltype");

		    if (celltype == 'tree') {
		      _divObj.setAttribute("usetree", "true");
		      _divObj.setAttribute("treetdid", aTd.id);
		    }

		    if (required == 'true' && aTh) {
		      aTh.classList.add('req'); // $(aTh).addClass('req');
		    }
		  }

		  if (aTh != null) {
		    var before = aTh.innerHTML;
		    var _after = '';
		    var thCelltype = aTh.getAttribute("celltype");

		    if (thCelltype == 'checkbox') {
		      // $(aTh).off("click").on("click",$m.cellAllCheck);
		      if (aTh._mocaClickHandler) {
		        aTh.removeEventListener('click', aTh._mocaClickHandler);
		      }
		      aTh._mocaClickHandler = $m.cellAllCheck;
		      aTh.addEventListener('click', aTh._mocaClickHandler);

		      _after = '<div class="moca_checkbox_grid" >';
		      _after += '<input type="checkbox" class="moca_checkbox_input allcheck" name="cbxAll" ';
		      _after += 'id="cbx_' + this.pageId + '_' + this.srcId + '_' + _id + '" ';
		      _after += 'grd_id=' + _id + '>';
		      _after += '<label class="moca_checkbox_label" for="cbx_' + this.pageId + '_' + this.srcId + '_' + _id + '"  >label</label>';
		      _after += '</div>';
		    } else {
		      _after += '<div class="moca_grid_sort_box">';
		      _after += '<span>' + before + '</span>';
		    }

		    var sortable = aTh.getAttribute("sortable");
		    if (sortable == "true") {
		      // 기존 inline onclick 유지(완전 순수 JS로 바꾸려면 아래 주석 참고)
		      _after += '<button class="moca_grid_sort_btn sort_none" onclick="'+_id+'.doSort(this)">정렬취소</button>';
		    }

		    var filterable = aTh.getAttribute("filterable");
		    if (filterable == "true") {
		      _after += '<button class="moca_grid_filter_btn" onclick="'+_id+'.doFilter(this)" ondblclick="'+_id+'.doFilterDblclick(this)">필터</button>';
		      _after += '<i onclick="'+_id+'.filterRemoveAllConfirm(this);"></i>';
		    }

		    aTh.innerHTML = _after;
		    aTh.innerHTML = aTh.innerHTML + '<div class="groupbar"></div>';

		    // ✅ (선택) inline onclick를 완전 제거하고 싶으면:
		    // aTh.innerHTML로 넣은 뒤, aTh 안의 버튼들을 querySelector로 찾아 addEventListener로 붙이는 방식으로 바꿔야 함.
		  }
		}

		_divObj.cellInfo = _cellMap;
		_divObj.cellArr = _cellArr;
		_divObj.cellIndex = _cellIndex;

		//$m._col_showhideExe(_divObj);

		_divObj.list = [];

		// $(_divObj).find('tbody:first').html('');
		var tbodyFirst = _divObj.querySelector('tbody');
		if (tbodyFirst) tbodyFirst.innerHTML = '';

		// $(_divObj).find('thead:first>tr').bind('mousedown', function(e){ ... });
		var theadFirstTr = _divObj.querySelector('thead > tr');
		if (theadFirstTr) {
		  // 중복 바인딩 방지(원하면 제거 가능)
		  if (theadFirstTr._mocaMouseDownHandler) {
		    theadFirstTr.removeEventListener('mousedown', theadFirstTr._mocaMouseDownHandler);
		  }
		  theadFirstTr._mocaMouseDownHandler = function (e) {
		    //$m.grid_colDown(this);
		    e.preventDefault();
		    return false;
		  };
		  theadFirstTr.addEventListener('mousedown', theadFirstTr._mocaMouseDownHandler);
		}

		// $(_divObj).find('thead:first th[id]').bind('dblclick',$m.doSort);
		var ths = _divObj.querySelectorAll('thead th[id]');
		ths.forEach(function (th) {
		  if (th._mocaDblClickHandler) th.removeEventListener('dblclick', th._mocaDblClickHandler);
		  //th._mocaDblClickHandler = $m.doSort;
		  //th.addEventListener('dblclick', th._mocaDblClickHandler);
		});

		// 계산부
		var _default_cell_height = this.getCellHeight(_divObj);

		// headerCellCnt = $(_divObj).find('thead').children().length;
		var thead = _divObj.querySelector('thead');
		var headerCellCnt = thead ? thead.children.length : 0;

		// viewRowsMaxCnt = (bodyHeight - theadHeight) / cellHeight;
		var bodyEl = _divObj.querySelector('.moca_grid_body');
		var bodyHeight = bodyEl ? bodyEl.clientHeight : 0;
		var theadHeight = thead ? thead.getBoundingClientRect().height : 0;

		var viewRowsMaxCnt = 0;
		if (_default_cell_height) {
		  viewRowsMaxCnt = (bodyHeight - theadHeight) / _default_cell_height;
		}

		_divObj.viewRowsMaxCnt = Math.round(viewRowsMaxCnt);

	},
	
	renderGridToolbarCheckbox(x1Obj) {
	    ['grid toolbar내 checkbox만들기'];
	    var _html = '';
	    if(x1Obj.checked == 'true'){
	        x1Obj.checkedStr = 'checked';
	    }else{
	        x1Obj.checkedStr = '';
	    }
	    if(x1Obj.onclick != null && x1Obj.onclick != ''){
	        x1Obj.onclickStr = 'onclick="$m.setter_pageId(\''+this.pageId+'\',\''+this.srcId+'\',\''+x1Obj.onclick+'\',this)"'; 
	    }else{
	        x1Obj.onclickStr = '';
	    }
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }
	    _html += '<div type="gridCheckbox" class="'+x1Obj.addClassStr+'">';
	    _html += '<input type="checkbox" class="moca_checkbox_input" id="'+x1Obj.id+'" name="'+x1Obj.id+'" value="'+x1Obj.value+'" '+x1Obj.checkedStr+' '+x1Obj.onclickStr+'>';
	    _html += '<label type="checkbox" class="moca_checkbox_label" for="'+x1Obj.id+'" >'+x1Obj.label+'</label>'; 
	    _html += '</div>';
	    
	    return _html;
	},

	renderGridToolbarInput(x1Obj) {
	    ['grid toolbar내 input만들기'];
	    var _html = '';
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }
	    _html += '<div type="gridInput" class="'+x1Obj.addClassStr+'">';
	    _html += '<input type="text" class="" id="'+x1Obj.id+'" name="'+x1Obj.id+'" value="'+x1Obj.value+'" style="width:'+x1Obj.width+'">';
	    _html += '</div>';
	    return _html;
	},

	renderGridToolbarButton(x1Obj,_id) {
	    ['grid toolbar내 button만들기'];
	    var _html = '';
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }
	    var _innerStyle = '';
	    if(x1Obj.innerStyle != null){
	        _innerStyle = x1Obj.innerStyle;
	    }
	    var _disabled = '';
	    var tmp_disabled = '';
	    var tmp_disabled_style = '';
	    var _btnid = '';
	    tmp_disabled = x1Obj.innerDisabled;
	    if($m.isTrue(tmp_disabled)){
	        _disabled = "disabled";
	        _innerStyle += ";background:#aaa;";
	    }
	    if(x1Obj.id != null){
	       _btnid = x1Obj.id;
	    }
	    if(com.getDevice() != 'pc' && x1Obj.mobileHide == "true"){
	    	_html += '<div class="grid_btn '+x1Obj.addClassStr+'" grdkey="'+_id+'" style="display:none">';
	    }else{
	    	_html += '<div class="grid_btn '+x1Obj.addClassStr+'" grdkey="'+_id+'">';
	    } 
	    
	    _html += '<button type="button" id="'+_btnid+'" style="'+_innerStyle+'" onclick="'+x1Obj.onclick+'(this)" '+_disabled+' >'+x1Obj.label+'</button>';
	    _html += '</div>';
	    return _html;
	},

	renderGridToolbarLabelSpan(x1Obj) {
	    ['grid toolbar내 LabelSpan만들기'];
	    var _html = '';
	    if(x1Obj.checked == 'true'){
	        x1Obj.checkedStr = 'checked';
	    }else{
	        x1Obj.checkedStr = '';
	    }
	    //if(x1Obj.onclick != null && x1Obj.onclick != ''){
	        //x1Obj.onclickStr = 'onclick="$m.setter_pageId(\''+this.pageId+'\',\''+this.srcId+'\',\''+x1Obj.onclick+'\',this)"'; 
	    //}else{
	        x1Obj.onclickStr = '';
	    //}
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }
	    
	    if(x1Obj.valueClass == null){
	        x1Obj.valueClassStr = '';
	    }else{
	        x1Obj.valueClassStr = x1Obj.valueClass;
	    }
	    if(x1Obj.unit == null){
	        x1Obj.unitStr = '';
	    }else{
	        x1Obj.unitStr = x1Obj.unit;
	    }
	    /*
	    if(x1Obj.conditionParam == null){
	    	 x1Obj.conditionParamStr = '';
	    }else{
	    	 x1Obj.conditionParamStr =  eval(x1Obj.conditionParam);
	    }
	    if(x1Obj.expression == null){
	    	 x1Obj.expressionStr = '';
	    }else{
	    	 x1Obj.expressionStr = eval(x1Obj.expression);
	    }*/
	    if(com.getDevice() != 'pc' && x1Obj.mobileHide == "true"){
	    	_html += '<div class="grid_label_span'+x1Obj.addClassStr+'" style="display:none">';
	    }else{
	    	_html += '<div class="grid_label_span '+x1Obj.addClassStr+'" grdkey="'+x1Obj.id+'">';
	    }
	    _html += '<span class="label">'+x1Obj.label+'</span>';
	    _html += '<span id="'+x1Obj.id+'" class="'+x1Obj.valueClassStr+'" name="'+x1Obj.id+'" >'+x1Obj.value+'</span>';
	    _html += '<span>'+x1Obj.unitStr+'</span>';
	    _html += '</div>';
	    return _html;
	},

	renderGridToolbarLabel(x1Obj) {
	    ['grid toolbar내 Label만들기'];
	    var _html = '';
	    if(x1Obj.checked == 'true'){
	        x1Obj.checkedStr = 'checked';
	    }else{
	        x1Obj.checkedStr = '';
	    }
	    //if(x1Obj.onclick != null && x1Obj.onclick != ''){
	        //x1Obj.onclickStr = 'onclick="$m.setter_pageId(\''+this.pageId+'\',\''+this.srcId+'\',\''+x1Obj.onclick+'\',this)"'; 
	    //}else{
	        x1Obj.onclickStr = '';
	    //}
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }
	    _html += '<div class="grid_label_span  '+x1Obj.addClassStr+'">';
	    _html += '<span class="label" id="'+x1Obj.id+'" name="'+x1Obj.id+'" >'+x1Obj.label+'</span>';
	    _html += '</div>';
	    return _html;
	},

	renderGridToolbarLabelInput(x1Obj) {
	    ['grid toolbar내 LabelInput만들기'];
	    var _html = '';
	    if(x1Obj.checked == 'true'){
	        x1Obj.checkedStr = 'checked';
	    }else{
	        x1Obj.checkedStr = '';
	    }
	    //if(x1Obj.onclick != null && x1Obj.onclick != ''){
	        //x1Obj.onclickStr = 'onclick="$m.setter_pageId(\''+this.pageId+'\',\''+this.srcId+'\',\''+x1Obj.onclick+'\',this)"'; 
	    //}else{
	        x1Obj.onclickStr = '';
	    //}
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }
	    _html += '<div class="grid_label_span '+x1Obj.addClassStr+'">';
	    _html += '<span class="label">'+x1Obj.label+'</span>';
	    _html += '  <input class="moca_input" type="text" id="'+x1Obj.id+'" name="'+x1Obj.id+'" value="'+x1Obj.value+'" style="width:'+x1Obj.width+'">';
	    _html += '</div>';
	    return _html;
	},


	renderGridToolbarCombo(x1Obj,_id) {
	    ['grid toolbar내 LabelInput만들기'];
	    var _html = '';
	    if(x1Obj.checked == 'true'){
	        x1Obj.checkedStr = 'checked';
	    }else{
	        x1Obj.checkedStr = '';
	    }
	    //if(x1Obj.onclick != null && x1Obj.onclick != ''){
	        //x1Obj.onclickStr = 'onclick="$m.setter_pageId(\''+this.pageId+'\',\''+this.srcId+'\',\''+x1Obj.onclick+'\',this)"'; 
	    //}else{
	        x1Obj.onclickStr = '';
	    //}
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }
	    /*
	    _html += '<div class="grid_label_span">';
	    _html += '<span class="label">'+x1Obj.label+'</span>';
	    _html += '  <input type="text" id="'+x1Obj.id+'" name="'+x1Obj.id+'" value="'+x1Obj.value+'" style="width:'+x1Obj.width+'">';
	    _html += '</div>';
	    */
	    _html += '<div class="moca_combo '+x1Obj.addClassStr+'" style="width:'+x1Obj.width+'" grdkey="'+_id+'">';
	    _html += '<select class="moca_select" id="'+x1Obj.id+'">';
	    _html += '  <option value="800" selected>800건</option>';    
	    _html += '  <option value="20">20건</option>';       
	    _html += '  <option value="50">50건</option>';
	    _html += '  <option value="100">100건</option>';
	    _html += '  <option value="400">400건</option>';
	    _html += '</select>';
	    _html += '</div>';
	    return _html;
	},


	renderGridToolbarLabelCombo(x1Obj,_id) {
	    ['grid toolbar내 LabelCombo만들기'];
	    var _html = '';
	    if(x1Obj.checked == 'true'){
	        x1Obj.checkedStr = 'checked';
	    }else{
	        x1Obj.checkedStr = '';
	    }
	    //if(x1Obj.onclick != null && x1Obj.onclick != ''){
	        //x1Obj.onclickStr = 'onclick="$m.setter_pageId(\''+this.pageId+'\',\''+this.srcId+'\',\''+x1Obj.onclick+'\',this)"'; 
	    //}else{
	        x1Obj.onclickStr = '';
	    //}
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }
	    
	    _html += '<div class="grid_label_span  '+x1Obj.addClassStr+'">';
	    _html += '<span class="label">'+x1Obj.label+'</span>';
	    _html += '<div class="moca_combo" style="width:'+x1Obj.width+';display:inline-block" grdkey="'+_id+'">';
	    _html += '<select class="moca_select" id="'+x1Obj.id+'">';
	    _html += '  <option value="800" selected>800건</option>';    
	    _html += '  <option value="20">20건</option>';       
	    _html += '  <option value="50">50건</option>';
	    _html += '  <option value="100">100건</option>';
	    _html += '  <option value="400">400건</option>';
	    _html += '</select>';
	    _html += '</div>';
	    _html += '</div>';
	    return _html;
	},

	renderGridToolbarRadio(x1Obj,_id) {
	    ['grid toolbar내 Radio만들기'];
	    var _html = '';

	    if(x1Obj.onclick != null && x1Obj.onclick != ''){
	        x1Obj.onclickStr = 'onclick="'+x1Obj.onclick+'(\''+this.pageId+'\',\''+this.srcId+'\',this)"'; 
	    }else{
	        x1Obj.onclickStr = '';
	    }
	    if(x1Obj.addClass == null){
	        x1Obj.addClassStr = '';
	    }else{
	        x1Obj.addClassStr = x1Obj.addClass;
	    }

	    
	    _html += '<div class="moca_radio mt7 '+x1Obj.addClassStr+'"  id="'+x1Obj.id+'">';
	    var arr = x1Obj.value;
	    for(var i=0; i < arr.length; i++){
	        var obj = arr[i];
	        if(obj.checked == null){
	            obj.checkedStr = '';
	        }else{
	            obj.checkedStr = "checked";
	        }
	        
	        
	        _html += '<input type="radio" class="moca_radio_input" name="radio_'+x1Obj.id+'" id="radio_'+x1Obj.id+'_'+i+'" '+x1Obj.onclickStr +' value="'+obj.value+'" '+obj.checkedStr+' >';
	        _html += '<label class="moca_radio_label mr4" for="radio_'+x1Obj.id+'_'+i+'">'+obj.label+'</label>';
	    }
	    _html += '</div>'
	    return _html;
	},

	_setSelectRowIndex(_tdObj){
	    ['row select Index구하기'];
		var tr;

		if (_tdObj.tagName === 'TR') {
		  tr = _tdObj;
		} else if (_tdObj.tagName === 'TD') {
		  tr = _tdObj.parentElement;
		}

		if (!tr) return;

		var tbody = tr.parentElement;

		// 1차: _tdObj 기준으로 grid 찾기
		var grd = _tdObj.closest('div[type="grid"]');

		// 2차: 못 찾았을 경우 id 기준으로 다시 시도
		if (!grd && _tdObj.id) {
		  var safeId = CSS.escape(_tdObj.id);
		  var elById = document.getElementById(_tdObj.id);
		  if (elById) {
		    grd = elById.closest('div[type="grid"]');
		  }
		}

		if (!grd) return;

		var realrowindex = tr.getAttribute('realrowindex');
		grd.setAttribute('selectedRealRowIndex', realrowindex);
		
	},
	
	_setRowSelection(grd,_tdObj){ 
	    ['row select 표시'];
		var _realIndex = grd.getAttribute("selectedRealRowIndex");

		if (_realIndex != null && String(_realIndex).trim() !== '') {

		  // tbody:first
		  var tbody = grd.querySelector('tbody');
		  if (!tbody) return;

		  // tbody:first > tr[realrowindex=...]
		  // (값에 특수문자 가능성 있으면 따옴표로 감싸는 게 안전)
		  var foundedRows = grd.querySelectorAll(`tbody > tr[realrowindex="${CSS.escape(String(_realIndex))}"]`);

		  var selectedRow = null;
		  if (foundedRows.length === 1) {
		    selectedRow = foundedRows[0];
		  }

		  if (selectedRow != null) {

		    // 기본 선택색
		    var _bgcolor = this.rowSelectedColor;

		    // grd의 rowselectedcolor 속성 우선
		    var attrColor = grd.getAttribute("rowselectedcolor");
		    if (attrColor != null && String(attrColor).trim() !== '') {
		      _bgcolor = attrColor;
		    }

		    // 기존 선택 스타일 초기화:
		    // $(grd).find('tbody:first').children().children().css(...)
		    // = tbody의 모든 tr의 모든 td/th에 대해 스타일 제거
		    tbody.querySelectorAll('tr > *').forEach(function (cell) {
		      cell.style.backgroundColor = '';
		      cell.style.color = '';
		    });

		    // 선택된 row의 모든 셀에 스타일 적용:
		    // $(selectedRow).children().css(...)
		    Array.from(selectedRow.children).forEach(function (cell) {
		      cell.style.backgroundColor = _bgcolor;
		      cell.style.color = '#FFF';
		    });
		  }
		}
	},
	
	getCellHeight(_grd) {
	    var _default_cell_height = _grd.getAttribute("default_cell_height");
	    if(_default_cell_height == null){
	        //_default_cell_height = mocaConfig.grid.default_cell_height;
			_default_cell_height = 26;
	    }
	    _default_cell_height = parseFloat(_default_cell_height.replace(/px/g,''))+1;
	    return _default_cell_height;
	},
	
	draw(_list,_response){
		_grdId = this;
       this.drawGrid_inside(_grdId,_list,_list,this.pageId,this.srcId,_response);
       if(typeof _grdId == 'object'){
           com.getObj(_grdId.id+"_moca_scroll_y",null,this.pageId,this.srcId).scrollTop = 0; 
       }else{
           com.getObj(_grdId+"_moca_scroll_y",null,this.pageId,this.srcId).scrollTop = 0; 
       }
       
   },
   
   drawGrid (_grdId,_list,_response){
       this.drawGrid_inside(_grdId,_list,_list,this.pageId,this.srcId,_response);
       if(typeof _grdId == 'object'){
           com.getObj(_grdId.id+"_moca_scroll_y",null,this.pageId,this.srcId).scrollTop = 0; 
       }else{
           com.getObj(_grdId+"_moca_scroll_y",null,this.pageId,this.srcId).scrollTop = 0; 
       }
       
   },
   
   drawGrid_inside (_grdId,_list,_orilist,_pageId,_srcId,_response){
       var _grd;
       if(typeof _grdId == 'string'){
           _grd = com.getObj(_grdId,null,_pageId,_srcId);
       }else{
           _grd = _grdId;
           _grdId = _grdId.id;
       }
       _srcId = _grd.getAttribute("srcid");
       //$m[_srcId].filterRemoveAll(_grd);
       _grd.list = _list;
       if(_grd.list != null){
       	if(com.getAttrObj(_grd,'paging').type != 'numberList'){
       		this.setTotalCnt(_grd,com.comma(_grd.list.length));
       	}else if(_response != null){
   			var _totalCnt =_response[com.getAttrObj(_grd,'paging').totalCntKey];
       		this.setTotalCnt(_grd,_totalCnt);
       	}
           if(_orilist != null){
               _grd.ori_list =  [..._orilist];
           }
           ////////////////////////////////////////////////////////////////// filter 구성 start
           var list = _list;
           var jq_grd_2 = _grd;
           var ks = Object.keys(jq_grd_2.cellInfo);
           var filterArr = [];
           var filterThArr = [];
		   var thArray = jq_grd_2.querySelectorAll('thead th[filterableId]');
           for(var i=0; i < thArray.length; i++){
               var aTh = thArray[i];
               var filterableId = aTh.getAttribute("filterableId");
               filterArr.push(filterableId);
               filterThArr.push(aTh.id);
               if(jq_grd_2[filterableId] == null){
                   jq_grd_2[filterableId] = {};
               }
               jq_grd_2[filterableId]['filterableMap'] = {};
           }
           /*
            * full loop area !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            */
           for(var i=0; i < list.length; i++){
               var row = list[i];
               row["_system"]["realIndex"] = i;
               for(var k=0; k < filterArr.length; k++){
                   var tdId = filterArr[k];
                   var tdValue = row[tdId];
                   jq_grd_2[tdId]['filterableMap'][tdValue] = (com.getNumber(jq_grd_2[tdId]['filterableMap'][tdValue])+1);
                   if(i == list.length-1){
                       jq_grd_2[tdId]['filterableMap'] = com.sortObject(jq_grd_2[tdId]['filterableMap']);
                       jq_grd_2[tdId]['countableMap'] = {};
                       var m = jq_grd_2[tdId].filterableMap;
                       var keys = Object.keys(m);
                       for(var j=0; j < keys.length; j++){
                           var key = keys[j];
                           var val = "";
                           if(m != null){
                               val = m[key];
                           }
                           var reKey = "("+val+"건)"+" "+key;
                           jq_grd_2[tdId]['countableMap'][reKey] = key+" "+"("+com.comma(val)+"건)";
                       }
                       //jq_grd_2[tdId]['countableMap'] = $m.sortObjectNumString(jq_grd_2[tdId]['countableMap']);
                       var keys = Object.keys(jq_grd_2[tdId]['countableMap']);
                       for(var j=0; j < keys.length; j++){
                           var key = keys[j];
                           var val = "";
                           if(m != null){
                               val = m[key];
                           }
                           jq_grd_2[tdId]['countableMap'][key] = (j+1)+"."+key;
                       }   
                       
                       
                       jq_grd_2[tdId]['alphabeticalMap'] = jq_grd_2[tdId]['filterableMap'];
                       jq_grd_2[tdId].filterType = 'alphabeticalMap';
                   }
               }
           }
           
           for(var i=0; i < filterArr.length; i++){
               var tdId = filterArr[i];
               var thId = filterThArr[i];
               var m = jq_grd_2[tdId].filterableMap;
               var keys = Object.keys(jq_grd_2[tdId]['filterableMap']);
               for(var j=0; j < keys.length; j++){
                   var key = keys[j];
                   var val = "";
                   if(m != null){
                       val = m[key];
                   }
                   
                   jq_grd_2[tdId]['filterableMap'][key] = (j+1)+"."+key+" "+"("+com.comma(val)+"건)";
               }
               
			   jq_grd_2.querySelectorAll(`.itemTable[thid="${CSS.escape(thId)}"]`).forEach(el => el.remove());
			   jq_grd_2.filter = null;

           }
           
       //////////////////////////////////////////////////////////////////filter 구성 end
           this.setVirtualScroll(_grd);
           this.genTbody(_grd,_list,0);
           
       }

   },
   
   genTbody (_grd, _list, _idx, isEnd) {
     var dataLeng = _list.length;
     var idx = 0;
     if (_idx != null) idx = _idx;

     _grd.setAttribute("yscrollIdx", idx);

     var usetree = _grd.getAttribute("usetree");
     var treetdid = _grd.getAttribute("treetdid");

     var _default_cell_height = this.getCellHeight(_grd);

     // jQuery: $(_grd).find('thead').children().length;
     var thead = _grd.querySelector("thead");
     var headerCellCnt = thead ? thead.children.length : 0;

     // jQuery: ($(_grd).find('.moca_grid_body').height() - $(_grd).find('thead').height()) / _default_cell_height;
     var bodyEl = _grd.querySelector(".moca_grid_body");
     var bodyH = bodyEl ? bodyEl.clientHeight : 0;
     var theadH = thead ? thead.getBoundingClientRect().height : 0;

     var viewRowsMaxCnt = 0;
     if (_default_cell_height) {
       viewRowsMaxCnt = (bodyH - theadH) / _default_cell_height;
       viewRowsMaxCnt = Math.round(viewRowsMaxCnt);
     }

     if (viewRowsMaxCnt < 1) {
       viewRowsMaxCnt = _grd.viewRowsMaxCnt;
     }

     if (isEnd) {
       idx = dataLeng - Math.floor(viewRowsMaxCnt);
     } else {
       if (dataLeng != viewRowsMaxCnt) {
         viewRowsMaxCnt++; // tree에서 넥스트tr 미리보기
       }
     }

     if (idx < 0) idx = 0;

     var viewRowsMaxNow = dataLeng;
     if (dataLeng < (viewRowsMaxCnt + idx)) viewRowsMaxNow = dataLeng;
     else viewRowsMaxNow = (viewRowsMaxCnt + idx);

     var tbodyHtml = "";

     for (var i = idx, j = viewRowsMaxNow; i < j; i++) {
       var row = _list[i];

       var row_next;
       if (i + 1 < j) row_next = _list[i + 1];

       var row_pre;
       if (i - 1 > 0) row_pre = _list[i - 1];

       var isExp = "true";
       var showHide = "show";

       if (usetree == "true") {
         isExp = row["_system"]["expand"];
         showHide = row["_system"]["display"];
         if (showHide == null) showHide = "show";
       }

       var _aTr = this.genRows(row, row_pre, row_next, _grd, null, idx, i, "before");

       if (showHide == "hide") {
         j++;
         if (j > dataLeng) j = dataLeng;
         continue;
       } else {
         tbodyHtml += _aTr;
       }
     }

     // jQuery: $(_grd).find('tbody:first').html(tbody);
     var tbody = _grd.querySelector("tbody");
     if (tbody) tbody.innerHTML = tbodyHtml;

     // after 처리 (원본 코드처럼 호출)
     for (var i2 = idx, j2 = viewRowsMaxNow; i2 < j2; i2++) {
       // 원본 코드도 row/row_pre/row_next 재계산 없이 호출하길래 동일하게 유지
       // (정확히 맞추려면 위에서처럼 다시 계산해 넘겨야 함)
       this.genRows(row, row_pre, row_next, _grd, null, idx, i2, "after");
     }

     //$m._col_showhideExe(_grd);
     this._setRowSelection(_grd);

     // ===== dblclick(tr) 위임: jQuery off/on 대체 =====
     var _onDblClickFunc = _grd.getAttribute("onDblClick");
     if ((_onDblClickFunc ?? "").trim() !== "") {
       // 중복 바인딩 방지
       if (_grd._mocaDblClickHandler) {
         _grd.removeEventListener("dblclick", _grd._mocaDblClickHandler);
       }

       _grd._mocaDblClickHandler = function (e) {
         var tr = e.target.closest("tr");
         if (!tr || !_grd.contains(tr)) return;

         var nowGrd = _grd;
         var rowIndex = tr.getAttribute("realrowindex");

         // event.srcElement 대신 e.target 사용
         var src = e.target;
         var td = null;

         if (src && src.tagName === "DIV") {
           td = src.closest("td");
         } else if (src && src.tagName === "TD") {
           td = src;
         } else {
           td = src ? src.closest("td") : null;
         }

         var colId = td ? td.id : null;
         if (!colId) return;

         // jQuery: $(e.currentTarget).find('td[id='+colId+']').index();
         var tdInRow = tr.querySelector(`#${CSS.escape(colId)}`);
         var colIndex = -1;
         if (tdInRow) colIndex = Array.prototype.indexOf.call(tr.children, tdInRow);

         var fnStr = nowGrd.getAttribute("onDblClick");
         if (!fnStr) return;

         // 기존 로직 유지: eval(fnStr)(...)
         eval(fnStr)(nowGrd, rowIndex, colIndex, colId);
       };

       _grd.addEventListener("dblclick", _grd._mocaDblClickHandler);
     }

     // ===== tooltip/hover/wheel/mousemove: jQuery 이벤트 위임 대체 =====
     // jQuery의 $._data(_grd,"events") 체크는 순수 JS에서 불가 → 플래그로 1회만 바인딩
     if (!_grd._mocaHoverBound) {
       _grd._mocaHoverBound = true;

       // mouseenter(td) 위임: mouseover로 구현
       _grd.addEventListener("mouseover", function (e) {
         var td = e.target.closest("td");
         if (!td || !_grd.contains(td)) return;

         // 실제로 td에 "진입"했을 때만(내부 이동 제외)
         if (e.relatedTarget && td.contains(e.relatedTarget)) return;

         if (td.innerText != null && td.innerText !== "" && td.getAttribute("tooltip") === "true") {
           var tooltip = document.querySelector(".moca_grid_tooltip");
           if (!tooltip) return;

           tooltip.style.position = "fixed";
           tooltip.innerHTML = td.innerText;

           var tdWidth = tooltip.getBoundingClientRect().width + 20;
           var posi = e.clientX;
           var s = window.innerWidth / 2;

           if (posi < s) posi = posi + 20;
           else posi = posi - tdWidth;

           var tdHeight = td.getBoundingClientRect().height;
           var posiY = e.clientY;
           var posiY_max = document.body.clientHeight - tdHeight - 20;
           if (posiY > posiY_max) posiY = posiY_max;

           tooltip.style.top = posiY + "px";
           tooltip.style.left = posi + "px";
           tooltip.style.display = "block";
         }
       });

       // mouseleave(tbody:first) 위임: mouseout로 구현
       _grd.addEventListener("mouseout", function (e) {
         var tbodyEl = e.target.closest("tbody");
         if (!tbodyEl || !_grd.contains(tbodyEl)) return;

         // tbody에서 완전히 나갈 때만
         if (e.relatedTarget && tbodyEl.contains(e.relatedTarget)) return;

         var tooltip = document.querySelector(".moca_grid_tooltip");
         if (tooltip) tooltip.style.display = "none";

         e.preventDefault();
         e.stopPropagation();
         return false;
       });

       // wheel(tbody:first)
       _grd.addEventListener("wheel", function (e) {
         var tbodyEl = e.target.closest("tbody");
         if (!tbodyEl || !_grd.contains(tbodyEl)) return;

         if (e.currentTarget && e.currentTarget.tagName === "TBODY") {
           // (여긴 원본 조건이 애매해서, 실제로는 아래처럼 grid 기준으로 처리하는 게 안전)
         }

         var grd = (e.target.closest("[type=grid]") || _grd);
         this.pageId = grd.getAttribute("pageId");
         this.srcId = grd.getAttribute("srcid");

         this.wFunction(com.getObj(_grd.id + "_moca_scroll_y"));
       }, { passive: true });

       // mousemove(table)
       _grd.addEventListener("mousemove", function (e) {
         var table = e.target.closest("table");
         if (!table || !_grd.contains(table)) return;
         //$m.grid_checkBorder(table);
       });
     }

     // 다 그리고 난 후 색칠
     var rowBgColorFunctionStr = _grd.getAttribute("rowBgColorFunction");
     if (rowBgColorFunctionStr != null) {
       var rowBgColorFunctionObj = eval(rowBgColorFunctionStr);
       rowBgColorFunctionObj();
     }
   },
   genRows (_row, _row_pre, _row_next, _grd, _mode, _startIndex, _nowIndex, _beforeAfter) {
     if (_row["_system"] == null) {
       _row["_system"] = { status: "", expand: "true", realIndex: _nowIndex + "" };
     } else {
       _row["_system"]["realIndex"] = _nowIndex + "";
     }

     var row = "<tr realRowIndex='" + _nowIndex + "'>";

     // jQuery: $(_grd).find('table').find('th').length;
     var tdCnt = _grd.querySelectorAll("table th").length;

     var ks = Object.keys(_grd.cellInfo);
     var cellCnt = ks.length;

     var cellHeight = _grd.getAttribute("default_cell_height");
     if (cellHeight == null) {
       console.log("grid(" + _grd.id + ")에 default_cell_height가 지정되지않았습니다. 26px로 지정합니다.");
       cellHeight = "26px";
     }

     var ch = parseFloat(String(cellHeight).replace(/px/g, "")) - 2;

     // ===== Array row =====
     if (Array.isArray(_row)) {
       for (var i = 0, j = cellCnt; i < j; i++) {
         var cell = (_row[i] + "");
         var cellTd = _grd.cellInfo[i];

         if (cell == null || cell == "null") cell = "";
         cell = cell.replace(/<(\/)?br(\/)?>/gi, "&lt;br&gt;");

         row += '<td headers="col3" id="td' + i + '" celltype="input" style="height:' + cellHeight + '">';
         row += '<input type="text" class="moca_input" style="height:' + ch + 'px" value="' + cell + '">';
         row += "</td>";
       }
     } else {
       // ===== Object row =====
       for (var i = 0, j = ks.length; i < j; i++) {
         var key = ks[i];
         var cell;

         if (key == "status") {
           cell = (_row["_system"][key] != null) ? (_row["_system"][key] + "") : "";
         } else {
           cell = (_row[key] != null) ? (_row[key] + "") : "";
         }

         var cellTd = _grd.cellInfo[key];

         var readOnly, _celltype, _id, _class, _name, _toolTip, _displayFormat;
         var _keyMask, _displayFunction, _displayFunctionApply, _disabledFunction;
         var _align, _addRowEditable, _style, _required, _popupUrl, _popupData;
         var _levelId, _labelId, _maxLength, _editorMode, _mobileWidth, _callFunction;

         if (cellTd == null) {
           cell = "";
         } else {
           cell = cell.replace(/<(\/)?br(\/)?>/gi, "&lt;br&gt;");

           readOnly = cellTd.getAttribute("readOnly");
           _celltype = cellTd.getAttribute("celltype");
           _id = cellTd.getAttribute("id");
           _class = (cellTd.getAttribute("class") != null) ? cellTd.getAttribute("class") : "";
           _name = cellTd.getAttribute("name");
           _toolTip = cellTd.getAttribute("toolTip");
           _displayFormat = cellTd.getAttribute("displayFormat");
           _keyMask = cellTd.getAttribute("keyMask");
           _displayFunction = cellTd.getAttribute("displayFunction");
           _disabledFunction = cellTd.getAttribute("disabledFunction");
           _displayFunctionApply = cellTd.getAttribute("displayFunctionApply");
           _maxLength = cellTd.getAttribute("maxLength");
           _editorMode = cellTd.getAttribute("editorMode");
           _addRowEditable = cellTd.getAttribute("addRowEditable");
           _align = cellTd.getAttribute("align");
           _style = cellTd.getAttribute("style") || "";

           // jQuery: $(_grd).find('.moca_grid_body colgroup').find('col[columnkey='+_id+']');
           var aCol = _grd.querySelector('.moca_grid_body colgroup col[columnkey="' + CSS.escape(_id) + '"]');

           if (aCol) {
             if (com.getDevice() == "pc") {
               //$m.moblePcHide(aCol, "hide");
               if (aCol.getAttribute("hide") == "true") {
                 _style = _style.replace("display: table-cell", "display: none");
               } else {
                 _style = _style.replace("display: none", "display: table-cell");
               }
             } else {
               //$m.moblePcHide(aCol, "mobileHide");
               if (aCol.getAttribute("mobileHide") == "true") {
                 _style = _style.replace("display: table-cell", "display: none");
               } else {
                 _style = _style.replace("display: none", "display: table-cell");
               }

               _mobileWidth = aCol.getAttribute("mobileWidth");
               if (_mobileWidth) {
                 aCol.setAttribute("style", "width:" + _mobileWidth);
               }
             }
           }

           _required = cellTd.getAttribute("required");
           _popupUrl = cellTd.getAttribute("popupUrl");
           _popupData = cellTd.getAttribute("popupData");
           _callFunction = cellTd.getAttribute("callFunction");
           _levelId = cellTd.getAttribute("levelId");
           _labelId = cellTd.getAttribute("labelId");
         }

         var _keyMaskStr = (_keyMask != null) ? _keyMask : "";

         var _level = "";
         if (_levelId != null) _level = (_row[_levelId] + "");

         var _label = "";
         if (_labelId != null) _label = _row[_labelId];

         if (_row["_system"]["status"] == "C" && key != "status" && _addRowEditable != "false") {
           readOnly = "false";
           _toolTip = "false";
         }

         if (_grd.list && _grd.list[_nowIndex] && _grd.list[_nowIndex]["_system"] && _id) {
           var sysCell = _grd.list[_nowIndex]["_system"][_id];
           if (sysCell && sysCell["readonly"] != null) readOnly = sysCell["readonly"];
         }

         // ===== select =====
         if (_celltype == "select") {
           row += '<td id="' + _id + '" class="' + _class + '" name="' + _name + '" toolTip="' + _toolTip + '" celltype="' + _celltype + '" displayFormat="' + _displayFormat + '" keyMask="' + _keyMask + '" displayFunction="' + _displayFunction + '" readOnly="' + readOnly + '"  style="' + _style + '"  >';

           if (_grd[_id] != null) {
             var arr = _grd[_id].list;
             if (arr == null) arr = [];

             var codeOpt = _grd[_id].codeOpt;
             var _allOpt;
             if (codeOpt != null) _allOpt = codeOpt.allOption;

             _grd[_id]["map"] = com.listToMap(arr, codeOpt);

             var _metaInfo;
             if (codeOpt != null) _metaInfo = codeOpt.metaInfo;

             var _codeCd = this.codeCd;
             var _codeNm = this.codeNm;
             if (_metaInfo != null) {
               _codeCd = _metaInfo.codeCd;
               _codeNm = _metaInfo.codeNm;
             }

             var cd = "", nm = "", label = "";
             var selectTag = "";
             var isAllOpt = false;

             if (_allOpt != null) {
               var _reLabel = "";
               if (_allOpt.displayFormat != null && _allOpt.displayFormat != "null") {
                 _reLabel = _allOpt.displayFormat.replace("[value]", _allOpt.value).replace("[label]", _allOpt.label);
               } else {
                 _reLabel = _allOpt.label;
               }
               selectTag = '<input type="text" class="moca_select" style="background-color:pink" readonly value="' + _reLabel + '" onfocus="'+_id+'.openSelect(this)" >';
               cd = _allOpt.value;
               nm = _allOpt.label;
               label = _reLabel;
               isAllOpt = true;
             }

             var selectFlag = false;
             for (var c_d = 0, c_d_l = arr.length; c_d < c_d_l; c_d++) {
               var aData = arr[c_d];
               var _reLabel2 = "";
               var _cd = aData[_codeCd];
               var _nm = aData[_codeNm];

               if (_displayFormat != null && _displayFormat != "null") {
                 _reLabel2 = _displayFormat.replace("[value]", _cd).replace("[label]", _nm);
               } else {
                 _reLabel2 = _nm;
               }

               if (cell == aData[_codeCd]) {
                 selectFlag = true;
                 selectTag = this.getInputSelectTag(_reLabel2, _required);
                 cd = _cd;
                 nm = _nm;
                 label = _reLabel2;
                 break;
               }
             }

             if (!selectFlag) {
               selectTag = this.getInputSelectTag("-선택-", _required);
               if (!isAllOpt) {
                 cd = "";
                 nm = "-선택-";
                 label = nm;
               }
             }

             if (readOnly == "true") {
               row += label;
             } else {
               row += this.getSelectDivTagForCombo(label, _required, cd, nm, ch);
               row += selectTag;
             }
           }

           row += "</div></td>";

         // ===== input =====
         } else if (_celltype == "input") {
           var _reLabel3 = "";
           try {
             if (_displayFunction != null && eval(_displayFunction) != null) {
               _reLabel3 = eval(_displayFunction)(cell, _grd, _row["_system"]["realIndex"], _id);
             } else {
               _reLabel3 = cell;
             }
           } catch (e) {
             console.log("1009:" + e);
           }

           var _inTag = "";
           // jQuery: $(_grd).getAttribute('rendering_div');
           var _renderingDiv = _grd.getAttribute("rendering_div");

           if (_renderingDiv) {
             if (readOnly == "true") {
               _inTag = "<div>" + _reLabel3 + "</div>";
             } else {
               var _req2 = (_required == "true") ? " req" : "";
               _inTag = '<div type="input" class="moca_input' + _req2 + '">' + _reLabel3 + "</div>";
             }
           } else {
             if (readOnly == "true") {
               _inTag = "<div>" + _reLabel3 + "</div>";
             } else {
               var maxLen = String(_maxLength ?? "").trim();
               var cls = (_required == "true") ? "moca_input req" : "moca_input";
               _inTag =
                 '<input type="text" maxLength="' + maxLen + '"' +
                 ' onblur="com.setValue(this,this.value,\'' + _keyMaskStr + '\');"' +
                 ' onkeydown="com.keydown(this,this.value,\'' + _keyMaskStr + '\');"' +
                 " displayFunction='" + (_displayFunction || "") + "'" +
                 " displayFunctionApply='" + (_displayFunctionApply || "") + "'" +
                 ' class="' + cls + '"' +
                 ' style="' + _style + '"' +
                 ' value="' + _reLabel3 + '"' +
                 ' onkeyup="'+_grd.id+'._uptData(this)" onfocus="'+_grd.id+'._evt_selectFocus(this)">';
             }
           }
           row +=
             '<td id="' + _id + '" class="' + _class + '" name="' + _name + '"' +
             ' toolTip="' + _toolTip + '" celltype="' + _celltype + '"' +
             " displayFunction='" + (_displayFunction || "") + "'" +
             " displayFunctionApply='" + (_displayFunctionApply || "") + "'" +
             ' editorMode="' + (_editorMode || "") + '"' +
             ' style="' + _style + '"' +
             ' readOnly="' + readOnly + '"' +
             ' onclick="'+_grd.id+'.defaultCellClick(this)">' +
             _inTag + "</td>";

         // ===== inputButton =====
         } else if (_celltype == "inputButton") {
           var _reLabel4 = "";
           if (_displayFunction != null && eval(_displayFunction) != null) _reLabel4 = eval(_displayFunction)(cell);
           else _reLabel4 = cell;

           var _inTag2 = "";
           var _renderingDiv2 = _grd.getAttribute("rendering_div");

           if (readOnly == "true") {
             _inTag2 = _reLabel4;
           } else {
             _inTag2 = (_required == "true") ? '<div class="moca_ibn req">' : '<div class="moca_ibn">';

             if (_renderingDiv2) {
               _inTag2 += '<div type="text" class="moca_input" readonly style="' + _style + '">' + _reLabel4 + "</div>";
             } else {
               _inTag2 += '<input type="text" class="moca_input" readonly style="' + _style + '" value="' + _reLabel4 + '" onkeyup="this._uptData(this)" onfocus="'+_id+'._evt_selectFocus(this)">';
             }

             if (String(_callFunction ?? "").trim() !== "") {
               _inTag2 += '<button type="button" class="moca_ibn_btn" onclick="' + _callFunction + '(this)" onfocus="'+_id+'._evt_selectFocus(this)">검색</button></div>';
             } else {
               _inTag2 += "</div>";
             }
           }

           row += '<td id="' + _id + '" class="' + _class + '" name="' + _name + '"  toolTip="' + _toolTip + '" celltype="' + _celltype + '" style="' + _style + '"  readOnly="' + readOnly + '">' + _inTag2 + "</td>";

         // ===== button =====
         } else if (_celltype == "button") {
           var btnLabel = cellTd.getAttribute("btnLabel");
           var _reLabel5 = "";
           var isDisabled = "";
           var _isdis = false;

           try {
             if (_disabledFunction != null && eval(_disabledFunction) != null) {
               _isdis = eval(_disabledFunction)(cell, _grd, _row["_system"]["realIndex"]);
               if (_isdis) isDisabled = "disabled";
             }
             _reLabel5 = cell;
           } catch (e) {
             console.log("1132:" + e);
           }

           var _inTag3 = "";
           if (readOnly == "true") {
             _inTag3 = _reLabel5;
           } else {
             if (String(_callFunction ?? "").trim() !== "") {
               _inTag3 = '<div class="grid_btn">';
               _inTag3 += '<button type="button" onclick="' + _callFunction + '(this,\'' + _nowIndex + '\',\'' + _id + '\')" onfocus="'+_id+'._evt_selectFocus(this)" ' + isDisabled + ">" + btnLabel + "</button>";
               _inTag3 += "</div>";
             }
           }

           row += '<td id="' + _id + '" class="' + _class + '" name="' + _name + '"  toolTip="' + _toolTip + '" celltype="' + _celltype + '" style="' + _style + '"  readOnly="' + readOnly + '"  disabledFunction="' + _disabledFunction + '">' + _inTag3 + "</td>";

         // ===== tree =====
         } else if (_celltype == "tree") {
           var _inTag4 = "";
           if (String(_label ?? "").trim() !== "") {
             var icon_folder;
             var preLevel = (_row_pre != null) ? _row_pre[_levelId] : 0;
             var nextLevel = (_row_next != null) ? _row_next[_levelId] : 0;

             if (
               (_level > preLevel && _level == nextLevel) ||
               _level > nextLevel ||
               (_row_pre != null && _row_pre["_system"]["isLeaf"] == "true" && _level == preLevel) ||
               (_row_pre != null && _row_pre["_system"]["isLeaf"] == "true" && _level == preLevel && _level == nextLevel)
             ) {
               icon_folder = "moca_grid_leaf";
               _row["_system"]["isLeaf"] = "true";
             } else {
               var isExp;
               var usetree2 = _grd.getAttribute("usetree");
               if (usetree2 == "true") isExp = _row["_system"]["expand"];
               else isExp = "true";

               icon_folder = (isExp == "false") ? "moca_grid_plus" : "moca_grid_minus";
               _row["_system"]["isLeaf"] = "false";
             }

             var line = "";
             if (_level == 1) {
               line = "";
             } else if (_level == 2) {
               line = (_row["_system"]["isLeaf"] == "true") ? '<div class="moca_grid_last"></div>' : '<div class="moca_grid_midddle"></div>';
             } else {
               var lineNum = _level - 2;
               for (var i2 = 0; i2 < lineNum; i2++) line += '<div class="moca_grid_line"></div>';
               line += (_row["_system"]["isLeaf"] == "true") ? '<div class="moca_grid_last"></div>' : '<div class="moca_grid_midddle"></div>';
             }

             var ct_nm = "";
             if (_level == 1 && cellTd.getAttribute("depth1IconClass") != null) {
               ct_nm = '<span class="category ' + cellTd.getAttribute("depth1IconClass") + '">' + cellTd.getAttribute("depth1IconClass") + "</span>";
             } else if (_level == 2 && cellTd.getAttribute("depth2IconClass") != null) {
               ct_nm = '<span class="category ' + cellTd.getAttribute("depth2IconClass") + '">' + cellTd.getAttribute("depth2IconClass") + "</span>";
             } else if (_level == 3 && cellTd.getAttribute("depth3IconClass") != null) {
               ct_nm = '<span class="category ' + cellTd.getAttribute("depth3IconClass") + '">' + cellTd.getAttribute("depth3IconClass") + "</span>";
             } else if (_level == 4 && cellTd.getAttribute("depth4IconClass") != null) {
               ct_nm = '<span class="category ' + cellTd.getAttribute("depth4IconClass") + '">' + cellTd.getAttribute("depth4IconClass") + "</span>";
             } else if (_level == 5 && cellTd.getAttribute("depth2IconClass") != null) {
               ct_nm = '<span class="category ' + cellTd.getAttribute("depth5IconClass") + '">' + cellTd.getAttribute("depth5IconClass") + "</span>";
             }

             _inTag4 += '<span>' + line + '<div class="' + icon_folder + '" onclick="'+_id+'.grid_expand(this);"></div>' + ct_nm + "<label>" + _label + "</label></span>";
           }

           row += '<td id="' + _id + '" class="' + _class + '" name="' + _name + '"  toolTip="' + _toolTip + '" celltype="' + _celltype + '" style="' + _style + '"  readOnly="' + readOnly + '" class="tal">' + _inTag4 + "</td>";

         // ===== checkbox =====
         } else if (_celltype == "checkbox") {
           var _trueValue = cellTd.getAttribute("trueValue");
           var _falseValue = cellTd.getAttribute("falseValue");

           var _reLabel6 = "";
           var isDisabled2 = "";
           var _isdis2 = false;

           try {
             if (_disabledFunction != null && eval(_disabledFunction) != null) {
               _isdis2 = eval(_disabledFunction)(cell, _grd, _row["_system"]["realIndex"]);
               if (_isdis2) isDisabled2 = "disabled";
             }
             _reLabel6 = cell;
           } catch (e) {
             console.log("1090:" + e);
           }

           var isChecked = (_reLabel6 == _trueValue) ? "checked" : "";
           var _inTag5 = "";

           if (readOnly == "true") {
             _inTag5 = _reLabel6;
           } else {
             _inTag5 = '<div class="moca_checkbox_grid">';
             _inTag5 += '<input type="checkbox" class="moca_checkbox_input" name="cbx" id="cbx_' + this.pageId + "_" + this.srcId + "_" + _grd.id + "_" + _nowIndex + '" grd_id=' + _grd.id + ' value="' + _trueValue + '" ' + isChecked + " " + isDisabled2 + " >";
             _inTag5 += '<label class="moca_checkbox_label" for="cbx_' + this.pageId + "_" + this.srcId + "_" + _grd.id + "_" + _nowIndex + '"  >label</label>';
             _inTag5 += "</div>";
           }

           row += '<td id="' + _id + '" class="' + _class + '" name="' + _name + '"  toolTip="' + _toolTip + '" celltype="' + _celltype + '" style="' + _style + '"  readOnly="' + readOnly + '" trueValue="' + _trueValue + '" falseValue="' + _falseValue + '"  disabledFunction="' + _disabledFunction + '" onclick="'+_grd.id+'.defaultCellClick(this);" >' + _inTag5 + "</td>";

         // ===== radio =====
         } else if (_celltype == "radio") {
           var _reLabel7 = "";
           var isDisabled3 = "";
           var _isdis3 = false;

           try {
             if (_disabledFunction != null && eval(_disabledFunction) != null) {
               _isdis3 = eval(_disabledFunction)(cell, _grd, _row["_system"]["realIndex"]);
               if (_isdis3) isDisabled3 = "disabled";
             }
             _reLabel7 = cell;
           } catch (e) {
             console.log("1090:" + e);
           }

           var _inTag6 = "";
           if (readOnly == "true") {
             _inTag6 = _reLabel7;
           } else {
             _inTag6 = '<div class="moca_radio_grid">';
             var _rdoArr = JSON.parse(cellTd.getAttribute("itemset"));
             for (var r = 0; r < _rdoArr.length; r++) {
               var isChecked2 = (_row["TEST_YN"] == _rdoArr[r].value) ? "checked" : "";
               _inTag6 += '<input type="radio" class="moca_radio" name="rdo__' + this.pageId + "_" + _grd.id + "_" + _nowIndex + '" id="rdo_' + r + "_" + this.pageId + "_" + _grd.id + "_" + _nowIndex + _rdoArr[r].value + '" grd_id=' + _grd.id + ' value="' + _rdoArr[r].value + '" ' + isChecked2 + " " + isDisabled3 + " >";
               _inTag6 += '<label class="moca_radio_label" for="rdo_' + r + "_" + this.pageId + "_" + _grd.id + "_" + _nowIndex + _rdoArr[r].value + '"  >' + _rdoArr[r].label + "</label>";
             }
             _inTag6 += "</div>";
           }

           row += '<td id="' + _id + '" class="' + _class + '" name="' + _name + '"  toolTip="' + _toolTip + '" celltype="' + _celltype + '" style="' + _style + '"  readOnly="' + readOnly + '" disabledFunction="' + _disabledFunction + '" onclick="'+_grd.id+'.defaultCellClick(this);" >' + _inTag6 + "</td>";
         }
       }
     }

     row += "</tr>";
     return row;
   },
	
   _setRowSelection (grd,_tdObj){ 
       ['row select 표시'];
	   var _realIndex = grd.getAttribute("selectedRealRowIndex");

	   if (_realIndex != null && String(_realIndex).trim() !== '') {
	     // tbody:first > tr[realrowindex=...]
	     var foundedRow = grd.querySelectorAll(
	       `tbody > tr[realrowindex="${CSS.escape(String(_realIndex))}"]`
	     );

	     var selectedRow = null;
	     if (foundedRow.length === 1) selectedRow = foundedRow[0];

	     if (selectedRow != null) {
	       var _bgcolor = this.rowSelectedColor;

	       var attrColor = grd.getAttribute("rowselectedcolor");
	       if (attrColor != null && String(attrColor).trim() !== '') {
	         _bgcolor = attrColor;
	       }

	       // 기존 색 초기화: tbody:first의 모든 tr의 모든 셀(td/th)
	       var tbody = grd.querySelector("tbody");
	       if (tbody) {
	         tbody.querySelectorAll("tr > *").forEach(function (cell) {
	           cell.style.backgroundColor = "";
	           cell.style.color = "";
	         });
	       }

	       // 선택된 row 색 적용
	       Array.from(selectedRow.children).forEach(function (cell) {
	         cell.style.backgroundColor = _bgcolor;
	         cell.style.color = "#FFF";
	       });
	     }
	   }

   },
   
   setTotalCnt (_grd,cnt){
          var grd;
          if(typeof _grd == 'string'){
              grd = com.getObj(_grd,null,this.pageId,this.srcId);
          }else{
              grd = _grd;
          }
          grd.totalCnt = cnt;
          if(com.getAttrObj(grd,'paging').type == 'numberList'){
          	this.setNumberListCnt(grd,cnt);
          }
		  const el = grd.querySelector('.grid_total .txt_blue');
		  if (el) {
		    el.innerHTML = com.comma(cnt);
		  }
   },
	  
   setNumberListCnt (_grd,cnt){
          var grd;
          if(typeof _grd == 'string'){
              grd = $m.getObj(_grd,null,this.pageId,this.srcId);
          }else{
              grd = _grd;
          }
          var numListCnt = this.getNumListCnt(grd); //3 
          var _onPageClick = com.getAttrObj(grd,'paging').onPageClick;
          var _pageGroupItemMax = Number(com.getAttrObj(grd,'paging').pageGroupItemMax);
          var _showItemCnt;
          if(_pageGroupItemMax < numListCnt){
          	//총리스트목록 - 보여질목록아이템갯수 0보다 크면 보여질아이템갯수로 보여주고 아닐경우 총리스트목록을보여준다.
          	// var _showItemCnt = Math.ceil(numListCnt/_pagingItemCnt)+1;//3/2
          	 _showItemCnt = _pageGroupItemMax;//3/2  
          }else{
          	 _showItemCnt = numListCnt;
          }
          var a = _grd.querySelector('.moca_grid_paging > .num');
          var aTag = '';
          var currentPage  = this.getCurrentPage(_grd);
          
          if(currentPage == null){
      		currentPage = 1;
      	}

          var startPage = 0;
          if(currentPage%_showItemCnt == 0){
          	startPage = parseInt(currentPage/_showItemCnt-1)*_showItemCnt+1;
          }else{
          	startPage = parseInt(currentPage/_showItemCnt)*_showItemCnt+1;
          }
          
          var lastPage = this.getNumListCnt(grd);
   		for(var i=startPage; i < startPage+_showItemCnt; i++){ 
          	var classon = '';
          	if(currentPage == i){
          		classon = 'class="on" title="현재위치"';
          	}
          	aTag += '<button type=\"button\" '+classon+' onclick=\"'+_grd.id+'.onPageClick(this,'+i+','+_onPageClick+')\" >'+i+'</button>';
          	if(i == lastPage){
           		break;
           	}
          };
      	
          return a.innerHTML = aTag;
     },
	  
	 getNumListCnt (grd){
     	var numListCnt = Math.ceil(grd.totalCnt/com.getAttrObj(grd,'paging').listCntPerPage);
     	return numListCnt;
     },
	 
	 getCurrentPage (_pageButtonOrGridObj){
     	if(_pageButtonOrGridObj == null || _pageButtonOrGridObj.currentPage == null){
     		return 1;
     	}else{
     		return _pageButtonOrGridObj.currentPage;
     	}
     },
		 
	setVirtualScroll (_grd){
	    var _default_cell_height = this.getCellHeight(_grd);

		// thead 높이
		var thead = _grd.querySelector('thead');
		var theadHeight = thead ? thead.getBoundingClientRect().height : 0;

		var fullHeight = _default_cell_height * _grd.list.length + theadHeight;

		// .moca_grid_body
		var div = _grd.querySelector('.moca_grid_body');
		if (div && div.scrollWidth > div.clientWidth && com.getDevice() !== 'mobile') {
		  // 세로 스크롤 +1 row 보정
		  fullHeight += _default_cell_height;
		}

		// 높이 적용
		var heightTarget = _grd.querySelector('#' + CSS.escape(_grd.id + '_grid_height'));
		if (heightTarget) {
		  heightTarget.style.height = fullHeight + 'px';
		}

	},
	
	sFunction (yscroll) { 
	    if(yscroll==null){
	        return;
	    }
	    
        this.pageId = yscroll.getAttribute("pageid");
        this.srcId = yscroll.getAttribute("srcid");
        var _grdId = yscroll.getAttribute("componentid");
        var _grd = com.getObj(_grdId,null,this.pageId,this.srcId);
        var onScrollEnd = _grd.getAttribute('onScrollEnd');
        var _default_cell_height = this.getCellHeight(_grd);


  
        var topPosition = yscroll.scrollTop;
        var startIdx = parseInt(topPosition/_default_cell_height); 
        var remainder= parseInt(topPosition%_default_cell_height); 
        var yscrollIdx = _grd.getAttribute("yscrollIdx");
        if(yscrollIdx == null) yscrollIdx = 0;
            this.setVirtualScroll(_grd);
            
        var isEnd = false;
        

        //세로스크롤처리
		var _offsetHeight = yscroll.offsetHeight;
		var _scrollHeight = yscroll.scrollHeight;
		var _scrollTop = yscroll.scrollTop;
		if(_offsetHeight > _scrollHeight){
			_scrollHeight = _offsetHeight;
		}
		//console.log('remainder'+remainder);
        if ((yscroll.offsetHeight != _scrollHeight) && yscroll.offsetHeight + yscroll.scrollTop >= _scrollHeight && remainder > 0) {
            isEnd = true;
            this.genTbody(_grd,_grd.list,startIdx+1,false);//0번째라인이 일부를 보여줄수없으므로 마지막한라인더 보여줘야 다 보여줄수있음
        }else{
        	this.genTbody(_grd,_grd.list,startIdx,false);//마지막스크롤이 아니면 정상적인 인덱스로 보여줘야함
        }
            
        if(isEnd){
            var func = eval(onScrollEnd);
            if(func != null){
                func(function(){
                    var topPosition = yscroll.scrollTop;
                    var startIdx = parseInt(Math.ceil(topPosition/_default_cell_height)); 
                    var yscrollIdx = _grd.getAttribute("yscrollIdx");
                    if(yscrollIdx == null) yscrollIdx = 0;
                    
                    this.setVirtualScroll(_grd);
                    this.genTbody(_grd,_grd.list,startIdx+1,true);////0번째라인이 일부를 보여줄수없으므로 마지막한라인더 보여줘야 다 보여줄수있음
                });
            }
        }

	},  
	
	wFunction (yscroll) {
	    //var _grd = document.getElementById(yscroll.getAttribute("componentid"));
	    
	    var _grd = com.getObj(yscroll.getAttribute("componentid"));
	    var _default_cell_height = this.getCellHeight(_grd);
	    var val  =0;
	    if (event.deltaY < 0) {
	        val = yscroll.scrollTop - _default_cell_height;
	    }else{
	        val = yscroll.scrollTop + _default_cell_height;
	    }
	    try{
	        //yscroll.scrollTo(0,val);//IE 비호환API
	        yscroll.scrollTop = val;
	    }catch(e){
	        console.log('wFunction error:',e);
	    }
	},
	
	fn_display_rownum (_value,_grd,_rowIndex){ 
	    ['순번 '];
	    return com.comma(Number(_rowIndex)+1)+"";
	},
	
	//태그정의
	getInputSelectTag (_label,_req){
	    ['getInputSelectTag for grid cell'];
	    if(_req == "true"){
	        _req = "req";
	    }else{
	        _req = "";  
	    }
	    var selectTag = '<input type="text" class="moca_select '+_req+'" readonly value="'+_label+'" onclick="'+this.id+'.openSelect(this)" >';//onfocus="$m._evt_selectFocus(this)"
	    return selectTag;
	},

	_detailView1 (_thisObj) {
	    var _type = com.getType(_thisObj); 
	    var grd = com.getTypeObj(_thisObj);
	    this._detailViewContentCopy(_thisObj);
	    grd.getAttribute('selectedDetailView',1);
	    var selectedRealRowIndex = grd.getAttribute("selectedRealRowIndex");
	    if(selectedRealRowIndex != null){
	        var foundedRow = grd.querySelector('tbody > tr[realrowindex="' + selectedRealRowIndex + '"]');
	        var tdArr = foundedRow.querySelectorAll('td');
	        this.removeCol(tdArr);
	        var _html = '';
	        for(var i=0;i < tdArr.length; i++){
	            var aTd = tdArr[i];
	            _html +='           <tr realrowindex='+selectedRealRowIndex+'> ';
	            _html += this._detailViewMakeTd(aTd);
	            _html +='           </tr> ';
	        }
	        
	        grd.querySelector('#gridDetail2').innerHTML = '';
	        grd.querySelector('#gridDetail3').innerHTML = ''
	        grd.querySelector('#gridDetail1').innerHTML = _html;
	        _thisObj.closest("div[type="+_type+"]").querySelector(".gridDetail_body").style.display = 'block'; 
	    }else{
	        com.alert("상세보기할 행을 선택하세요!");
	    }

	},
	_detailView2 (_thisObj) {
	    var _type = com.getType(_thisObj); 
	    var grd = com.getTypeObj(_thisObj);
	    this._detailViewContentCopy(_thisObj);
	    grd.getAttribute('selectedDetailView',2);
	    
	    var selectedRealRowIndex = grd.getAttribute("selectedRealRowIndex");
	    var foundedRow = grd.querySelector('tbody > tr[realrowindex="' + selectedRealRowIndex + '"]');
	    var tdArr = foundedRow.querySelectorAll('td');
	    this.removeCol(tdArr);
	    var _html = '';
	    
	    for(var i=0;i < tdArr.length;){
	        _html +='           <tr realrowindex='+selectedRealRowIndex+'> ';
	        
	        var aTd = tdArr[i];
	        _html += this._detailViewMakeTd(aTd);
	        if(i+1 < tdArr.length){
	            var aTd = tdArr[i+1];

	            _html += this._detailViewMakeTd(aTd);
	        }else{
	            _html +='               <th><label></label></th> ';
	            _html +='               <td></td> ';
	        }
	        _html +='           </tr> ';
	        i = i+2;
	    }
		grd.querySelector('#gridDetail1').innerHTML = '';
        grd.querySelector('#gridDetail3').innerHTML = ''
        grd.querySelector('#gridDetail2').innerHTML = _html;
	    _thisObj.closest("div[type="+_type+"]").find(".gridDetail_body").css('display','block'); 
	},
	
	_detailView3 (_thisObj) {
	    var _type = com.getType(_thisObj); 
	    var grd = com.getTypeObj(_thisObj);
	    this._detailViewContentCopy(_thisObj);
	    grd.getAttribute('selectedDetailView',3);
	    var selectedRealRowIndex = grd.getAttribute("selectedRealRowIndex");
	    var foundedRow = grd.querySelector('tbody > tr[realrowindex="' + selectedRealRowIndex + '"]');
	    var tdArr = foundedRow.querySelectorAll('td');
	    this.removeCol(tdArr);
	    var _html = '';
	    for(var i=0;i < tdArr.length;){
	        _html +='           <tr realrowindex='+selectedRealRowIndex+'> ';
	        
	        var aTd = tdArr[i];
	        _html += this._detailViewMakeTd(aTd);
	        i = i+1;
	        if(i < tdArr.length){
	            var aTd = tdArr[i];
	            _html += this._detailViewMakeTd(aTd);
	        }else{
	            _html +='               <th><label></label></th> ';
	            _html +='               <td></td> ';
	            _html +='               <th><label></label></th> ';
	            _html +='               <td></td> ';    
	            break;
	        }
	        i = i+1;
	        if(i < tdArr.length){
	                var aTd = tdArr[i];
	                _html += this._detailViewMakeTd(aTd);
	        }else{
	            _html +='               <th><label></label></th> ';
	            _html +='               <td></td> ';
	            break;
	        }
	        _html +='           </tr> ';
	        i = i+1;
	    }
		grd.querySelector('#gridDetail1').innerHTML = '';
        grd.querySelector('#gridDetail2').innerHTML = ''
        grd.querySelector('#gridDetail3').innerHTML = _html;
	    _thisObj.closest("div[type="+_type+"]").find(".gridDetail_body").css('display','block');     
	    
	},
	
	_detailViewMakeTd (aTd) {
	    var _html = '';
	    var isContentEditable = false;
	    var contents = '';
		let ipt = aTd.querySelector('input[type="text"');

		if (ipt && !ipt.classList.contains('moca_select')) {
		  isContentEditable = true;
		  contents = ipt.value.replace(/\r?\n/g, '<br>');
		} else {
		  contents = aTd.innerHTML.replace(/\r?\n/g, '<br>');
		}

	    _html +='               <th><label>'+aTd.getAttribute("name")+'</label></th> ';
	    _html +='               <td><div id='+aTd.getAttribute("id")+' contenteditable="'+isContentEditable+'" placeholder="">'+contents+'</div></td> ';
	    return _html;
	},
	
	_detailViewContentCopy (_thisObj) {
		var _gridDetailNum = 'gridDetail1';

		// 1) 버튼 on 클래스 초기화
		document.querySelector('.button.colTh1').classList.remove('on');
		document.querySelector('.button.colTh2').classList.remove('on');
		document.querySelector('.button.colTh3').classList.remove('on');

		// 2) 클릭된 버튼에 따라 on 클래스 추가
		if (_thisObj.classList.contains('colTh1')) {
			document.querySelector('.button.colTh1').classList.add('on');
		} else if (_thisObj.classList.contains('colTh2')) {
			document.querySelector('.button.colTh2').classList.add('on');
		} else if (_thisObj.classList.contains('colTh3')) {
			document.querySelector('.button.colTh3').classList.add('on');
		}

		// 3) 타입/그리드 객체
		var _type = com.getType(_thisObj);
		var _grid = com.getTypeObj(_thisObj); // DOM element라고 가정

		// jQuery: _grid.attr('selectedDetailView')
		var selectedDetailView = _grid ? _grid.getAttribute('selectedDetailView') : null;

		if (selectedDetailView != null) {
		  _gridDetailNum = 'gridDetail' + selectedDetailView;

		  var dbody = _grid.querySelector('.gridDetail_body');
		  if (!dbody) return;

		  // jQuery: dbody.find('#'+_gridDetailNum).find('td')
		  var detailTable = dbody.querySelector('#' + _gridDetailNum); 
		  var tds = detailTable ? detailTable.querySelectorAll('td') : [];

		  for (var i = 0; i < tds.length; i++) {
		    var aTd = tds[i];

		    var aTr = aTd.closest('tr');

		    var aDiv = aTd.querySelector('div[contenteditable="true"]');
		    if (aDiv) {
		      // jQuery: aDiv.html()
		      var cont = aDiv.innerHTML;
		      cont = cont
		        .replace(/<\/div>/g, '')
		        .replace(/<div>|<br>/g, '\n');

		      // jQuery: aTr.attr('realrowindex')
		      var realRowIndex = aTr ? aTr.getAttribute('realrowindex') : null;

		      // jQuery: $(aTd).prev().find('label').attr("id")
		      var prevTd = aTd.previousElementSibling;
		      var label = prevTd ? prevTd.querySelector('label') : null;
		      var colid = label ? label.getAttribute('id') : null;

		      var grd = _grid; // DOM

		      if (grd && realRowIndex != null && colid != null) {
		        this.setCellData(grd, realRowIndex, colid, cont);
		      }
		    }
		  }
		} else {
		  console.log('selectedDetailView', selectedDetailView);
		}

	},
	
	_detailViewClose (_thisObj) {
	    this._detailViewContentCopy(_thisObj);
	    var _type = com.getType(_thisObj)
	    var _grid = com.getTypeObj(_thisObj)
	    var dbody = _grid.querySelector(".gridDetail_body");
	    dbody.style.display ='none';
	},
	
	openSelect (_thisObj){
	    ['grid cell selectbox동적열기'];
	    var grd = _thisObj.closest('div[type="grid"]');
	    var cellTd = _thisObj.closest('td');
	    var _displayFormat = cellTd.getAttribute("displayFormat");
	    var _displayFunction = cellTd.getAttribute("displayFunction");
	    
	    var colid = cellTd.id;
	    
	    var _tbody = _thisObj.closest('tbody');
	    var _thisTr = _thisObj.closest('tr');
	    var rowIndex = [..._tbody.children].indexOf(_thisTr);

	    
	    var _index = rowIndex;
	    var _realIndex = -1;
	    var _startIndex = grd.getAttribute("yscrollIdx");
	    if(_startIndex > -1){
	        _realIndex = rowIndex +parseInt(_startIndex);
	    }
	    grd.setAttribute("selectedRealRowIndex",_realIndex);
	    //grd.setAttribute("selectedRowIndex",rowIndex);
	    
	    
	    var realRowIndex = grd.getAttribute("selectedRealRowIndex");
	    var combo_div = _thisObj.parentElement;
	    var _html = '';
	    _html += this.getSelectTagForCombo(grd.id); 
	    
	    var selectList = grd[_thisObj.parentElement.parentElement.id];
	    var list = selectList.list;
	    var codeOpt = selectList.codeOpt;
	    var _metaInfo = codeOpt.metaInfo;
	    var _codeCd = this.codeCd;
	    var _codeNm = this.codeNm;
	    if(_metaInfo != null){
	        _codeCd = _metaInfo.codeCd;
	        _codeNm = _metaInfo.codeNm;
	    }
	    var thiscd = _thisObj.parentElement.getAttribute("cd");
	    
	    if(codeOpt.allOption != null){
	        var nm = codeOpt.allOption.label;
	        var cd = codeOpt.allOption.value;
	        var label;
	        if(_displayFormat != null && _displayFormat != 'null' && _allOpt != null && _allOpt.value != ''){
	            label = _displayFormat.replace('[value]',cd).replace('[label]',nm);
	        }else{
	            label = nm;
	        }
	        
	        var _selected = "";
	        if(thiscd == cd){
	            _selected = "selected";
	        }       
	        _html += '<option value="'+cd+'" '+_selected+'>'+label+'</option>';
	    }
	    for(var i=0; i < list.length; i++){
	        var json = list[i];
	        
	        var label;
	        if(_displayFormat != null && _displayFormat != 'null' && json[_codeCd] != ''){
	            label = _displayFormat.replace('[value]',json[_codeCd]).replace('[label]',json[_codeNm]);
	        }else{
	            label = json[_codeNm];
	        }
	        var _selected = "";
	        if(thiscd == json[_codeCd]){
	            _selected = "selected";
	        }
	        _html += '<option value="'+json[_codeCd]+'" '+_selected+'>'+label+'</option>';
	    }
	    _html += '</select>';
	    combo_div.innerHTML = _html;
	    this.setCellData(grd,realRowIndex,colid,combo_div.children[0].value);
	    this._selectFocus(combo_div);
	},
	getSelectDivTagForCombo (_label,_req,_cd,_nm,_height){
	    ['getSelectDivTagForCombo for grid cell'];
	    if(_req == "true"){
	        _req = "req";
	    }else{
	        _req = "";  
	    }   
	    var combo_div = '<div class="moca_combo '+_req+'" style="height:'+_height+'px" cd="'+_cd+'" nm="'+_nm+'" label="'+_label+'">';
	    return combo_div;
	},

	getCellData (grd,rowIndex,colid,_pageId,_srcId){
	    ['grid cell getCellData'];
	    if(colid == 'status'){
	        return grd.list[parseInt(rowIndex)]["_system"][colid];
	    }else{
	        return grd.list[parseInt(rowIndex)][colid];
	    }
	},
	
	setCellData (_grd, _realRowIndex, _colId, _data) {
	  ['grid setCellData'];

	  // 1) 데이터 반영
	  if (_colId === 'status') {
	    _grd.list[_realRowIndex]["_system"][_colId] = _data;
	  } else {
	    _grd.list[_realRowIndex][_colId] = _data;
	  }

	  // 2) targetRow 찾기: tbody:first > tr[realrowindex=...]
	  var targetRow = _grd.querySelector(
	    'tbody > tr[realrowindex="' + CSS.escape(String(_realRowIndex)) + '"]'
	  );

	  var _renderingDiv = _grd.getAttribute('rendering_div');

	  // 3) 셀 렌더링 업데이트
	  if (targetRow && _grd.cellInfo && _grd.cellInfo[_colId] != null) {
	    var celltype = _grd.cellInfo[_colId].getAttribute('celltype');

	    if (celltype === 'inputButton') {
	      if (_renderingDiv) {
	        var textDiv = targetRow.querySelector(
	          'td[id="' + CSS.escape(_colId) + '"] div[type="text"]'
	        );
	        if (textDiv) {
	          var v = _grd.list[_realRowIndex][_colId];
	          textDiv.setAttribute('value', v);
	          textDiv.innerHTML = v;
	        }
	      } else {
	        var ipt = targetRow.querySelector('td[id="' + CSS.escape(_colId) + '"] input');
	        if (ipt) ipt.value = _grd.list[_realRowIndex][_colId];
	      }

	    } else if (celltype === 'input') {
	      if (_renderingDiv) {
	        var td = targetRow.querySelector('td[id="' + CSS.escape(_colId) + '"]');
	        if (td && td.getAttribute('readonly') === 'true') {
	          // readonly면 div에 표시만
	          var divAny = td.querySelector('div');
	          if (divAny) divAny.innerHTML = _data;
	        } else {
	          var divInput = targetRow.querySelector(
	            'td[id="' + CSS.escape(_colId) + '"] div[type="input"]'
	          );

	          if (divInput) {
	            divInput.setAttribute('value', _data);

	            var _iptTag = divInput.querySelector('input');
	            var _displayFunctionApply = td ? td.getAttribute('displayFunctionApply') : null;
	            var _editormode = td ? td.getAttribute('editormode') : null;

	            if (_editormode === 'true' || com.getDevice() === 'mobile') {
	              divInput.innerHTML = _data;
	            } else if (_displayFunctionApply === 'realtime' && _iptTag) {
	              _iptTag.value = _data;
	            }
	          }
	        }
	      } else {
	        var iptObj = targetRow.querySelector('td[id="' + CSS.escape(_colId) + '"] input');
	        if (iptObj) {
	          iptObj.value = _data;
	        } else {
	          var td2 = targetRow.querySelector('td[id="' + CSS.escape(_colId) + '"]');
	          if (td2) td2.innerHTML = _data;
	        }
	      }
	    }
	  }

	  // 4) status(U/C/빈값) 갱신 로직 (원본 유지)
	  var oriVal = this.getCellOriData(_grd, _realRowIndex, _colId);
	  if (oriVal === undefined) oriVal = "";

	  if (_data == null || _data === "null") _data = "";

	  var statusTd = targetRow
	    ? targetRow.querySelector('td[id="status"]')
	    : null;

	  if (!(_data === "0" && oriVal === "") && oriVal != _data) {
	    var status_now = this.getCellData(_grd, _realRowIndex, 'status');
	    if (status_now !== 'C') {
	      if (_colId === "status") {
	        _grd.list[_realRowIndex]["_system"]['status'] = _data;
	        if (statusTd) statusTd.innerHTML = _data;
	      } else {
	        _grd.list[_realRowIndex]["_system"]['status'] = 'U';
	        if (statusTd) statusTd.innerHTML = 'U';
	      }
	    }
	  } else {
	    var status_now2 = this.getCellData(_grd, _realRowIndex, 'status');
	    if (status_now2 !== 'C') {
	      var cellArray = Object.keys(_grd.cellInfo || {});
	      var flag = true;

	      for (var i = 0; i < cellArray.length; i++) {
	        var cl = cellArray[i];
	        if (cl !== 'status') {
	          var ov = _grd.ori_list[_realRowIndex][cl];
	          var currentVal = _grd.list[_realRowIndex][cl];

	          if (ov === undefined) ov = "";
	          if (currentVal == null || currentVal === "null") currentVal = "";

	          if (!(currentVal === "0" && ov === "") && ov != currentVal) {
	            flag = false;
	            break;
	          }
	        }
	      }

	      if (flag) {
	        _grd.list[_realRowIndex]["_system"]['status'] = '';
	        if (statusTd) statusTd.innerHTML = '';
	      }
	    }
	  }
	},
	
	_excel_down (_thisObj) {
	    ['Ajax버전의 파일다운로드 함수'];
	    var _type = com.getType(_thisObj)
	    var grd = com.getTypeObj(_thisObj)
	    var cellInfo = {};
	    var ks = Object.keys(grd.cellInfo);
	    var _keyNmArr =[];
	    for(var i=0,j=ks.length;i < j; i++){
	        var key = ks[i];
	        var cellTd = grd.cellInfo[key];
	        if(cellTd.getAttribute("excelIndex")){
	        	if(cellTd.getAttribute("celltype")=="select" && grd.getAttribute("exdn_withLabel") != 'false'){
	        		var _keynm = key+"_nm";
	        		cellInfo[key] = cellTd.getAttribute("name");
	        		var _keyJson = {
	        			"_keycd":key,
	        			"_keynm":cellTd.getAttribute("name")+"_NAME"
	        		};
	        		_keyNmArr.push(_keyJson);
	        	}else{
	        		 cellInfo[key] = cellTd.getAttribute("name");
	        	}
	        }
	    }
	    for(var k=0;k<_keyNmArr.length;k++){
	    	var _label = _keyNmArr[k]._keycd+"_nm";
	    	cellInfo[_label] = _keyNmArr[k]._keynm;
	    }
	   
	    
	    var aTd;
	    var _nm;
	    var _cd;
	    var _selectArr = [];
	    for(var bb=0; bb<ks.length; bb++){
	    	aTd = grd.cellInfo[ks[bb]];
	    	if(aTd.getAttribute("celltype") == "select"){
	    		_selectArr.push(aTd);
	    	}
	    }
	    if(_selectArr.length > 0 && grd.getAttribute("exdn_withLabel") != 'false'){
	    	grd.excelList = [...grd.list];
	    	 for(var i = 0; i<grd.excelList.length;i++){
	    		 for(var ii=0; ii<_selectArr.length; ii++){
	    			 aTd = _selectArr[ii];
	    			 _cd = grd.excelList[i][aTd.id];
	    	 		 var _idnm = aTd.id+"_nm";
	    	         var codeOpt = grd[aTd.id].codeOpt;
	    	         _nm = grd[aTd.id]["map"][_cd];
	    	         grd.excelList[i][_idnm]=_nm;
	    		 }
	    		
	    	 }
	    }
	   
	    var list = [...grd.list];
	    if(grd.excelList != null){
	    	list = grd.excelList;
	    }
	    if(list.length == 0){
	    	 com.alert("다운로드할 데이터가 없습니다.");
	    	 return;
	    }
	    var _parammap = {};
	    _parammap['cellInfo'] = cellInfo;
	    _parammap['list'] = list;
	    
	    var array = list;
	    var str = '';
	    var line_h = '';
	    function escapeVal(v) {
	        return '"' + v.replace('"', '""') + '"';
	    }
	    for (var hkey in cellInfo) {
	        var v = cellInfo[hkey]+"";
	        if(v == null || v == 'null'){
	            v = "";
	        }
	        line_h += v + ",";
	    }
	    line_h.slice(0,line_h.Length-1);
	    str += line_h + '\r\n';
	    
	    for (var i = 0; i < array.length; i++) {
	                var line = '';
	                
	                for (var hkey in cellInfo) {
	                    var v = array[i][hkey]+"";
	                    
	                    if(v == null || v == 'null' || v == 'undefined'){
	                        v = "";
	                    }else{
	                        if(v.length == 13 && com.isNumeric(v) && hkey != "FILE_ID"){
	                            v = com.longToDate(v);
	                        }else if(hkey == "FILE_ID"){
	                            v = ""+v+"_";
	                        }
	                        v = escapeVal(v);
	                    }
	                    line += v + ",";
	                }
	                
	                line.slice(0,line.Length-1);
	                str += line + '\r\n';
	    }
	    var ReportTitle= grd.getAttribute('label');
	    var fileName = grd.closest('div[type="frame"]').getAttribute('src').replace(/.*\/|\.html/g, '')+"_";
	    fileName += ReportTitle.replace(/ /g,"_");   
	    fileName = fileName + ".csv";


	    if(navigator.appVersion.toString().indexOf('.NET') > 0){
	        var xData = new Blob(["\ufeff"+str], { type: 'text/csv' });
	        window.navigator.msSaveBlob(xData,fileName);
	    }else{
	        var xData = new Blob(["\ufeff"+str], { type: 'text/csv' });
	        var uri = window.URL.createObjectURL(xData);

	        var link = document.createElement("a");    
	        link.href = uri;
	        link.style = "visibility:hidden";
	        link.download = fileName;
	        document.body.appendChild(link);
	        link.click();
	        document.body.removeChild(link);
	    }
	},

	_fullScreenGrid(_thisObj){
		var _pageid = _thisObj.getAttribute("pageid");
		var _srcid  = _thisObj.getAttribute("srcid");

		var g = _thisObj.parentElement?.parentElement?.parentElement; // 원래대로 3단계 위
		var fs = _thisObj.getAttribute("full_screen");

		if (g) {
		  if (fs == null || fs === "false") {
		    _thisObj.setAttribute("full_screen", "true");

		    var _height = getComputedStyle(g).height;

		    g.height = _height; // DOM 커스텀 프로퍼티로 저장(원본 동작 유지)

		    g.classList.add("overlayer");

		    _thisObj.classList.remove("grid_full");
		    _thisObj.classList.add("grid_default");

		    g.style.height = "";
		  } else {
		    _thisObj.setAttribute("full_screen", "false");

		    g.classList.remove("overlayer");

		    _thisObj.classList.remove("grid_default");
		    _thisObj.classList.add("grid_full");

		    if (g.height != null) {
		      g.style.height = g.height; // 원래 저장해둔 height 복원
		    }
		  }
		}

		// ----- scrollY 객체 찾기 (jQuery selector 대체) -----
		var grdkey = _thisObj.getAttribute("grdkey");

		// 원래 selector:
		// $('.moca_scrollY_type1[id='+grdkey+'_moca_scroll_y][pageid='+_pageid+'][srcid='+_srcid+']')
		var sel =
		  `.moca_scrollY_type1` +
		  `[id="${CSS.escape(grdkey + '_moca_scroll_y')}"]` +
		  `[pageid="${CSS.escape(_pageid || '')}"]` +
		  `[srcid="${CSS.escape(_srcid || '')}"]`;

		var yscrollObj = document.querySelector(sel);

		this.sFunction(yscrollObj);

	},
	
	_uptData (_thisObj) {
	  ['에디팅데이터 실시간 dataList에 반영'];

	  this._selectFocus(_thisObj);

	  // ===== jQuery -> DOM =====
	  var grd = (_thisObj instanceof Element) ? _thisObj.closest('div[type="grid"]') : null;
	  if (!grd) return;

	  var td = (_thisObj instanceof Element) ? _thisObj.closest('td') : null;
	  var colid = td ? td.id : null;

	  var tbody = (_thisObj instanceof Element) ? _thisObj.closest('tbody') : null;
	  var tr = (_thisObj instanceof Element) ? _thisObj.closest('tr') : null;

	  // jQuery: rowIndex = _tbody.children().index(_thisTr);
	  var rowIndex = -1;
	  if (tbody && tr) rowIndex = Array.prototype.indexOf.call(tbody.children, tr);

	  var realRowIndex = grd.getAttribute("selectedRealRowIndex");

	  var _thisEvtObj;

	  // event.srcElement 대체 (브라우저 호환)
	  var evt = (typeof event !== 'undefined') ? event : null;
	  var srcEl = evt ? (evt.target || evt.srcElement) : null;

	  if (_thisObj && _thisObj.tagName === "TD") {
	    this._selectFocus(_thisObj);

	    // TD 안 체크박스 토글
	    var chkbox = _thisObj.querySelector(".moca_checkbox_grid>input");
	    if (chkbox) {
	      _thisObj = chkbox;
	      _thisObj.checked = !_thisObj.checked;
	    }

	    // TD 안 라디오 클릭(이벤트 타겟 기억)
	    var rdobox = _thisObj.querySelector(".moca_radio_grid>input");
	    if (rdobox) {
	      _thisEvtObj = srcEl;
	    }
	  }

	  // ===== checkbox 처리 =====
	  if (_thisObj && _thisObj.type === "checkbox") {
	    var allCheckbox = grd.querySelector('input[name="cbxAll"]');

	    var arr_all = grd.querySelectorAll('td input[type="checkbox"]');
	    var arr_checked = grd.querySelectorAll('td input[type="checkbox"]:checked');

	    if (allCheckbox) {
	      if (arr_all.length === arr_checked.length && arr_all.length !== 0) {
	        allCheckbox.checked = true;
	        allCheckbox.indeterminate = false;
	      } else if (arr_all.length === 0) {
	        allCheckbox.checked = false;
	        allCheckbox.indeterminate = false;
	      } else {
	        allCheckbox.checked = false;
	        allCheckbox.indeterminate = (arr_checked.length !== 0);
	      }
	    }

	    if (_thisObj.checked) {
	      var vTrue = td ? td.getAttribute("trueValue") : null;
	      if (vTrue == null) vTrue = "true";
	      this.setCellData(grd, realRowIndex, colid, vTrue);
	    } else {
	      var vFalse = td ? td.getAttribute("falseValue") : null;
	      this.setCellData(grd, realRowIndex, colid, vFalse);
	    }
	    return;
	  }

	  // ===== radio 처리 =====
	  if (_thisEvtObj != null && _thisEvtObj.type === "radio") {
	    if (_thisEvtObj.checked) {
	      var _value = _thisEvtObj.value;
	      this.setCellData(grd, realRowIndex, colid, _value);
	    }
	    return;
	  }

	  // jQuery: $(_thisEvtObj).prev()...
	  if (_thisEvtObj instanceof Element) {
	    var prev = _thisEvtObj.previousElementSibling;
	    if (prev && prev.type === "radio" && prev.checked) {
	      var _value2 = prev.value;
	      this.setCellData(grd, realRowIndex, colid, _value2);
	      return;
	    }
	  }

	  // ===== TD 클릭 처리 =====
	  if (_thisObj && _thisObj.tagName === "TD") {
	    var inputInTd = _thisObj.querySelector("input");
	    if (inputInTd) {
	      // jQuery: .getAttribute('value') (속성) vs .value(현재값)
	      // 원본은 getAttribute('value')를 썼으니 동일하게 attribute 우선
	      var _value3 = inputInTd.getAttribute("value");
	      if (_value3 == null) _value3 = inputInTd.value;
	      this.setCellData(grd, realRowIndex, colid, _value3);
	    } else {
	      var _value4 = _thisObj.innerHTML;
	      this.setCellData(grd, realRowIndex, colid, _value4);
	    }
	    return;
	  }

	  // ===== input 등 일반 요소 처리 =====
	  var displayfunctionValue = (_thisObj instanceof Element) ? _thisObj.getAttribute("displayfunction") : null;
	  var displayFunctionApplyValue = (_thisObj instanceof Element) ? _thisObj.getAttribute("displayFunctionApply") : null;

	  if (displayfunctionValue.trim() !== '' && displayFunctionApplyValue.trim() === 'realtime') {
	    var reValue = eval(displayfunctionValue)(_thisObj.value);
	    this.setCellData(grd, realRowIndex, colid, reValue);
	  } else {
	    this.setCellData(grd, realRowIndex, colid, _thisObj.value);
	  }
	},

	grid_expand (_thisObj) {
	  ['grid_tree expand'];

	  var trObj;
	  if (_thisObj && _thisObj.tagName === 'TR') {
	    trObj = _thisObj;
	  } else {
	    trObj = _thisObj ? _thisObj.closest('tr') : null; // jQuery closest 대체
	  }
	  if (!trObj) return;

	  var realRowInfo = this.getRealRowInfo(trObj);
	  var _realIndex = realRowInfo.realRowIndex;
	  var _grd = realRowInfo.grd;

	  this.grid_expand_loop(_grd, _realIndex, null, 1);
	  this.grid_redraw(_grd);
	},
	
	defaultCellClick (_thisObj) {
	  // event.preventDefault();

	  // celltype 체크
	  var celltype = _thisObj ? _thisObj.getAttribute('celltype') : null;

	  // input + input태그 있으면 종료
	  if (celltype === 'input' && _thisObj.querySelectorAll('input').length > 0) {
	    return;
	  }

	  // input + div[type="input"] 있으면 편집모드 처리
	  if (celltype === 'input' && _thisObj.querySelectorAll('div[type="input"]').length > 0) {
	    var _divObj = _thisObj.querySelector('div[type="input"]');
	    var _value = _divObj ? _divObj.innerHTML : '';
	    var _grd = _thisObj.closest('div[type="grid"]');

	    var cellTd = _thisObj;
	    var _keyMaskStr = '';
	    var _editorMode = cellTd.getAttribute('editormode')?.trim()||"";
	    var _keyMask = cellTd.getAttribute('keyMask')?.trim()||"";
	    var _displayfunction = cellTd.getAttribute('displayfunction')?.trim()||"";
	    var _displayfunctionapply = cellTd.getAttribute('displayfunctionapply')?.trim()||"";

	    if (_keyMask != null) _keyMaskStr = _keyMask;

	    var _thNm = '';
	    if (_grd) {
	      var ths = _grd.querySelectorAll('thead th');
	      if (ths && ths[_thisObj.cellIndex]) _thNm = (ths[_thisObj.cellIndex].textContent || '');
	    }

	    if (com.getDevice() == 'mobile') {
	      if (String(_editorMode || '').trim() !== '') {
	        com.popup({
	          type: "POPUP",
	          modal: "true",
	          url: '/moca/comp/COMP_EDIT.html',
	          title: _thNm,
	          data: {
	            value: _value,
	            grdId: _grd ? _grd.id : '',
	            tdId: _thisObj.id,
	            pageId: _grd ? _grd.getAttribute("pageid") : '',
	            srcId: _grd ? _grd.getAttribute("srcid") : '',
	            scopeId: _grd ? _grd.getAttribute("pageid") : ''
	          }
	        });
	      } else {
	        $m.zoomInput(_thisObj, _grd, _value);
	      }
	    } else {
	      if (String(_editorMode || '').trim() !== '') {
	        $m.popup({
	          type: "POPUP",
	          modal: "true",
	          url: '/moca/comp/COMP_EDIT.html',
	          title: _thNm,
	          data: {
	            value: _value,
	            grdId: _grd ? _grd.id : '',
	            tdId: _thisObj.id,
	            pageId: _grd ? _grd.getAttribute("pageid") : '',
	            srcId: _grd ? _grd.getAttribute("srcid") : '',
	            scopeId: _grd ? _grd.getAttribute("pageid") : ''
	          }
	        });
	      } else {
				_divObj.innerHTML = "<input type='text' onkeyup=\""+_grd.id+"._uptData(this)\" displayFunction=\'"+_displayfunction+"\'  displayFunctionApply=\'"+_displayfunctionapply+"\' onblur=\""+_grd.id+".setDivTag(this,this.value,\'"+_keyMaskStr+"\');\"  value='"+_value+"'/>";
	      }
	    }
	  }

	  // ===== 아래는 클릭 처리/데이터 반영 =====
	  var grd = _thisObj ? _thisObj.closest('div[type="grid"]') : null;
	  if (!grd) return;

	  var selectedRealRowIndex = this.getAttribute("selectedRealRowIndex");

	  var _thisTd = _thisObj.closest('td');
	  var colId = _thisTd ? _thisTd.id : null;
	  this.nowColId = colId;

	  var _tbody = _thisObj.closest('tbody');
	  var _thisTr = _thisObj.closest('tr');

	  var realRowIndex = _thisTr ? Number(_thisTr.getAttribute("realrowindex")) : NaN;

	  // jQuery: _tbody.children().index(_thisTr)
	  var rowIndex = -1;
	  if (_tbody && _thisTr) rowIndex = Array.prototype.indexOf.call(_tbody.children, _thisTr);

	  selectedRealRowIndex = grd.getAttribute("selectedRealRowIndex");

	  var onBeforeClickStr = grd.getAttribute("onBeforeClick");
	  var onAfterClickStr = grd.getAttribute("onAfterClick");

	  var pro = Promise.resolve();

	  if (onBeforeClickStr != "" && onBeforeClickStr != null) {
	    pro = pro.then(function () {
	      return eval(onBeforeClickStr)(grd, realRowIndex, colId);
	    });
	  }

	  pro = pro.then(function () {
	    return grd._uptData(_thisObj);
	  });

	  if (onAfterClickStr != "" && onAfterClickStr != null) {
	    pro = pro.then(function () {
	      return eval(onAfterClickStr)(grd, realRowIndex, colId);
	    });
	  }

	  return pro;
	},
	
	_evt_selectFocus (_thisObj){
	    ['focus이벤트에서 포커스배경색주기'];
	    this._selectFocus(event.srcElement.parentElement);
	},
	
	_selectFocus (_thisObj){
	    ['row select 표시'];
		var isTd = _thisObj;

		if (isTd && isTd.tagName === 'TD') {
		  // input 경우
		  var grd = _thisObj.closest('div[type="grid"]');

		  // 원본의 fallback: $("#"+_tdObj.id).closest(...)[0]
		  if (!grd && typeof _tdObj !== 'undefined' && _tdObj && _tdObj.id) {
		    var el = document.getElementById(_tdObj.id);
		    grd = el ? el.closest('div[type="grid"]') : null;
		  }

		  this._setSelectRowIndex(isTd);
		  if (grd) this._setRowSelection(grd);

		} else {
		  // select 경우 (대개 input/select 같은 요소)
		  isTd = _thisObj ? _thisObj.parentElement : null;

		  if (isTd && isTd.tagName === 'TD') {
		    var grd2 = _thisObj.closest('div[type="grid"]');

		    if (!grd2 && typeof _tdObj !== 'undefined' && _tdObj && _tdObj.id) {
		      var el2 = document.getElementById(_tdObj.id);
		      grd2 = el2 ? el2.closest('div[type="grid"]') : null;
		    }

		    if (grd2 && grd2.getAttribute('type') === 'grid') {
		      this._setSelectRowIndex(isTd);
		      this._setRowSelection(grd2);
		    }
		  }
		}
	},
	  
	setDivTag (__comp,__value,_keyMask){
	  	com.setValue(__comp,__value,_keyMask);
		if (__comp && __comp.parentElement) {
		  __comp.parentElement.innerHTML = __value;
		}
  	},

	doFilterForSingle (_thisObj,_e,grd) {
	    //첫적용
	    com.stopEvent(_e);
	    var o = _thisObj.closest('TH');
	    var _id = o.getAttribute('id');
	    var itemTable = _thisObj.closest('.moca_grid_body').querySelectorAll(".itemTable[thid="+_id+"]");
	    
	    if(itemTable.length == 0){
	        var offsetBasisObj = _thisObj.closest('.moca_grid_body');
	        var offsetBasisOffset = com.offset(offsetBasisObj);
	        var reWidth = com.getSize(o).width;
	        var reJson = com.offset(o);
	        var reHeight = com.getSize(o).height;
	        //var grd = $(_thisObj).closest('div[type=grid]');
	        //if(grd[0].nowlist == null){
	            //grd[0].nowlist = grd[0].list.clone();
	            grd.nowlist = grd.list;
	        //}
	        
	        var td = grd.cellInfo[o.getAttribute("filterableId")];
	        var _displayFormat = td.getAttribute("displayFormat");
	        var _celltype = td.getAttribute("celltype");
	    
	        var column_map = grd[o.getAttribute("filterableId")]['map'];
	        if(column_map == null){
	            column_map = {};
	        }
	        var _filterMap_cdNm = grd[o.getAttribute("filterableId")]['filterableMap'];
	        var _filterMap = {};
	        var kks = Object.keys(_filterMap_cdNm);
	        for(var i=0; i < kks.length; i++){
	            var _k = kks[i];
	            _filterMap[_k] = '';
	        }
	            
	        var _itemTable = '';
	        var filter;
	        if(grd.filter != null){
	            filter = grd.filter[_id];
	        }else{
	            grd['filter'] = {};  
	        }

	        var ks = Object.keys(_filterMap);
	        var isAllChecked = 'checked';
	        for(var i=0; i < ks.length; i++){
	            var k = ks[i];
	            var _cd = k;
	            _cd = _cd.replace(/\(.*?\) (.*?)$/g,'$1');
	            var _nm = _filterMap_cdNm[k];
	            
	    
	            var _reLabel = _nm;
	            _reLabel = _reLabel.trim();

	            if(filter != null && filter.indexOf(_cd) > -1){
	                checkedStr = "checked";
	            }else if(filter == null){
	                checkedStr = "checked";
	            }else{
	                isAllChecked = '';
	                checkedStr = '';
	            }
	            
	            if(checkedStr == "checked"){
	                _itemTable += '<li class="on">';
	            }else{
	                _itemTable += '<li>';   
	            }
	            
	            _itemTable += '<input type="checkbox" id="filterableCheck_'+_id+'_'+_cd+'" name="filterableCheck_'+_id+'" value="'+_cd+'" '+checkedStr+'>';
	            _itemTable += '<label type="checkbox" for="filterableCheck_'+_id+'_'+_cd+'" >'+_reLabel+'</label>'; 
	            _itemTable += '</li>';
	        }
	        
	        
	        var _all = '';
	        _all += '<div class="filterheader">';   
	        _all += '<span>';
	        _all += '<input type="checkbox" id="all_filterableCheck_'+_id+'" name="all_filterableCheck_'+_id+'" '+isAllChecked+' class="allcheck">';
	        _all += '<label type="checkbox" for="all_filterableCheck_'+_id+'"  ></label>';
	        _all += '</span>';
	        _all += '<div class="fr">';
	        if(grd[o.getAttribute("filterableId")].filterType != 'countableMap'){
	            _all += '<button type="button" class="moca_ibn_btn mr3" onclick="'+grd.id+'.filterSort(this,\''+_id+'\',\''+o.getAttribute("filterableId")+'\')" style="">건수순</button>';
	        }else{
	            _all += '<button type="button" class="moca_ibn_btn mr3" onclick="'+grd.id+'.filterAlpha(this,\''+_id+'\',\''+o.getAttribute("filterableId")+'\')" style="">가나다순</button>';
	        }
	        _all += '<button type="button" class="moca_ibn_btn mr3" onclick="'+grd.id+'.filterApply(this,\''+_id+'\',\''+o.getAttribute("filterableId")+'\')" style="">적용</button>'; 
	        _all += '<button type="button" class="moca_ibn_btn mr3 bd0" onclick="'+_id+'.expand(this,\''+_id+'\',\''+o.getAttribute("filterableId")+'\')" style=""><i class="fas fa-angle-double-down"></i></button>';
	        _all += '</div>';
	        _all += '<input type="text" class="moca_input req" style="" value="" onkeyup="$m.realtimeSearch(this)" placeholder="검색어를 입력하세요">';
	        _all += '</div>';
	        
	        _itemTable = _all+'<ul>'+_itemTable+'</ul>';            
	        var tmp = document.createElement( 'div' );
	        tmp.setAttribute("thid",o.getAttribute('id'));
	        tmp.setAttribute("class","itemTable");
	        tmp.innerHTML = _itemTable;         
	        this.filterClose();
	        _thisObj.closest('.moca_grid_body').append(tmp);
	        grd.itemTable = itemTable;
	        
	        itemTable = _thisObj.closest('.moca_grid_body').querySelector(".itemTable[thid="+o.getAttribute('id')+"]");
			var allCheckbox = itemTable.querySelector(
			    "input[type=checkbox][name=all_filterableCheck_" + _id + "]"
			);

			if (allCheckbox) {
			    allCheckbox.onclick = function (e) {
			        var container = this.closest('div');
			        if (!container) return;

			        var next = container.nextElementSibling;
			        if (!next) return;

			        var checkboxes = next.querySelectorAll('input[type=checkbox]');

			        checkboxes.forEach(function (cb) {
			            cb.checked = allCheckbox.checked;
			            var li = cb.closest('li');
			            if (li) {
			                li.classList.toggle('on', allCheckbox.checked);
			            }
			        });
			    };
			}
    

			var filterCheckboxes = itemTable.querySelectorAll(
			    "input[type=checkbox][name=filterableCheck_" + _id + "]"
			);

			filterCheckboxes.forEach((cb) => {
			    cb.onclick = () => {
			        var ul = this.closest('ul');
			        if (!ul) return;

			        var all = ul.querySelectorAll('input[type=checkbox]');
			        var checked = ul.querySelectorAll('input[type=checkbox]:checked');

			        var allCheckbox = ul.previousElementSibling
			            ? ul.previousElementSibling.querySelector(
			                "input[type=checkbox][name=all_filterableCheck_" + _id + "]"
			              )
			            : null;

			        if (!allCheckbox) return;

			        if (all.length === checked.length) {
			            allCheckbox.checked = true;
			            allCheckbox.indeterminate = false;
			        } else if (checked.length === 0) {
			            allCheckbox.checked = false;
			            allCheckbox.indeterminate = false;
			        } else {
			            allCheckbox.checked = false;
			            allCheckbox.indeterminate = true;
			        }

			        // 기존 함수 유지
			        this.filterSetColor(this);
			    };
			});
			itemTable.style.position = 'fixed';
			itemTable.style.width = reWidth + 'px';
			let _offset = com.offset(offsetBasisObj)
			//itemTable.style.top = (_offset.top + reJson.top + parseInt(reHeight, 10)) + 'px';
			//itemTable.style.left = (_offset.left + reJson.left) + 'px';
			itemTable.style.top = (reJson.top + parseInt(reHeight, 10)) + 'px';
			itemTable.style.left = reJson.left + 'px';
			itemTable.style.zIndex = '6200';

	        
	        
	        var ul = itemTable.querySelector('.filterheader')?.nextElementSibling;
	        var arr_all = ul.querySelector('input[type=checkbox]')
	        var arr_checked = ul.querySelector('input[type=checkbox]:checked');
	        
	        var allCheckbox = ul.previousElementSibling.querySelector("input[type=checkbox][name=all_filterableCheck_"+_id+"]");
	        
	        if(arr_all.length == arr_checked.length){
	            allCheckbox.checked = true;
	            allCheckbox.indeterminate = false;
	        }else if(arr_all.length == 0){
	            allCheckbox.checked =false;
	            allCheckbox.indeterminate = false;
	        }else{
	            allCheckbox.checked = false;
	            allCheckbox.indeterminate = true;
	        }
	        
	        itemTable.querySelector('i').classList.remove('fa-angle-double-down');
	        itemTable.querySelector('i').classList.add('fa-angle-double-up');
	        var ul = itemTable.querySelector('div.filterheader').nextElementSibling;
	        var ul_top = com.offset(ul).top;
	        var top_position = ul.getAttribute("top_position");
	        
			
	        if(top_position == null){
	            ul.setAttribute("top_position",ul_top);
	        }
	        var h = com.offset(grd).top + com.getSize(grd).height - Number(ul.getAttribute("top_position"))-5;
	        itemTable.querySelector('div.filterheader').nextElementSibling.style["max-height"] = h+'px';
	        
			// 기존 click 제거
			itemTable.removeEventListener('click', ()=>{com.stopEvent(event)});
			com.stopEvent(event);
			// 새로 등록
			itemTable.addEventListener('click', ()=>{com.stopEvent(event)});
			
	    } else{
			itemTable.forEach(el => el.remove());
		}
		
	},

	getCellOriData (grd,rowIndex,colid){
	    ['grid cell getCellOriData'];
	    if(colid == 'status'){
	        return grd.ori_list[parseInt(rowIndex)]["_system"][colid];
	    }else{
	        return grd.ori_list[parseInt(rowIndex)][colid];
	    }
	},
	
	filterClose (_o){
		document.querySelectorAll('.itemTable').forEach(el => {
		  el.style.display = 'none';
		});
    },
	
	filterSetColor (_thisObj){
	    ['현재 그리드의 모든 필터를 제거합니다.']
	    if(_thisObj.checked){
	        if(!_thisObj.closest('li').classList.contains('on')){
	            _thisObj.closest('li').classList.add('on');
	        }
	    }else{
	        _thisObj.closest('li').classList.remove('on');
	    }
	},

	doFilter (_thisObj) {
		// _thisObj가 문자열이면 header id로 넘어온 케이스
		if (typeof _thisObj === 'string') {
		  var headerEl = document.getElementById(_thisObj);
		  _thisObj = headerEl ? headerEl.querySelector('.moca_grid_filter_btn') : null;
		}
		if (!_thisObj) return;

		// grd / th 찾기
		var grd = _thisObj.closest('div[type="grid"]');     // DOM
		var o = _thisObj.closest('TH');                     // DOM
		var _headerId = o ? o.getAttribute('id') : null;

		// 선택한 필터가 최종필터가 아닐때!
		if (
		  grd &&
		  grd.appliedFilterMap != null &&
		  _headerId != null &&
		  grd.appliedFilterMap[_headerId] != null &&
		  (grd.appliedFilterMap[_headerId].idx < grd.appliedFilterArr.length)
		) {
		  this.filterRemoveAll(grd);
		  this.drawGrid(grd.id, grd.ori_list);
		}

		// myIdx
		var myIdx;
		if (grd && grd['filterIdx'] != null) {
		  myIdx = grd['filterIdx'][_headerId];
		}

		// 원본이 if(true)라서 항상 여기로 감
		if (true) {
		  this.doFilterForSingle(_thisObj, event, grd);
		} else {
		  if (myIdx != null) {
		    this.doFilterForSingle(_thisObj, event, grd);
		  } else {
		    $m.question(
		      '멀티필터로 적용하시겠습니까?',
		      function (result) {
		        if (result !== '3') {
		          if (result === '1') {
		            var list = grd.list;
		            var jq_grd_2 = grd; // DOM이지만 원본 변수명 유지

		            var ks = Object.keys(jq_grd_2.cellInfo);
		            var filterArr = [];
		            var filterThArr = [];

		            // jQuery: $(jq_grd_2).find('thead:first th[filterableId]')
		            var thArray = jq_grd_2.querySelectorAll('thead th[filterableId]');

		            for (var i = 0; i < thArray.length; i++) {
		              var aTh = thArray[i];
		              var filterableId = aTh.getAttribute('filterableId');
		              filterArr.push(filterableId);
		              filterThArr.push(aTh.id);

		              if (jq_grd_2[filterableId] == null) {
		                jq_grd_2[filterableId] = {};
		              }
		              jq_grd_2[filterableId]['filterableMap'] = {};
		            }

		            /*
		             * full loop area
		             */
		            for (var i = 0; i < list.length; i++) {
		              var row = list[i];
		              row["_system"]["realIndex"] = i;

		              for (var k = 0; k < filterArr.length; k++) {
		                var tdId = filterArr[k];
		                var tdValue = row[tdId];

		                jq_grd_2[tdId]['filterableMap'][tdValue] =
		                  ($m.getNumber(jq_grd_2[tdId]['filterableMap'][tdValue]) + 1);

		                if (i === list.length - 1) {
		                  jq_grd_2[tdId]['filterableMap'] = com.sortObject(jq_grd_2[tdId]['filterableMap']);
		                  jq_grd_2[tdId]['countableMap'] = {};

		                  var m = jq_grd_2[tdId].filterableMap;
		                  var keys = Object.keys(m);

		                  for (var j = 0; j < keys.length; j++) {
		                    var key = keys[j];
		                    var val = (m != null) ? m[key] : "";
		                    var reKey = "(" + val + "건) " + key;

		                    jq_grd_2[tdId]['countableMap'][reKey] =
		                      key + " (" + $m.comma(val) + "건)";
		                  }

		                  jq_grd_2[tdId]['countableMap'] =
		                    $m.sortObjectNumString(jq_grd_2[tdId]['countableMap']);

		                  var keys2 = Object.keys(jq_grd_2[tdId]['countableMap']);
		                  for (var j = 0; j < keys2.length; j++) {
		                    var key2 = keys2[j];
		                    jq_grd_2[tdId]['countableMap'][key2] = (j + 1) + "." + key2;
		                  }

		                  jq_grd_2[tdId]['alphabeticalMap'] = jq_grd_2[tdId]['filterableMap'];
		                  jq_grd_2[tdId].filterType = 'alphabeticalMap';
		                }
		              }
		            }

		            for (var i = 0; i < filterArr.length; i++) {
		              var tdId2 = filterArr[i];
		              var thId = filterThArr[i];

		              var m2 = jq_grd_2[tdId2].filterableMap;
		              var keys3 = Object.keys(jq_grd_2[tdId2]['filterableMap']);

		              for (var j = 0; j < keys3.length; j++) {
		                var key3 = keys3[j];
		                var val3 = (m2 != null) ? m2[key3] : "";
		                jq_grd_2[tdId2]['filterableMap'][key3] =
		                  (j + 1) + "." + key3 + " (" + $m.comma(val3) + "건)";
		              }

		              // jQuery: $(jq_grd_2).find(".itemTable[thid="+thId+"]").remove();
		              jq_grd_2.querySelectorAll('.itemTable[thid="' + CSS.escape(thId) + '"]').forEach(function (el) {
		                el.remove();
		              });

		              // jQuery: $(jq_grd_2)[0].filter = null;
		              jq_grd_2.filter = null;
		            }

		            // filter 구성 end
		            $m.doFilterForSingle(_thisObj, event, grd);

		          } else if (result === '2') {
		            this.filterRemoveAll(grd);
		            this.drawGrid(grd.id, grd.ori_list);
		            $m.doFilterForSingle(_thisObj, event, grd);
		          }
		        }
		      },
		      "멀티필터로적용",
		      "단일필터로적용",
		      "취소"
		    );
		  }
		}
	},
	
	filterRemoveAll (grd,_pageId,_srcId){
	    ['현재 그리드의 모든 필터를 제거합니다.']
	    if(grd.length == null){
	        grd = $(grd);
	    }
	    grd[0].appliedFilterMap = null;
	    grd[0].appliedFilterArr = null;
	    delete grd[0]['filterMaxIdx'];
	    grd[0]['filterIdx'] = {};
	    grd[0].filter = {};
	    var thArray = grd.querySelectorAll('thead:first th[filterableId]');
	    for(var i=0; i < thArray.length; i++){
	        var aTh = thArray[i];
	        var hObj = $('#'+aTh.id);
	        var filterableId = aTh.getAttribute("filterableId");
	        hObj.querySelector('.moca_grid_filter_btn').classList.remove('multi');
	        hObj.querySelector('i').text('');
	        if(i == thArray.length-1){
	            grd[0].filterMaxIdx = null;
	        }
	    }
	},
	
	getSelectTagForCombo (_id){
	    ['getSelectTagForCombo for grid cell'];
	    var selectTag = '<select name="sel_tree1" id="'+('sub_'+_id)+'" class="moca_select"  onchange="'+_id+'.gridCell_selectChange(this)" onblur="'+_id+'.closeSelect(this)" >';
	    return selectTag;
	},
	
	closeSelect (_thisObj){
	    ['grid cell selectbox동적닫기'];
	    setTimeout(function(){
	        try{
	            var combo_div = _thisObj.parentElement;
	            combo_div.innerHTML = this.getInputSelectTag(combo_div.getAttribute("label"));
	        }catch(e){
	            //thisObj가 사라졌을때(input으로 바뀔수있음 예외가 발생
	        }
	    },200);
	},
	
	gridCell_selectChange (_thisObj){
	    ['grid cell selectbox change!'];
	    var colid = _thisObj.closest('td').id;
	    var _tbody = _thisObj.closest('tbody');
	    var grd = _thisObj.closest('div[type="grid"');
	    var _thisTr = _thisObj.closest('tr');
	    var _onSelectChanged = grd.getAttribute("onSelectChanged");
	    

	    var realRowIndex = grd.getAttribute("selectedRealRowIndex");
	    //var rowIndex = grd.getAttribute("selectedRowIndex");  
	    
	    var comboObj = _thisObj.parentElement;
	    var beforeCd = comboObj.getAttribute("cd");
	    var beforeNm = comboObj.getAttribute("nm"); 
	    var label = _thisObj.options[_thisObj.selectedIndex]?.text || '';
	    comboObj.setAttribute("cd",_thisObj.value);
	    comboObj.setAttribute("nm",label.replace(_thisObj.value,'').trim());
	    comboObj.setAttribute("label",label);
	    
	    var combo_div = _thisObj.parentElement;
	    combo_div.innerHTML = this.getInputSelectTag(label);
	    this.setCellData(grd,realRowIndex,colid,combo_div.getAttribute('cd'));
	    
	    if(_onSelectChanged && _onSelectChanged.trim() != '' ){
	        eval(_onSelectChanged)(realRowIndex,colid,beforeCd,beforeNm,_thisObj.value,label);
	    }
	},
	
	_row_add (_thisObj){
	    ['행추가'] 
	    var grd = com.getTypeObj(_thisObj);
	    var grdkey = _thisObj.getAttribute("grdkey");
	    var aRow = {"_system":{"status":""}};
	    var ks = Object.keys(grd.cellInfo);
	    for(var i=0,j=ks.length;i < j; i++){
	        var key = ks[i];
	        if(key == 'status'){
	            aRow["_system"][key] = 'C';
	        }else{
	            aRow[key] = '';
	        }
	    }
	    if(grd.list == null){
	        grd.list = [];
	    }
	    grd.list.unshift(aRow); 
	    grd.drawGrid(grd,grd.list);
	    var rowForFocus = grd.querySelector('tbody')?.children[0];
	    if(rowForFocus != null){
	        this._setSelectRowIndex(rowForFocus);
	        this._setRowSelection(grd);
	    }
	},
	
	_row_del (_thisObj){
	    ['행삭제']
	    var _type = com.getType(_thisObj); 
	    var g = com.getTypeObj(_thisObj);
	    var toolbar_delrow_imd = g.getAttribute("toolbar_delrow_imd");
	    var selectedRealRowIndex = g.getAttribute("selectedRealRowIndex");
	    var status = g.list[selectedRealRowIndex]["_system"]['status'];
	    if(status == 'C' || toolbar_delrow_imd == 'true'){
	        this.removeRow(g,selectedRealRowIndex); 
	    }else if(status == 'D'){    
	        this.setCellData(g,selectedRealRowIndex,'status','');       
	    }else{
	        this.setCellData(g,selectedRealRowIndex,'status','D');
	    }
	},
	
	removeRow (_grd,_rowIndex){
	    ['grid removeRow']
	    _grd.list.splice(_rowIndex,1);
	    if(_grd.list.length > 0){
	        _grd.setAttribute("selectedRealRowIndex","0");
	    }else{
	        _grd.setAttribute("selectedRealRowIndex","");
	    }
	    //새로그려야함. 데이터 정합성을 위해
	    this.grid_redraw(_grd);
	},
	
	removeCol (tdArr) {
	    for(var i=(tdArr.length-1);i > -1; i--){
	        var aTd = tdArr[i];
	        var name = aTd.getAttribute("name");
	        if(name == '선택' || name == '상태'){
				let _arr = [...tdArr];
	            _arr.splice(i, 1);
	        }
	    }
	},
	
	grid_redraw (_grd){
	    ['grid_redraw']
	    this.sFunction(_grd.querySelector('.moca_scrollY_type1'));
	},
	
	_detailview (_thisObj) {
	    this._detailView1(_thisObj);
		document.querySelector('.button.colTh1').classList.add('on');
	},
	
	doSort (thisObj) {
	    var p;
	    var o;
	    var h;
	    if(thisObj != null && thisObj.type != 'dblclick'){
	        p = thisObj;
	        o = thisObj;
	        h = thisObj.closest('th');
	    }else{
	        p = this;
	        o = p.querySelector('.moca_grid_sort_btn');
	        h = p;
	    }
	    var grdo = com.getTypeObj(p);
	    com.stopEvent(event);
	    var _divObj = grdo;
	    
	    var colArray = _divObj.querySelectorAll('.moca_grid_body colgroup col');
	    
	    var thArray = _divObj.querySelectorAll('thead th[id]');
	    var _thMap = {};
	    for(var i=0; i < thArray.length; i++){
	        var thObj = thArray[i];
	        _thMap[thObj.id] = thObj;
	    }
	    var _idx = 0;
	    for(var i=0; i < colArray.length; i++){
	        var aCol = colArray[i];
	        var aTh = _thMap[aCol.getAttribute("thid")];
	        if(aTh == null){
	            aTh = thArray[i];
	        }
	        var _id = aTh.id;
	        if(_id == h.id){
	            _idx = i;
	            break;
	        }
	    }
	    
	    var ks = Object.keys(_divObj.cellInfo);
	    var colid = ks[_idx];
	    
	    
	    var dataArray = grdo.list;
	    
	    var returnArray;
	    if(o.classList.contains('sort_none')){
	        //원본에서 sort시작시점! 서 원본상태를 clone을 떠둠!
	        //grdo.sort_ori_list = dataArray.clone();
	        grdo.sort_ori_list = dataArray;
	    }

	    if(o.classList.contains('sort_none')){
	        //오름차순 다 나 가
	        returnArray = this.arrayOrderFnc(dataArray,[colid], ["asc"]);
	        grdo.list = returnArray;
	        
	        this.drawGrid_inside(grdo, returnArray);
	        o.classList.remove("sort_none");
	        o.classList.add("sort_asc");                 
	    }else if(o.classList.contains('sort_asc')){
	        //내림차순 가 나 다
	        returnArray = this.arrayOrderFnc(dataArray,[colid], ["desc"]);
	        grdo.list = returnArray;
	        this.drawGrid_inside(grdo, returnArray);
	        o.classList.remove("sort_asc");
	        o.classList.add("sort_desc");
	    }else if(o.classList.contains('sort_desc')){
	        //원래대로
	        returnArray = grdo.sort_ori_list;
	        grdo.list = returnArray;
	        this.drawGrid_inside(grdo, returnArray);    
	        o.classList.remove("sort_desc");
	        o.classList.add("sort_none");                    
	    }
	    this.redrawGrid(grdo);//스크롤포시션 유지되면서 sort됨
	    return false;       
	},

	filterSort (thisObj,_headerId,_tdId) {
	    ['건수순으로 소트']
	    var grd = thisObj.closest('div[type=grid]');
	    var cm = grd[_tdId]['countableMap'];
	    grd[_tdId]['filterableMap'] = cm;
	    grd[_tdId].filterType = 'countableMap';
		this.filterClose();
	    document.querySelector('.itemTable').remove();
	    this.doFilter(_headerId);
	},
	
	filterAlpha (thisObj,_headerId,_tdId) {
	    ['알파벳순으로 소트']
	    var grd = thisObj.closest('div[type=grid]');
	    var am = grd[_tdId]['alphabeticalMap'];
	    grd[_tdId]['filterableMap'] = am;
	    grd[_tdId].filterType = 'alphabeticalMap';
	    this.filterClose();
	    document.querySelector('.itemTable').remove();
	    this.doFilter(_headerId);
	},
	
	filterApply (thisObj,_headerId,_tdId) {
	    ['멀티소트구현']
	    var grd = thisObj.closest('div[type=grid]');
	    if(grd.appliedFilterArr  == null){
	        grd.appliedFilterArr = [];
	    }
	    if(grd.appliedFilterMap  == null){
	        grd.appliedFilterMap = {}; 
	    }
	    if(grd['filterFull']  == null){
	        grd['filterFull'] = {}; 
	    }   

	    grd['filter'][_headerId] = [...thisObj.closest('div.filterheader').nextElementSibling.querySelectorAll('li:not([style*="display: none"]) input[type=checkbox]:checked')].map(el => el.value).join(', ');
	    grd['filterFull'][_headerId] = [...thisObj.closest('div.filterheader').nextElementSibling.querySelectorAll('li input[type=checkbox]')].map(el => el.value).join(', ');
	    
	    var loopLeng = 0;
	    if(grd.appliedFilterMap[_headerId] == null){
	        loopLeng = grd.appliedFilterArr.length;
	    }else{
	        loopLeng = grd.appliedFilterArr.length-1;//이미선택된 마지막 필터를 수정할때
	    }
	    for(var i=0; i < loopLeng; i++){
	        var hId = grd.appliedFilterArr[i];
	        var map = grd.appliedFilterMap[hId];
	        grd.list = this.getFilteredListForFilter(grd.ori_list,map.tdId,map.checkedString);
	    }
	    
	    var applyNumber = 1;
	    var __list;
	    if(grd.appliedFilterMap[_headerId] == null){
	        grd.appliedFilterArr.push(_headerId);
	    }
	    if(grd['filterMaxIdx'] != null){
	        if(grd['filterIdx'][_headerId] == null){
	            applyNumber = ++grd['filterMaxIdx'];
	        }else{
	            applyNumber = grd['filterMaxIdx'];
	        }
	        if(applyNumber == 1){
	            __list = grd.ori_list;
	        }else{
	            //__list = grd.list;//멀티필터시필요
	            __list = grd.ori_list;
	        }
	    }else{
	        __list = grd.ori_list;
	    }
	    grd.list = this.getFilteredListForFilter(__list,_tdId,grd['filter'][_headerId]);
	    grd.appliedFilterMap[_headerId] = {'idx':applyNumber,'checkedString':grd['filter'][_headerId],'tdId':_tdId,'allCheckedString':grd['filterFull'][_headerId]};
	    grd['filterMaxIdx'] = grd.appliedFilterMap[_headerId].idx;
	    grd['filterIdx'] = {};
	    grd['filterIdx'][_headerId] = grd.appliedFilterMap[_headerId].idx;
	    
	    /*
	    var hObj = $('#'+_headerId);
	    hObj.find('.moca_grid_filter_btn').addClass('multi');
	    hObj.find('i').text(grd.appliedFilterMap[_headerId].idx);
	    *///멀티필터시필요
	    this.redrawGrid(grd);
	    if(grd.list.length != grd.ori_list.length){
	        var cnt = '<b class="txt_red">'+com.comma(grd.list.length)+'</b>'+'/'+com.comma(grd.ori_list.length);
	        this.setTotalCnt(grd,cnt);
	    }else{
	        var cnt = grd.ori_list.length;
	        this.setTotalCnt(grd,cnt);       
	    }
	},
	
	getFilteredListForFilter (_list,key,_val){
	    ['응답객체를 리턴타입에 맞게 변환']
	    var val = _val.split(',');
	    var reObj =  _list.filter(function(jsonObj){
	        if (_val.indexOf(jsonObj[key]) > -1){
	            return true;
	        }
	        return false;
	    });
	    
	    return reObj;
	},
	
	redrawGrid (_grd){
	    (document.querySelector('.itemTable'))?.remove()||"";//필터창 열린게 있으면 닫기
	    if(_grd == null){
	            var yscrollArr = $('.moca_scrollY_type1[pageid='+$m.pageId+'][srcid='+$m.srcId+']');
	            for(var i=0,j=yscrollArr.length; i < j; i++){
	                this.sFunction(yscrollArr[i]);
	            }
	    }else{
	        var yscrollObj = _grd.querySelector('.moca_scrollY_type1');
	            this.sFunction(yscrollObj);
	    }
	},
	
	arrayOrderFnc (dataArray, orderArray, type){
	    let returnArray = [];

	    let orderArraySize = 0;
	    let orderArraySizeMax = orderArray.length;
	    
	    let subOrderCallBoolean = false;
	    
	    //1차 정렬
	    returnArray = this.orderFnc(dataArray, orderArray[0], type[0]);
	        
	    
	    //동일한 값이 있고 기준 컬럼 배열이 2개 이상일때 실행
	    //중복 데이터 정렬용 배열 생성 sameDataArray
	    //if(subOrderCallBoolean && orderArraySizeMax >= 2){
	    if(orderArraySizeMax >= 2){
	        //2차 정렬
	        this.subOrderFnc(returnArray, orderArray, type);
	        
	    }
	    
	    return returnArray;
	},

	orderFnc (dataArray, orderStr, type){
	    let returnArray = [];
	    
		
		dataArray.forEach(item1 => {
		    let tempCheckData = item1[orderStr];
		    let orderIndex = 0;

		    returnArray.forEach((item2, index2) => {
		        let tempData = item2[orderStr];

		        if (tempData === undefined) tempData = null;
		        if (tempCheckData === undefined) tempCheckData = null;

		        if (tempCheckData > tempData) {
		            orderIndex = index2 + 1;
		        }
		    });

		    returnArray.splice(orderIndex, 0, item1);
		});

	    if(type == "desc"){
	        returnArray = returnArray.reverse();
	    }
	    
	    return returnArray;
	},

	subOrderFnc (returnArray, orderArray, type){
	    
	    for(let orderIndex = 1 ; orderIndex < orderArray.length ; orderIndex++){
	        
	        let sameDataArray = [];
	        let tempDataArray = [];
	        let samDataStrArray  = [];  //정렬기준별 동일 데이터 임시저장용 배열
	        
	        for(let n =0;n < returnArray.length -1 ; n ++){
	            
	            let checkBoolean = false;
	            let nowStrArray = [];
	            let nextStrArray = [];
	            
	            for(let checkIndex =0 ; checkIndex < orderIndex; checkIndex++){
	                nowStrArray.push(returnArray[n][orderArray[checkIndex]]);
	                nextStrArray.push(returnArray[n+1][orderArray[checkIndex]]);
	            }
	            
	            //기준컬럼 값이 같은 데이터만 확인
	            for(let n1=0 ; n1 < nowStrArray.length; n1++){
	                if(nowStrArray[n1] == nextStrArray[n1]){
	                    checkBoolean = true;
	                }else{
	                    checkBoolean = false;
	                    break;
	                }
	            }
	            //마지막 기준 컬럼 값이 같은지 체크
	            if(checkBoolean && nowStrArray[nowStrArray.length - 1] == nextStrArray[nextStrArray.length - 1]){
	                samDataStrArray = nowStrArray;
	                
	                tempDataArray.push(returnArray[n]);
	            }else{
	                if(samDataStrArray.length > 0){
	                    tempDataArray.push(returnArray[n]);
	                    
	                    let tempMap = {
	                            matchData : samDataStrArray,
	                            data : tempDataArray
	                    } 
	                    
	                    sameDataArray.push(tempMap);
	                    
	                    samDataStrArray = [];
	                    tempDataArray = [];
	                }
	    
	            }
	            
	            if(returnArray.length - 2 == n && tempDataArray.length > 0){
	                tempDataArray.push(returnArray[n+1]);
	                
	                let tempMap = {
	                        matchData : samDataStrArray,
	                        data : tempDataArray
	                } 
	                
	                sameDataArray.push(tempMap);
	            }
	        
	        }
	        
	        //재정렬할 데이터가 있으면 해당 배열 개수만큼 재정렬후 입력
	    
	        $.each(sameDataArray,function(index3, item3){
	            let matchDataArray = sameDataArray[index3].matchData;
	            let tempArray = $m.orderFnc(sameDataArray[index3].data, orderArray[orderIndex], type[orderIndex]);
	            let checkBoolean = false;
	            
	            for(let n =0 ; n < returnArray.length ;n++){
	                let nowDataArray = [];

	                //현재 orderIndex 만큼 돌며 해당 컬럼에 매칭되는 데이터 저장
	                for(let subOrderIndex =0 ; subOrderIndex <= orderIndex; subOrderIndex++){
	                    nowDataArray.push(returnArray[n][orderArray[subOrderIndex]]);                
	                }
	                
	                //기준컬럼 값이 같은 데이터만 확인
	                for(let n1=0 ; n1 < matchDataArray.length; n1++){
	                    if(matchDataArray[n1] == nowDataArray[n1]){
	                        checkBoolean = true;
	                    }else{
	                        checkBoolean = false;
	                        break;
	                    }
	                }
	                //마지막 기준 컬럼 값이 같은지 체크
	                if(checkBoolean && matchDataArray[matchDataArray.length - 1] == nowDataArray[matchDataArray.length - 1]){
	                    //같은 값 만큼 배열 지우고 갯수만큼 다시 넣음
	                    returnArray.splice(n, tempArray.length);
	                
	                    $.each(tempArray,function(index4, item4){
	                        returnArray.splice(n + index4, 0, item4);
	                    });
	                    
	                    break;
	                }
	            }
	            
	            
	        });
	    }
	},
	
	pagingPrev (_pageButtonObj){
    	var grd = _pageButtonObj.closest('[type=grid]');
		var _prevP = Number(grd.querySelector('.moca_grid_paging > .num > button.on').innerText);
		
		if(_prevP == 1){
			return;
		}else{
			var _currentP = _prevP-1;
			grd.currentPage = _currentP;
			var _onPageClick = com.getAttrObj(grd,'paging').onPageClick;
			this.onPageClick(_pageButtonObj,grd.currentPage,_onPageClick);
		}
    },
    
    pagingNext (_pageButtonObj){
    	var grd = _pageButtonObj.closest('[type=grid]');
    	var lastPage = this.getNumListCnt(grd);
		var _prevP = Number(grd.querySelector('.moca_grid_paging > .num > button.on').innerText);
		
		if(_prevP == lastPage){
			return;
		}else{
			var _currentP = _prevP+1;
			grd.currentPage = _currentP;
			var _onPageClick = com.getAttrObj(grd,'paging').onPageClick;
			this.onPageClick(_pageButtonObj,grd.currentPage,_onPageClick);
		}
    },
	
    pagingLast (_pageButtonObj){
    	var grd = _pageButtonObj.closest('[type=grid]');
    	var lastPage = this.getNumListCnt(grd);
    	var _prevP = Number(grd.querySelector('.moca_grid_paging > .num > button.on').innerText);
		if(_prevP == lastPage){
			return;
		}else{
			var _onPageClick = com.getAttrObj(grd,'paging').onPageClick;
			this.onPageClick(_pageButtonObj,lastPage,_onPageClick);
		}
    },
	
	onPageClick (_thisPageBtnObj,pageNum,onPageClickFunctionStr){
    	var beforePage = this.getCurrentPage(_thisPageBtnObj);
    	var currentPage = pageNum;
    	var grd = _thisPageBtnObj.closest("[type=grid]");
    	grd.currentPage = currentPage;
    	eval(onPageClickFunctionStr)(pageNum);
    	
    	if(beforePage < currentPage){
    		//페이지그룹이 넘어가는경우 우측
    	}else{
			debugger;
        	_thisPageBtnObj.parentElement.querySelector('.on').classList.remove('on');
        	_thisPageBtnObj.classList.add('on');
    	}
    },
}



function Grid(div) {
	const originalProto = Object.getPrototypeOf(div);        // HTMLDivElement.prototype 등
	const proto = Object.create(originalProto);              // 원본을 부모로 둔 새 proto
	Object.assign(proto, gridProto);                       // grid 기능을 섞음
	Object.setPrototypeOf(div, proto);   
	div.renderGrid();
  	return div;
}

