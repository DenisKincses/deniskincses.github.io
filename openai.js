(function(ext) {

// Initialize the OpenAI API
var apiKey = "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";
var endpoint = "https://api.openai.com/v1/engines/gpt-3/jobs";
var responseData = "";

// Helper function to make API calls to OpenAI
function makeApiCall(data, callback) {
$.ajax({
url: endpoint,
type: "POST",
headers: {
"Authorization": "Bearer " + apiKey,
"Content-Type": "application/json"
},
data: JSON.stringify(data),
success: function(response) {
callback(response);
},
error: function(jqXHR, textStatus, errorThrown) {
console.error("OpenAI API error: " + textStatus);
console.error("Error: " + errorThrown);
responseData = "OpenAI API error: " + textStatus + " Error: " + errorThrown;
}
});
}

// Scratch block to make API call to OpenAI
ext.ask_question = function(question, callback) {
var data = {
prompt: question
};
makeApiCall(data, function(response) {
responseData = response;
callback();
});
};

// Scratch block to return the answer from OpenAI
ext.answer = function() {
return responseData;
};

// Register the Scratch blocks
var descriptor = {
blocks: [
['w', 'Ask GPT-3: %s', 'ask_question', 'What is the capital of France?'],
['r', 'GPT-3 answer', 'answer']
]
};

// Initialize the extension
ScratchExtensions.register('GPT-3 API', descriptor, ext);

})({});
