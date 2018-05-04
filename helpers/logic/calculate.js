module.exports = {
    solve: function(entry, k) {
    for(var i = 0; i < entry.length; i++) {
        console.log(entry[i]);
        if(Math.abs(entry.pop().milliseconds - entry[0].milliseconds) > k == true) {
            console.log(entry[0].milliseconds);
            console.log(entry.pop().milliseconds);
            return true;
        }
    }
    return false;
}

};