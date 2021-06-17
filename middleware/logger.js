module.exports = (format) => {
  const time = new Date().toISOString();

  //this middleware will run on the endpoint for users and posts since it's located on the index
  //file
  return (req, res, next) => {
    //user agent making the REQUEST exp: insomnia, Postman
    const agent = req.headers["user-agent"];
    // format is the parameter used and implemented on the index file, either long or short
    switch (format) {
      case "long": // case long gives you log of method, ip, and url + agent
        //log this info out for every request that comes in before moving on the route
        console.log(
          `long: [${time}] ${req.ip}, ${req.method}, ${req.url}, ${agent}`
        );
        break;
      case "short": // case short gives you log for method and url only, no time or agent
        console.log(`Short: ${req.method}, ${req.url}`);
        break;
      default:
        return format;
    }

    //this middleware is finished, move on to next piece of middleware in the stack
    next();
  };
};
