
<template>
  <div class="py-32 container">   
    <div class="text-center mb-8 text-4xl font-agencywide uppercase">Mission Control</div>
    <form @submit.prevent="goToStep(2)" class="mb-12">
      <div class="flex space-x-12 items-end justify-center"> 
        <div class="w-2/5">
          <RoundKnobs />
          <div class="my-8 p-6 bg-grey rounded-lg">
            <label for="" class="block mb-2">Choose your Rocket:</label>
            <select class="px-4 py-3 rounded-full w-full text-black" id="rockets" v-model="selectedRocket" required>
            <option value="" selected>Rockets</option>
            <option v-for="rocket in rockets" :key="rocket.name" :value="rocket.name">
              {{ rocket.name }}
            </option>
          </select>
          </div>
          
          <RoundKnobs/>
        </div>
        
        <div class="w-2/5">
          <RoundKnobsGreen />
          <div class="my-8 p-6 bg-grey rounded-lg">
            <label for="" class="block mb-2">Choose your Launchpad:</label>
            <select class="px-4 py-3 rounded-full w-full text-black" v-model="selectedLaunchpad" required>
              <option value="" selected>Launchpads</option>
              <option v-for="launchpad in launchpads" :key="launchpad.name" :value="launchpad">
                {{ launchpad.full_name }}
              </option>
            </select>
          </div>
          <RoundKnobsGreen />
        </div>
        
        <div class="w-2/5">
          <RoundKnobsOrange />
          <div class="my-8 p-6 bg-grey rounded-lg">
            <label for="" class="block mb-2">Choose your Time:</label>
            <select class="px-4 py-3 rounded-full w-full text-black" v-model="selectedTime" required>
              <option value="" selected>Launch Time</option>
              <option v-for="time in times" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
          <RoundKnobsOrange />
        </div>
      </div>
      <div class="text-center">
      <button type="submit" class="mt-8 px-8 py-3 rounded text-3xl text-white uppercase bg-red font-agencybold uppercase" v-if="activePhase == 1">Launch!</button>
      <button type="button" class="px-8 py-3 rounded text-3xl text-white uppercase bg-red font-agencybold uppercase" v-if="activePhase == 2" @click="Reset">Reset!</button>

    </div>
      
    </form> 
    
    <div ref="fullscreen">
      <div v-if="activePhase == 2"> 
        <div>
          Weather Report for Launchspot:{{ weather }}
        
          <vue-countdown-timer
            @start_callback="startCallBack('event started')"
            @end_callback="endCallBack('event ended')"
            :start-time="'2018-10-10 00:00:00'"
            :end-time="1686062004"
            :interval="1000"
            :start-label="'Until start:'"
            :end-label="'Until end:'"
            label-position="begin"
            :end-text="'Event ended!'"
            :day-txt="'days'"
            :hour-txt="'hours'"
            :minutes-txt="'minutes'"
            :seconds-txt="'seconds'">
            <template slot="start-label" slot-scope="scope">
              <span style="color: red" v-if="scope.props.startLabel !== '' && scope.props.tips && scope.props.labelPosition === 'begin'">{{scope.props.startLabel}}:</span>
              <span style="color: blue" v-if="scope.props.endLabel !== '' && !scope.props.tips && scope.props.labelPosition === 'begin'">{{scope.props.endLabel}}:</span>
            </template>

            <template slot="countdown" slot-scope="scope">
              <div class="flex text-center uppercase space-x-4 items-center justify-center">
                <div class="bg-darkgrey p-4 rounded basis-1/4">
                  <div class="text-4xl font-agencywide ">{{scope.props.hours}}</div>
                  <div class="text-2xl font-agencybold">{{scope.props.hourTxt}}</div>
                </div>
                <div class="bg-darkgrey p-4 rounded basis-1/4">
                  <div class="text-4xl font-agencywide ">{{scope.props.minutes}}</div>
                  <div class="text-2xl font-agencybold">{{scope.props.minutesTxt}}</div>
                </div>
                <div class="bg-darkgrey p-4 rounded basis-1/4">
                  <div class="text-4xl font-agencywide ">{{scope.props.seconds}}</div>
                  <div class="text-2xl font-agencybold">{{scope.props.secondsTxt}}</div>
                </div>
              </div>
            </template>

            <template slot="end-label" slot-scope="scope">
              <span style="color: red" v-if="scope.props.startLabel !== '' && scope.props.tips && scope.props.labelPosition === 'end'">{{scope.props.startLabel}}:</span>
              <span style="color: blue" v-if="scope.props.endLabel !== '' && !scope.props.tips && scope.props.labelPosition === 'end'">{{scope.props.endLabel}}:</span>
            </template>

            <template slot="end-text" slot-scope="scope">
              <span style="color: green">{{ scope.props.endText}}</span>
            </template>
          </vue-countdown-timer>
          Converted Time: {{convertedTime}}
        </div>
      </div>  
    </div>
    <div>Selected Time: {{ selectedTime }} <br/><!-- Selected Rocket: {{ selectedRocket }} --></div><div><!-- Selected Launchpad: {{ selectedLaunchpad }}  --></div>
    
    
    <button v-if="showFSButton" @click="fullScreen">Full Screen</button>
    <div class="hidden">today:{{ calcDate() }}</div>
  </div>
