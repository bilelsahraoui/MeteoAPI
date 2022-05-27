import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        meteo: {
            data: {}
        },
    },
    //Commit
    mutations: {
        setMeteo(state, data){
            state.meteo.data = data;
        }
    },
    //Dispatch
    actions: {
        async fetchMeteo ({ commit }, wantedCity){
            try{
                const response = await axios.get('http://api.weatherapi.com/v1/current.json?key=1fc3ef42de5a47bf982220310222605&q='+wantedCity+'&aqi=no')
                .then((response) => {
                    const meteo = response.data;
                    commit('setMeteo', meteo);
                })
            }
            catch(err){
                console.log(err)
            }
        }

    },
    getters: {

    },
    plugins: [

    ],
    modules: {

    },

})

export default store;