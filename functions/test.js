const axios = require('axios')
exports.handler = function(event,handler,callback){
    axios({
      method: "post",
      url: `http://requestbin.net/r/9g5e6bts
      `,
      body: { name: "James" },
    })
      .then((res) => {
        console.log(res);
        callback(null, {
          statusCode: 200,
          body: "Hell yah....",
        });
      })
      .catch((err) => console.log(err));
}