const delayResponse = (n, response) => setTimeout(() => {
  return response.end(n);  
}, n * 100);

// How can we access 'module.exports' from within this file?

module.exports = delayResponse;
