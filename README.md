# Vuforia-Spatial-Extension-Addon

### Don't have the Vuforia Spatial Edge Server? 

Navigate <a href="https://spatialtoolbox.vuforia.com/"> here </a> to get started!

### Already have the Edge Server? 

- Git clone this repo into your addons folder and then `cd` into the newly added folder. 
- Run `npm install` and you should be all set to go! 

## What's included in this Addon?

This addon gives you access to the following tools:

<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/FFT/icon.gif" alt="FFT Tool's icon.gif" width="200" height="200"/>

* **Name:** FFT
* This tool allows you to run a Fast Fourier Transform
* **Number of nodes:** 2
  * `accelerometer value` which takes in the accerlerometer data
  * `display` which takes the `accelerometer value` node as **an input** to draw a line graph for the FFT
 
<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/airtable/icon.gif" alt="airtable Tool's icon.gif" width="200" height="200"/>

* **Name:** airtable
* This tool allows you to send and receive values from your Airtable account (a user-friendly free online database)
* **Number of nodes:** 1
  * `value` which takes either an input string if you are sending a value to Airtable, or use this node as output to another tool if you are receiving a value from Airtable.
  * In the textbox, enter the name of the variable you are trying to access, and use the toggle button to switch between sending and receiving
  * To connect to your Airtable account, open the `Airtable.js` file within the airtable tool folder, and input your Account info
<br />
<br />
<br />

<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/newSlider/icon.gif" alt="newSlider Tool's icon.gif" width="200" height="200"/><br /><br /><br />

* **Name:** newSlider
* This tool is an improvement to the existing slider tool. Allows you to send values from 100 to -100 to other tools. If you want to increase or decrease the range, look at **line 210** within the `index.html` file in the newSlider tool folder
* **Number of nodes:** 1
  * `value` which can connect to other nodes to send the desired value

<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/newValue/icon.gif" alt="newValue Tool's icon.gif" width="200" height="200"/>

* **Name:** newValue
* This tool is an improvement to the existing value tool. Allows you to visualize values from 10000 to -10000 from other tools
* **Number of nodes:** 1
  * `value` which can takes an input from another node and displays the given value

<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/number/icon.gif" alt="number Tool's icon.gif" width="200" height="200"/>

* **Name:** number
* This tool allows you to input a number and then sends that value to another tool. This is similar to the `newslider` tool, except it uses the keyboard to send a value between 10000 to -10000
* **Number of nodes:** 1
  * `value` which can connect to other nodes to send the desired value

<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/receiveText/icon.gif" alt="receiveText Tool's icon.gif" width="200" height="200"/>

* **Name:** receiveText
* This tool allows you connect an input and it will then display value as text. Can display both integers and strings 
* **Number of nodes:** 1
  * `value` which takes an input that can be an integer or string

<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/sendText/icon.gif" alt="sendText Tool's icon.gif" width="200" height="200"/>

* **Name:** sendText
* This tool allows you to send a text value to another too 
* **Number of nodes:** 1
  * `value` which can connect to other nodes to send the desired text value
<br />
<br />
<br />

<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/tonTimer/icon.gif" alt="tonTimer Tool's icon.gif" width="200" height="200"/><br /><br /><br />

* **Name:** tonTimer
* This tool mimics the TON Timer within Rockwell Automation PLC softwares (such as Studio 5000, or Connected Components Workbench). Use the text box to enter the timer amount (in seconds). See <a href="https://twcontrols.com/lessons/allen-bradley-micro800-timer-instructions-in-connected-components-workbench-software">this helpful video</a> for more information on what the following 
* **Number of nodes:** 3
  * `EN` which starts the timer when given a value of 1 or stops the timer when given a value of 0 (Ex. using the on/off switch tool)
  * `TN` which outputs a 1 while the timer is timing and 0 otherwise, Ex. connect this node to a switch and the switch will stay on for X amount of seconds and then will turn off 
  * `DN` which outputs a 1 when the timer is finished and 0 otherwise 
<br />
<br />
<br />

<img src="https://github.com/PTC-Education/vuforia-spatial-extension-addon/blob/master/tools/trafficlight/icon.gif" alt="trafficlight Tool's icon.gif" width="200" height="200"/><br /><br /><br />

* **Name:** trafficlight
* This tool is an AR traffic light. You can turn on three different lights and then connect the output to send a value of 1, .5, or 0
* **Number of nodes:** 4
  * `redlight` which takes an input value of either 1 to turn on or 0 to turn off
  * `yellowlight` which takes an input value of either 1 to turn on or 0 to turn off
  * `greenlight` which takes an input value of either 1 to turn on or 0 to turn off
  * `output` which can connect to another tool to send a value of 1 (if green), .5 (if yellow), or 0 (if red)

### Troubleshooting

- If you don't see the new tools after following the directions above, run the server as you would typically do. Navigate to the webserver (also known as the localhost) and click `Spatial Tools`. Make sure to turn on all the tools you would like to see. 
