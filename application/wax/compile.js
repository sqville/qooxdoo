function compile(data, callback) {
    console.log("I'm here at the start ");
    let err = null;
    this.addListener("made",  e => new qx.Promise((fullfiled) => {
        console.log("----> Run code to read what they did with phonegap_wax edits. ");
        console.log("----> Translate and apply those changes to the rn_wax code files. ");
        console.log("----> Save changed files out to rn_wax folder. ");
        fullfiled();
    }));
	callback(err, data);
}