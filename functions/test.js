const axios = require('axios')
exports.handler = function(event,handler,callback){
    axios
      .post(
        `http://requestbin.net/r/9g5e6bts
      `,
        {
          name : "john",
          gender : "Boy",
        }
      )
      .then((res) => {
        console.log(res);
        callback(null, {
          statusCode: 200,
          body: res.json(),
        });
      })
      .catch((err) => console.log(err));
}