</template>
<script>
import VueCountdownTimer from 'vuejs-countdown-timer'

import moment from 'moment'
export default {
  data() {
    return {
      rockets: [],
      launchpads: [],
      times: [],
      selectedRocket:'',
      selectedLaunchpad: '',
      selectedTime: '',
      convertedTime: '',
      today: '',
      activePhase: 1,
      weather: '',
      weather2: '',
      endAt: '',
      showFSButton: true,
      color: 'text-red'
    }
  },
  async fetch() {
    this.rockets = await fetch(
      'https://api.spacexdata.com/v4/rockets'
    ).then(res => res.json());
    this.launchpads = await fetch(
      'https://api.spacexdata.com/v4/launchpads'
    ).then(res => res.json());
  },
  methods: {
    async goToStep(step) {
      var latitude = this.selectedLaunchpad.latitude
      var longitude = this.selectedLaunchpad.longitude
      
      try {
        this.weather = await fetch(
          'https://api.weather.gov/points/'+latitude+','+longitude+''
        ).then(res => res.json()
        .then(data => this.getWeather(data.properties.forecast)))
      } 
      catch (error) {    
      }
      this.activePhase = step;      
    },
    
    getWeather(url){
      var weather2 = ''
      try {
        weather2 = fetch(
          url
        ).then(res => res.json()
        .then(data => data.properties.periods[0].detailedForecast))
      } 
      catch (error) {
      }
      return(weather2);
    },
    calcDate(){
      const now = moment();
      const start = moment();
      // const remainder = 15 - (start.minute() % 15);
      // const dateTime = moment(start)
      //   .add(remainder, "minutes")
      //   .format("h:mm a");
      //console.log(dateTime);

      var timeStops = [];
      var endTime = moment().add(2, 'hours');
      // console.log('starte time: '+dateTime);
      // console.log('end time: '+endTime);
      while(start <= endTime){
        timeStops.push(new moment(start).format('h:mm a'));
        start.add(15, 'minutes');
      } 
      // console.log(timeStops);
      this.times = timeStops;
      //console.log('times: '+this.times);
      return(timeStops);
    },
    // convertedTime(){
      
    // },
    startCallBack: function(x) {
      console.log(x);
    },
    endCallBack: function(x) {
      console.log(x);
    },
    fullScreen() {
      this.$refs.fullscreen.requestFullscreen();
    },
    Reset (){
      this.selectedRocket = ''
      this.selectedLaunchpad = ''
      this.activePhase = 1,
      this.selectedTime = ''
    }
  }
}
</script>
