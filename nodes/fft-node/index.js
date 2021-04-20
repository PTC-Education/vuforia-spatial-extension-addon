/**
 * @preserve
 *
 *                                     .,,,;;,'''..
 *                                 .'','...     ..',,,.
 *                               .,,,,,,',,',;;:;,.  .,l,
 *                              .,',.     ...     ,;,   :l.
 *                             ':;.    .'.:do;;.    .c   ol;'.
 *      ';;'                   ;.;    ', .dkl';,    .c   :; .'.',::,,'''.
 *     ',,;;;,.                ; .,'     .'''.    .'.   .d;''.''''.
 *    .oxddl;::,,.             ',  .'''.   .... .'.   ,:;..
 *     .'cOX0OOkdoc.            .,'.   .. .....     'lc.
 *    .:;,,::co0XOko'              ....''..'.'''''''.
 *    .dxk0KKdc:cdOXKl............. .. ..,c....
 *     .',lxOOxl:'':xkl,',......'....    ,'.
 *          .';:oo:...                        .
 *               .cd,    ╔═╗┌─┐┬─┐┬  ┬┌─┐┬─┐   .
 *                 .l;   ╚═╗├┤ ├┬┘└┐┌┘├┤ ├┬┘   '
 *                   'l. ╚═╝└─┘┴└─ └┘ └─┘┴└─  '.
 *                    .o.                   ...
 *                     .''''','.;:''.........
 *                          .'  .l
 *                         .:.   l'
 *                        .:.    .l.
 *                       .x:      :k;,.
 *                       cxlc;    cdc,,;;.
 *                      'l :..   .c  ,
 *                      o.
 *                     .,
 *
 *             ╦ ╦┬ ┬┌┐ ┬─┐┬┌┬┐  ╔═╗┌┐  ┬┌─┐┌─┐┌┬┐┌─┐
 *             ╠═╣└┬┘├┴┐├┬┘│ ││  ║ ║├┴┐ │├┤ │   │ └─┐
 *             ╩ ╩ ┴ └─┘┴└─┴─┴┘  ╚═╝└─┘└┘└─┘└─┘ ┴ └─┘
 *
 * Created by Valentin on 10/22/14.
 *
 * Copyright (c) 2015 Valentin Heun
 *
 * All ascii characters above must be included in any redistribution.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * @desc prototype for a plugin. This prototype is called when a value should be changed.
 * It defines how this value should be transformed before sending it to the destination.
 * @param {object} objectID Origin object in which the related link is saved.
 * @param {string} linkID the id of the link that is related to the call
 * @param {object} inputData the data that needs to be processed
 * @param {function} callback the function that is called for when the process is rendered.
 * @note the callback has the same structure then the initial prototype, however inputData has changed to outputData
 **/

// NOTES:
// Node gets fired everytime a value is sent to it 
// Or you can add a set interval and then it'll keep reading out to console even when app closes 
// Console.logs work only right after the exports.render
// The value of 'thisNode' is an object and looks like this:
// In this example, I sent the value 2000 to the node
// NOTE: data value is the value I sent, processedData is the value I sent minus a digit 
// 
// {
//   "name": "value",
//   "objectId": "Test_ya24s5ajlc1",
//   "frameId": "Test_ya24s5ajlc1FFT7Odi73xifc7d",
//   "uuid": "Test_ya24s5ajlc1FFT7Odi73xifc7dvalue",
//   "data": {
//     "value": 2000, 
//     "mode": "f",
//     "unit": false,
//     "unitMin": 0,
//     "unitMax": 1
//   },
//   "x": 0,
//   "y": 0,
//   "scale": 0.5,
//   "matrix": [],
//   "type": "fft-node",
//   "stress": 0,
//   "privateData": {},
//   "publicData": {
//     "default": 50
//   },
//   "processedData": {
//     "value": 200,
//     "mode": "f",
//     "unit": false,
//     "unitMin": 0,
//     "unitMax": 1
//   }
// }
var sampleSize;
// var sampleRate;
var dataArray = []; 
var arrayMade = false;

var i = 0;
var startTime;
var stopTime;

// FFT Processing
var timestamp = require('timestamp')

function FFTrooni(signal, sampleRate) {
    var fft = require('fft-js').fft,
        fftUtil = require('fft-js').util

    var phasors= fft(signal);

    var frequencies = fftUtil.fftFreq(phasors, sampleRate), // Sample rate and coef is just used for length, and frequency step
        magnitudes = fftUtil.fftMag(phasors); 

    var both = frequencies.map(function (f, ix) {
        return {x: f, y: magnitudes[ix]};
    });
    console.log(both);
    return both;
}

