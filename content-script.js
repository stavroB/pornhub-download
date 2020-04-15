function Func() {
	return new Promise((resolve, reject) => {
		var a = document.querySelector("#player >script:nth-child(2)")
		if (!a) {
			a = document.querySelector("#player >script:nth-child(1)")
		}
		a = a.innerHTML
		a = `	var playerObjList = {};\n${a}`
		var c = a.match("flashvars_[0-9]{1,}")[0]
		eval(a)
		var d = eval(c)
		resolve(d)
	})
}

Func().then(res => {
	var videoType = []
	Object.keys(res).forEach((item) => {
		if (item.startsWith('quality_')) {
			var obj = {
				key: item,
				val: res[item],
				video_title:res.video_title
			}
			videoType.push(obj)
		}
	})
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		if (request.cmd == 'test') 
			sendResponse(videoType);
	});
})



