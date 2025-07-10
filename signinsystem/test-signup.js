const axios = require('axios');

// Simple test to verify signup functionality
async function testSignup() {
  try {
    const response = await axios.post('http://localhost:3019/post', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123'
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('Success:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Run the test
testSignup();
