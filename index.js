// Set options as a parameter, environment variable, or rc file.

/* 
CREATE A FILE CALLED "constants.js" and add the following there: 

export const IG_USERNAME = "YourUsername";
export const IG_PASSWORD = "YourPassword";

export const facebookAuth = {
    email: "YourEmail",
    password: "yourPassword",
  };

  export const OPENAI_API_KEY =
  "YOUR OPEN AI KEY";


*/

const { default: tinderApi } = require("tinder-api-js");

// eslint-disable-next-line no-global-assign
require = require("esm")(module /* , options */);
module.exports = require("./main.js");

const { Configuration, OpenAIApi } = require("openai");
const { IgApiClient } = require("instagram-private-api");

const {
  facebookAuth,
  IG_PASSWORD,
  IG_USERNAME,
  OPENAI_API_KEY,
} = require("./constants.js");

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function loginToTinder() {
  const login = await tinderApi.auth.withFacebook(facebookAuth);

  if (login) {
    const recommandations = await tinderApi.recommandation.getRecommandations();
    return recommandations.results;
  }
}

async function runTheWholeThing() {
  const ig = new IgApiClient();

  ig.state.generateDevice(IG_USERNAME);
  await ig.account.login(IG_USERNAME, IG_PASSWORD);

  //First login to Tinder
  //For each recommendation I get on tinder do:
  //Check her bio for an instagram handle.
  //If she has one, ask openGPT to figure it out.
  //Once we figured it out, create an opening line for Instagram. Make sure to mention I came from Tinder.
  //Send the dm on instagram.
  //Pass on the girl. (we don't need to waste likes on girls we already texted)
  //if she doesn't, we pass for now.

  var tinderResults = await loginToTinder();

  for (result of tinderResults) {
    var mainTinderInfo = {
      bio: result.bio,
      name: result.name,
      id: result._id,
    };

    var instagramHandle = await getGirlsIntagramHandle(mainTinderInfo, ig);
  }
}

async function sendInstagramDm(username, messageToSend, ig) {
  //   const userId = await ig.user.getIdByUsername(username);
  var userId;
  try {
    userId = await ig.user.getIdByUsername(username);
    const thread = ig.entity.directThread([userId.toString()]);
    var broadcasted = await thread.broadcastText(messageToSend);
  } catch (e) {
    console.log(e);
  }
}

async function askForInstagramHandle(mainTinderInfo) {
  var openAiRequest =
    "What is this girls' handle? This is her bio: \"" +
    mainTinderInfo.bio +
    '" Write just the handle. Exclude any @. Put it in quotes';

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: openAiRequest,
    max_tokens: 64,
    temperature: 0.0,
  });
  return response.data.choices[0].text;
}

async function getGirlsIntagramHandle(mainTinderInfo, ig) {
  var handleResponse = await askForInstagramHandle(mainTinderInfo);

  if (handleResponse.includes('"')) {
    var instagramHandle = handleResponse.substring(
      handleResponse.indexOf('"') + 1,
      handleResponse.lastIndexOf('"')
    );
    console.log("This girl's instagram handle is " + instagramHandle);
    console.log("Her bio is: " + mainTinderInfo.bio);

    if (instagramHandle.length != 0) {
      var openAiRequest =
        "Create an opening line to a girl named " +
        mainTinderInfo.name +
        '. This is her bio on tinder: "' +
        mainTinderInfo.bio +
        '". Make sure to mention that I found her on tinder and I am dming her on Instagram. Include profanity';

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: openAiRequest,
        max_tokens: 64,
        temperature: 0.99,
      });

      var messageToSend = response.data.choices[0].text;
      messageToSend = messageToSend.substring(4);

      console.log("Message it sent her: " + messageToSend);

      console.log(
        "\n\n-------------------------------------------------------------------\n\n"
      );

      var sent = await sendInstagramDm(instagramHandle, messageToSend, ig);
      //Here we 'pass her' because we want to see more.
      await tinderApi.feeling.pass(mainTinderInfo.id);
    } else {
    }

    return instagramHandle;
  } else {
    console.log(
      "This girl doesn't have an instagram handle. I'm passing on her"
    );
    return "";
  }
}

runTheWholeThing();
