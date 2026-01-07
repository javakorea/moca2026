
const frame = {
	callbacks : {},
	init() {
		// 모든 moca-frame 탐색
	    var frames = document.getElementsByTagName('moca-frame');
	    // HTMLCollection은 live라서 뒤에서부터 처리
	    for (var i = frames.length - 1; i >= 0; i--) {
	        (async function(frame) {
	            var src = frame.getAttribute('src');
	            if (!src) return;
	            
	            // 1) 새 div 생성 (moca-frame을 대체)
	            var div = com.cloneDiv(frame);
	        	let doc = await com.getDocAsync(src);
	    		let re = doc.body.innerHTML.replace(/moca-grid/g,'div');
	    		doc.body.innerHTML = re;
	    		div.innerHTML = doc.body.innerHTML;
	    		
	    		// 5) 원래 moca-frame 자리에 div로 교체
	    	    frame.parentNode.replaceChild(div, frame);
		  		// 2. script 실행
		  		const scripts = doc.querySelectorAll("script");
		  		com.executeScripts(scripts);
		  		// 3. 이제 script 안 함수 사용 가능
		  		if (window.onpageload) {
		  			let divObjs = div.querySelectorAll('div[type="grid');
		  			for(let i=0; i<divObjs.length; i++){
		  				new Grid(divObjs[i]);
		  			}
			  		window.onpageload();
		  		  
		  		}
	        })(frames[i]);
	    }
	}

};