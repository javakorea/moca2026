
const com = {
	getMocaSrcHtml(url, params, callbacks = {}){
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
		    callbacks.error && callbacks.error(xhr, xhr.status, xhr.statusText);
		  }
		} catch (e) {
		  callbacks.error && callbacks.error(xhr, "exception", e);
		} finally {
		  callbacks.complete && callbacks.complete(xhr);
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
		}
		
		
};