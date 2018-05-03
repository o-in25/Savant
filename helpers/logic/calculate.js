module.exports = {
    solve: function(entry, k) {
        console.log(entry);
    for(var i = 0; i < entry.length; i++) {
        if(Math.abs(entry.pop().milliseconds - entry[0].milliseconds) > k == true) {
            console.log('====================== TRUE ==========================');
            return true;
        }
    }
    return false;
}

};