const average = (array) => array.reduce((a, b) => a + b) / array.length;


var generalProperties = {
    name: 'node',
    privateData: {},
    publicData: {},
    type: 'node'
};

exports.properties = generalProperties;

exports.setup = function (_object, _tool, _node, _activeBlockProperties) {
    // add code here that should be executed once.
};

exports.render = function (object, tool, node, thisNode, callback, utilities) {
    if (!utilities) { // backwards compatible for server versions without nodeUtilities
        for (var key in thisNode.data) {
            thisNode.processedData[key] = thisNode.data[key];
        }
    } else {
        thisNode.processedData = utilities.deepCopy(thisNode.data);
    }
    // If user is sending the object, then grab the size and rate
    try{if (typeof(thisNode.publicData) == 'object') {
        sampleSize = parseInt(thisNode.publicData.data.SAMPLE_SIZE); 
        // sampleRate = parseInt(thisNode.publicData.data.SAMPLE_RATE);
        arrayMade = true;
    }
} catch(error){console.log(error)}


    if (arrayMade) {
       try{ if (typeof(parseFloat(thisNode.publicData.data.ACCELEROMETER)) == "number") { 
        console.log('acceleromerooni: '+parseFloat(thisNode.publicData.data.ACCELEROMETER))
        if (sampleSize > 0) {
                if (!(isNaN(parseFloat(thisNode.publicData.data.ACCELEROMETER)))) {
                    if (i == 0) {
                        startTime = timestamp();
                        console.log(startTime);
                        dataArray[i] = parseFloat(thisNode.publicData.data.ACCELEROMETER);
                    }
                    i += 1;
                    if (i == sampleSize) {
                        i = 0;
                        stopTime = timestamp();
                        dt = (stopTime - startTime)/1000;
                        var avg = average(dataArray);
                        var dataArray2 = dataArray.map( function(arrval){
                            return arrval - avg;
                        })
                        var TsampleRate = Math.floor(sampleSize/dt);
                        // Sending value of FFT to node that it connects to
                        thisNode.processedData.value = FFTrooni(dataArray2,TsampleRate);
                        // console.log(FFTrooni(dataArray2,TsampleRate));
                        console.log("Sample Rate [samp/sec]: "+TsampleRate);
                        console.log("data values: "+ dataArray2);
                        console.log(stopTime);
                        console.log("THE ARRAY IS ");
                        console.log(dataArray);
                        console.log("THE SIZE IS ");
                        console.log(dataArray.length);
                    } 
                    else {
                        dataArray[i] = parseFloat(thisNode.publicData.data.ACCELEROMETER);
                    }
                }
            }
        } }
        catch(error){console.log(error)}
    }
    // console.log(typeof(thisNode.data.value));
    // console.log("THISNODE VALUE: " + thisNode.data.value);

    // Console.logs WORK here 
    // setInterval(function(){ 
        // console.log("THISNODE VALUE: " + thisNode.data["value"]);
        // if (thisNode.data["value"] == 400) {
        //     thisNode.data["value"] = 1000;
        // }
        // console.log("THISNODE VALUE: " + thisNode.data["value"]);
    // }, 1000);
        // this is what is being connected to the node 
        // console.log("THISNODE VALUE: " + thisNode.data.value);
        // this is the public data object on line 98
        // console.log("THISPUBLIC VALUE: " + JSON.stringify(thisNode.publicData));
        // public data saves so when it is opened up again, saves only one previous version
        // thisNode.publicData = "WORKING";
        // processed data is what is being sent, could just connect one node to another? 
        // thisNode.processedData.value = [9, 0, 3, 4];
        // console.log("THISNODE VALUE: " + thisNode.data.value);
        // console.log("THISPUBLIC VALUE: " + JSON.stringify(thisNode.publicData));
        

    callback(object, tool, node, thisNode, thisNode.publicData);

    // thisNode.processedData.value = "PINEAPPLE";
    // if (!utilities) { // backwards compatible for server versions without nodeUtilities
    //     for (var key in thisNode.data) {
    //         thisNode.processedData[key] = thisNode.data[key];
    //     }
    // } else {
    //     thisNode.processedData = utilities.deepCopy(thisNode.data);
    // }
    // callback(object, tool, node, thisNode);
};
