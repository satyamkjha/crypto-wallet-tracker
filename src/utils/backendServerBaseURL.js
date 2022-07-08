// TODO: change on deploy
let tempbackendServerBaseURL = "http://localhost:8000";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  console.log("dev");
} else {
  // TODO: update to target domain name
  tempbackendServerBaseURL = "https://DOMAIN_NAME.com";
}

export let backendServerBaseURL = tempbackendServerBaseURL;
