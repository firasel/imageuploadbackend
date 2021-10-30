const SendResponse = (status, message, data) => {
    return {
      status,
      message
    };
  };
  
module.exports = SendResponse;