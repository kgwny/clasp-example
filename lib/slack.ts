declare let PropertiesService: any;
declare let UrlFetchApp: any;

const token = PropertiesService.getScriptProperties().getProperty("SLACK_API_TOKEN");
const apiResponse = callWebApi(token, "chat.postMessage", {
  channel: "#ようこそ",
  text: ":wave: こんにちは！"
});

export function callWebApi(token :string, apiMethod :string, payload :any) {
  const response = UrlFetchApp.fetch(
    `https://www.slack.com/api/${apiMethod}`,
    {
      method: "post",
      contentType: "application/x-www-form-urlencoded",
      headers: { "Authorization": `Bearer ${token}` },
      payload: payload,
    }
  );
  console.log(`Web API (${apiMethod}) response: ${response}`)
  return response;
}
