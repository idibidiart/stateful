function mockSearchData(from, to) { 
	var mockSearchData =
		{
			Counter:
				{
					Instances: []
				},	
		}

	var random65 = function() {
	    var buf = new Uint16Array(1);
	    return [].slice.call(window.crypto.getRandomValues(buf), 0).join("") / 1000
	}

	for (var n =0, r = Math.random() * 20; n < r; n++) {
		mockSearchData.Counter.Instances.push({Name: "API ID " + Math.round(Math.random() * 11118374287), Data: []})

		var period = to - from
		var sample = period / 100
		
		for (var m =0; m < 100; m++) {
			mockSearchData.Counter.Instances[n].Data.push([to - ((100 - m) * sample), random65()])
		}	
	}
	return mockSearchData
}


