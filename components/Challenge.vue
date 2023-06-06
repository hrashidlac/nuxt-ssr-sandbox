
<template>
  <div class="py-32 container">     
    <div class="text-center mb-8 text-4xl font-agencywide uppercase">Mission Control</div>
    <form @submit.prevent="goToStep(2)" class="mb-12">
      <div class="lg:flex lg:space-x-12 items-end justify-center"> 
        <div class="lg:basis-1/3 mb-8">
          <!-- <RoundKnobs /> -->
          <div v-if="!selectedRocket">
           <RoundKnobsOff />
          </div>
          <div v-if="selectedRocket">
           <RoundKnobsOn />
          </div>
          <div class="my-8 p-6 bg-grey rounded-lg">
            <label for="" class="block mb-2">Choose your Rocket:</label>
            <select class="px-4 py-3 rounded-full w-full text-black" id="rockets" v-model="selectedRocket" required>
            <option value="" selected>Rockets</option>
            <option v-for="rocket in rockets" :key="rocket.name" :value="rocket.name">
              {{ rocket.name }}
            </option>
          </select>
          </div>
          
          <div v-if="!selectedRocket">
           <RoundKnobsOff />
          </div>
          <div v-if="selectedRocket">
           <RoundKnobsOn />
          </div>
        </div>
        
        <div class="lg:basis-1/3 mb-8">
          <div v-if="!selectedLaunchpad">
           <RoundKnobsGreenOff />
          </div>
          <div v-if="selectedLaunchpad">
           <RoundKnobsGreenOn />
          </div>
          <div class="my-8 p-6 bg-grey rounded-lg">
            <label for="" class="block mb-2">Choose your Launchpad:</label>
            <select class="px-4 py-3 rounded-full w-full text-black" v-model="selectedLaunchpad" required>
              <option value="" selected>Launchpads</option>
              <option v-for="launchpad in launchpads" :key="launchpad.name" :value="launchpad">
                {{ launchpad.full_name }}
              </option>
            </select>
          </div>
          <div v-if="!selectedLaunchpad">
           <RoundKnobsGreenOff />
          </div>
          <div v-if="selectedLaunchpad">
           <RoundKnobsGreenOn />
          </div>
        </div>
        
        <div class="lg:basis-1/3 mb-8">
          <div v-if="!selectedTime">
           <RoundKnobsOrangeOff />
          </div>
          <div v-if="selectedTime">
           <RoundKnobsOrangeOn />
          </div>
          <div class="my-8 p-6 bg-grey rounded-lg">
            <label for="" class="block mb-2">Choose your Time:</label>
            <select class="px-4 py-3 rounded-full w-full text-black" v-model="selectedTime" required>
              <option value="" selected>Launch Time</option>
              <option v-for="time in times" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
          <div v-if="!selectedTime">
           <RoundKnobsOrangeOff />
          </div>
          <div v-if="selectedTime">
           <RoundKnobsOrangeOn />
          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="mt-8 px-8 py-3 rounded text-3xl text-white uppercase bg-red font-agencybold uppercase hover:bg-green" v-if="activePhase == 1">Launch!</button>
        <button type="button" class="px-8 py-3 rounded text-3xl text-white uppercase bg-grey font-agencybold uppercase hover:bg-red" v-if="activePhase == 2" @click="Reset">Reset!</button>
      </div>
    </form> 
    
    <div ref="fullscreen">
      <div v-if="activePhase == 2"> 
        <div>
          
          <vue-countdown-timer
            @start_callback="startCallBack('event started')"
            @end_callback="endCallBack('event ended')"
            :start-time="'2018-10-10 00:00:00'"
            :end-time="9989062004"
            :interval="1000"
            :start-label="'Countdown'"
            :end-label="'Countdown to Launch'"
            label-position="begin"
            :end-text="'Launching!'"
            :day-txt="'days'"
            :hour-txt="'hours'"
            :minutes-txt="'minutes'"
            :seconds-txt="'seconds'">
            <template slot="start-label" slot-scope="scope">
              <div class="text-white mb-2" v-if="scope.props.startLabel !== '' && scope.props.tips && scope.props.labelPosition === 'begin'">{{scope.props.startLabel}}</div>
              <div class="text-white text-center text-4xl font-agencywide uppercase mb-4 mx-auto" v-if="scope.props.endLabel !== '' && !scope.props.tips && scope.props.labelPosition === 'begin'">{{scope.props.endLabel}}</div>
            </template>

            <template slot="countdown" slot-scope="scope">
              <div class="flex text-center uppercase space-x-12 items-center justify-center">
                <div class="bg-grey p-4 rounded basis-1/3">
                  <div class="text-4xl font-agencywide ">{{scope.props.hours}}</div>
                  <div class="text-2xl font-agencybold">{{scope.props.hourTxt}}</div>
                </div>
                <div class="bg-grey p-4 rounded basis-1/3">
                  <div class="text-4xl font-agencywide ">{{scope.props.minutes}}</div>
                  <div class="text-2xl font-agencybold">{{scope.props.minutesTxt}}</div>
                </div>
                <div class="bg-grey p-4 rounded basis-1/3">
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
         
          <div class="mt-8 text-white text-center text-4xl font-agencywide uppercase mb-4 mx-auto">Weather Report for Launchspot</div>
          <div class="lg:grid lg:grid-cols-4 text-white text-center mb-4 mx-auto gap-12 flex-wrap">   
            <div v-for="forecast in weather" :key="forecast.number" class="col-span-1 bg-grey p-4 rounded-lg">
                <div class="text-xl font-agencybold uppercase">{{ forecast.name }}</div>
                <div class="text-4xl font-agencywide uppercase">{{ forecast.temperature }} <sup>{{ forecast.temperatureUnit }}</sup></div>
                <div><img :src="forecast.icon" class="mx-auto my-2"></div>
                <div class="text-xs">{{ forecast.detailedForecast }}</div> 
            </div>
          </div>
        </div>
        <div class="text-center my-8">        
          <button  @click="fullScreen" class="px-8 py-3 rounded text-3xl text-white uppercase bg-green font-agencybold uppercase mx-auto hover:bg-grey">Full Screen</button>
        </div>
        <div class="lg:flex lg:space-x-12 items-end justify-center mt-4"> 
        <div class="lg:basis-1/3 mb-8">
          <RoundKnobsOn />
        </div>
        <div class="lg:basis-1/3 mb-8">
          <RoundKnobsGreenOn />
        </div>
        <div class="lg:basis-1/3 mb-8">
          <RoundKnobsOrangeOn />
        </div>
      </div>
      </div>  
    </div>
    
      <!-- Selected Time: {{ selectedTime }} <br/> -->
      <!-- Selected Rocket: {{ selectedRocket }} <br/>-->
      <!-- Selected Launchpad: {{ selectedLaunchpad }}  -->
    
    <div class="text-center mt-8" v-if="activePhase == 2">
      
    </div>

    
  
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
  created(){
    this.calcDate();
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
        .then(data => data.properties.periods))
      } 
      catch (error) {
      }
      return(weather2);
    },
    calcDate(){
      const start = moment();
      // const remainder = 15 - (start.minute() % 15);
      // const dateTime = moment(start)
      //   .add(remainder, "minutes")
      //   .format("h:mm a");
      //console.log(dateTime);

      var timeStops = [];
      var endTime = moment().add(8, 'hours');
      //console.log('starte time: '+start);
      //console.log('end time: '+endTime);
      while(start <= endTime){
        timeStops.push(new moment(start).format('h:mm a'));
        start.add(30, 'minutes');
      } 
      //console.log(timeStops);
      this.times = timeStops;
      //console.log('times: '+this.times);
      //return(timeStops);
    },
    startCallBack: function(x) {
      //console.log(x);
    },
    endCallBack: function(x) {
      //console.log(x);
    },
    fullScreen() {
      this.$refs.fullscreen.requestFullscreen();
    },
    Reset (){
      this.selectedRocket = ''
      this.selectedLaunchpad = ''
      this.selectedTime = ''
      this.activePhase = 1
    }
  }
}
</script>
