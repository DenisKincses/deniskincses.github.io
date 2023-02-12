(function(ext) {

// Initialize the OpenAI API
var apiKey = "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";
var endpoint = "https://api.openai.com/v1/engines/gpt-3/jobs";

// Helper function to make API calls to OpenAI
function makeApiCall(data, callback) {
$.ajax({
url: endpoint,
type: "POST",
headers: {
"Authorization": "Bearer" + apiKey,
"Content-Type": "application/json"
},
data: JSON.stringify(data),
success: function(response) {
console.log(response);
var responseObject = JSON.parse(response);
callback(responseObject.answer);
},
error: function(jqXHR, textStatus, errorThrown) {
console.error("OpenAI API error: " + textStatus);
console.error("Error: " + errorThrown);
}
});
}

// Scratch block to make API call to OpenAI
ext.ask_question = function(question, callback) {
var data = {
question: question
};
makeApiCall(data, function(response) {
// Process the API response here
callback(response);
});
};

ext.answer = function(callback) {
return answer;
};

// Register the Scratch blocks
var descriptor = {
blocks: [
['w', 'Ask GPT-3: %s', 'ask_question', 'What is the capital of France?'],
['r', 'GPT-3 answer', 'answer']
]
};

// Initialize the extension
ScratchExtensions.register('OpenAI API', descriptor, ext);

})({});
