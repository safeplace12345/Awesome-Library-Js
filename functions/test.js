const axios = require('axios')
exports.handler = function(event,handler,callback){
    axios
      .post(
        `http://requestbin.net/r/hwfc5ox3
      `,
        {
          name: "john",
          gender: "Boy",
        }
      )
      .then((res) => {
        console.log(res);
        callback(null, {
          statusCode: 200,
          body: 'Hello......',
        });
      })
      .catch((err) => console.log(err));
}