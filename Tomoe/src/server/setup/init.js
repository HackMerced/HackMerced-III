// call installer

let args = process.argv.slice(2);

if(args && args[0] && (args[0] === "live" || args[0] === "dev" || args[0] === "test")){
  let mode = "dev";

  if(args[0] === "live"){
    mode = "live";
  } else if(args[0] === "test"){
    mode = "test"; // should old be run via mocha
  }

  require("./install.js").startInstall(mode);
} else if(args[0] === "test-env"){
  require("./install.js").generateTestEnvironment(args[1], args[2]);
} else {
  console.log("Can't install server, please specify mode (dev or live)");
}
