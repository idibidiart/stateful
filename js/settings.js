var settings = {}

settings.query = {}
settings.query.beginTime = function() {return new Date() - 3600000 * 24 * 3}
settings.query.endTime = function() {return new Date() - 0}

settings.chart = {}
settings.chart.brushOffset = 11 * 3600000 * 3