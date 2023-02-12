(function(ext) {
 
  // Initialize the OpenAI API
  var apiKey = "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";
  var endpoint = "https://api.openai.com/v1/engines/gpt-3/jobs";
  var answer = "";
  var error = "";
 
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
        callback(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        error = jqXHR.responseJSON.error.message;
        callback();
      }
    });
  }
 
  // Scratch block to ask a question and get answer from OpenAI
  ext.ask_question = function(question, callback) {
    var data = {
      "prompt": question,
      "max_tokens": 100
    };
    makeApiCall(data, function(response) {
      if (error) {
        answer = error;
      } else {
        answer = response.choices[0].text;
      }
      callback();
    });
  };
 
  // Scratch block to report the answer or error from OpenAI
  ext.answer = function() {
    return answer;
  };
 
  // Register the Scratch blocks
  var descriptor = {
    blocks: [
      ['w', 'ask GPT-3: %s', 'ask_question', 'What is the capital of France?'],
      ['r', 'GPT-3 answer', 'answer']
    ]
  };
 
  // Initialize the extension
  ScratchExtensions.register('GPT-3 API', descriptor, ext);
 
})({});
