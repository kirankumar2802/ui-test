/**
 * QuickHTTP Library
 * Library for making HTTP requests
 *
 **/

class QuickHTTP {
  // Make an HTTP GET Request
  async get(url) {
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }
}

export const http = new QuickHTTP();
