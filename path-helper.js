module.exports = {
    combineSegments: segments => 
        segments
            .map(s => s.reduce((_, s) => `${_} ${s}`, ""))
            .reduce((_, s) => `${_} ${s}`, "")
};