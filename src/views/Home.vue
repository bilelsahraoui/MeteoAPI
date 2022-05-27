<template>

    <div v-if="!isFetched">
        <div class="flex justify-center pt-10">
        <svg role="status" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        </div>
    </div>

    <div v-else>

        <!-- Is Day -->
        <div>
            <PageComponent title="Météo actuelle">
            
            <input v-model="wantedCity" type="text" 
                class="appearance-none rounded-t-lg rounded-b-lg relative block w-full px-3 
                py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 
                focus:border-indigo-500 focus:z-10 sm:text-sm" required placeholder="Tapez le nom d'une ville"/>
            <button @click="$store.dispatch('fetchMeteo', wantedCity)" class="group relative w-full flex justify-center py-2 px-4 border 
                border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"> Recherche </button>

            <div>

                <div class="rounded overflow-hidden shadow-lg">
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl">{{ meteo.location.name }}</div>
                        <div class="pr-14 text-5xl flex">{{ meteo.current.temp_c }}°C 
                            <img v-if="meteo.current.is_day" class="pl-10" src="../assets/sun.svg" alt="day">
                            <img v-else class="h-12 w-[40] pl-10" src="../assets/moon.svg" alt="night">
                        </div> 
                        <div class="text-sm mb-2">{{ meteo.location.region}}, {{ meteo.location.country }}</div>
                        <p class="text-gray-700 text-base">
                        Ressenti {{ meteo.current.feelslike_c}}°C || Ressenti {{ meteo.current.feelslike_f }}°f <br>
                        Dernière mise à jour, le {{ meteo.current.last_updated }}
                        </p>
                    </div>
                    <div class="px-6 pt-4 pb-2 flex items-center">
                        
                        <!-- Nuage -->
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                            Nuages {{ meteo.current.cloud }}%
                        </span>
                        
                        <!-- Humidité -->
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24">
                                <path d="M12 3.571c3.658 5.437 6 9.223 6 12.503 0 3.268-2.691 5.926-6 5.926s-6-2.658-6-5.925c0-3.281 2.341-7.067 6-12.504zm0-3.571c-4.87 7.197-8 11.699-8 16.075 0 4.378 3.579 7.925 8 7.925s8-3.547 8-7.925c0-4.376-3.13-8.878-8-16.075z"/>
                            </svg>
                            Humidité {{ meteo.current.humidity }}%
                        </span>
                        
                        <!-- Vent -->
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
                                <path d="M11 10h-5v-2h5c.552 0 1-.448 1-1s-.448-1-1-1c-.403 0-.747.242-.905.587l-1.749-.956c.499-.965 1.494-1.631 2.654-1.631 3.971 0 3.969 6 0 6zm7 7c0-1.656-1.344-3-3-3h-7v2h7c.552 0 1 .448 1 1s-.448 1-1 1c-.403 0-.747-.242-.905-.587l-1.749.956c.499.965 1.494 1.631 2.654 1.631 1.656 0 3-1.344 3-3zm1.014-7.655c.082-.753.712-1.345 1.486-1.345.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5h-8.5v2h8.5c1.932 0 3.5-1.568 3.5-3.5s-1.568-3.5-3.5-3.5c-1.624 0-2.977 1.116-3.372 2.617l1.886.728zm-9.014 1.655h-8v2h8v-2zm-4 3h-6v2h6v-2zm-2-6h-4v2h4v-2z"/>
                            </svg>
                            {{ meteo.current.wind_kph }}km/h
                        </span>

                    </div>
                </div>

            </div>
        </PageComponent>
        </div>

    </div>
</template>

<script>
import PageComponent from "../components/PageComponent.vue";
import axios from 'axios';

export default {
    data(){
        return{
            wantedCity: 'Paris',
            isFetched: false,
        }
    },
    mounted(){
      axios.get('http://api.weatherapi.com/v1/current.json?key=1fc3ef42de5a47bf982220310222605&q='+this.wantedCity+'&aqi=no')
      .then(res => res.data)
      .then(data => {
        this.$store.state.meteo.data = data;
        window.setTimeout(() => this.isFetched = true, 400)
      })
      .catch(err => console.log(err.message))
    },
    computed: {
        meteo: {
            get(){
                return this.$store.state.meteo.data;
            }
        }
    },
    components: {
        PageComponent,
    }
}

</script>