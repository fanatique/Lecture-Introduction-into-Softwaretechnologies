  /*
   * Licensed to the Apache Software Foundation (ASF) under one
   * or more contributor license agreements.  See the NOTICE file
   * distributed with this work for additional information
   * regarding copyright ownership.  The ASF licenses this file
   * to you under the Apache License, Version 2.0 (the
   * "License"); you may not use this file except in compliance
   * with the License.  You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing,
   * software distributed under the License is distributed on an
   * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
   * KIND, either express or implied.  See the License for the
   * specific language governing permissions and limitations
   * under the License.
   */
  var app = {
    pictureSource: null, // picture source
    destinationType: null, // sets the format of returned value
    imageData: null,
    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      app.pictureSource = navigator.camera.PictureSourceType;
      app.destinationType = navigator.camera.DestinationType;
      app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      console.log('Received Event: ' + id);
    },
    // A button will call this function
    capturePhoto: function() {
      navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
        quality: 50,
        destinationType: this.destinationType.DATA_URL
      });
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      // navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, { quality: 20, allowEdit: true,
      // destinationType: destinationType.DATA_URL });
    },
    // Called when a photo is successfully retrieved
    onPhotoDataSuccess: function(imageData) {
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      var largeImage = document.getElementById('largeImage');

      // Show the captured photo
      // The in-line CSS rules are used to resize the image
      largeImage.src = "data:image/jpeg;base64," + imageData;
      this.imageData = imageData;

      var cameraButton = document.getElementById('camerabutton');
      cameraButton.style.display = "none";

      var uploadButton = document.getElementById('uploadbutton');
      mailButton.style.display = "block";
    },
    // Called if something bad happens.
    onFail: function(message) {
      alert('Failed because: ' + message);
    },
    uploadImage: function() {
        var data = {file: this.imageData};
        $.post("https://alexander-thomas.net/beuth-gallery/upload", data, function(response) {
          $('#result').html(response);
        });
    }
  };
