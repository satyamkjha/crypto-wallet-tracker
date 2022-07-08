// TODO: change on deploy
let tempGoogleClientId = "802737936107-htnnvr6m3qq4t5lq6bil2jnhaeov5dg3.apps.googleusercontent.com";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  console.log("dev");
} else {
  // TODO: update to credshield google clientId
  tempGoogleClientId = "802737936107-htnnvr6m3qq4t5lq6bil2jnhaeov5dg3.apps.googleusercontent.com";
}

export let googleClientId = tempGoogleClientId;
