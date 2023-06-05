
<template>
  <div class="p-4">   
    <div>
      <form action="" id="Filters" name="Filter">
        <div class="" id="">
          <div class="">
            <div class="">
              <select
                class="mb-4"
                id=""
                v-model="selectedRocket"    
              >
                <option value="" selected>Rockets</option>
                <option
                  v-for="rocket in rockets"
                  :key="rocket.name"
                  :value="rocket.name"      
                >
                  {{ rocket.name }}
                </option>
              </select>
              <select
                class="mb-4"
                id=""    
                v-model="selectedLaunchpad"     
              >
                <option value="" selected>Launchpads</option>
                <option
                  v-for="launchpad in launchpads"
                  :key="launchpad.name"
                  :value="launchpad"
                >
                  {{ launchpad.full_name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </form> 
    </div>
    
    <div v-if="activePhase == 2">
      weather:
      {{ weather }}
    </div>  
    
    <div>
      <!-- Selected Rocket: {{ selectedRocket }} -->
    </div>
    <div>
      <!-- Selected Launchpad: {{ selectedLaunchpad }}  -->
    </div>

    <button
      type="button"
      class="w-[150px] btn btn-outline text-black border-1 border-black pt-2 pb-0 mx-auto"
      @click="goToStep(2)"
    >
      Go Now
    </button>

    <button
      type="button"
      class="w-[150px] btn btn-outline text-black border-1 border-black pt-2 pb-0 mx-auto"
      @click="Reset"
    >
      Reset
    </button>
 

  </div>
</template>
<script>
export default {
  data() {
    return {
      rockets: [],
      launchpads: [],
      selectedRocket:'',
      selectedLaunchpad: '',
      activePhase: 1,
      weather: '',
      weather2: '',
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
      var latitude = this.selectedLaunchpad.latitude;
      var longitude = this.selectedLaunchpad.longitude;

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
    Reset (){
      this.selectedRocket = ''
      this.selectedLaunchpad = ''
      this.activePhase = 1;   
    }
  },
}
</script>
