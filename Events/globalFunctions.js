const { exec }= require("child_process")
module.exports = {
    isnotevent: true,
   run: async(code, client) => {
       global.execute = function(c){
    exec(c, (a, b, c) => {
        if(a){
            console.log("FeedBack: ", a)
            return;
        }
        if(b){
            console.log("FeedBack: ", b)
            return;
        }
        if(c){
            console.log("FeedBack: ", c)
            return;
        }
    })
       }
   }
}